"use client";

import { useState } from "react";
import { PaperPlaneTilt, CircleNotch, CheckCircle, Warning } from "@phosphor-icons/react";
import { profile, contact } from "@/lib/content";

/**
 * Real contact form with the full state cycle: validation errors inline below
 * each field, a submitting state, and success / error results. If no Formspree
 * endpoint is configured in lib/content.ts, it falls back to opening the
 * visitor's mail client with the message prefilled, so it always does something.
 *
 * Labels sit above inputs, errors below, status is announced via aria-live.
 */

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

const fieldBase =
  "w-full rounded-btn border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-accent/60 focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [viaMailto, setViaMailto] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email does not look right.";
    if (!message) next.message = "Please write a short message.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // no backend configured: hand off to the visitor's mail client
    if (!contact.formEndpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setViaMailto(true);
      setStatus("success");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="panel flex flex-col items-start gap-3 p-7 sm:p-8"
      >
        <CheckCircle size={32} weight="duotone" className="text-accent-green" />
        <h3 className="font-display text-xl font-semibold text-ink">
          {viaMailto ? "Your mail app is opening" : "Message sent"}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {viaMailto
            ? "Your email client should open with the message ready. Just hit send."
            : "Thanks for reaching out. I will get back to you soon."}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setViaMailto(false);
          }}
          className="mt-1 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="panel flex flex-col gap-5 p-7 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldBase} resize-none`}
          placeholder="What would you like to talk about?"
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 rounded-btn bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-glow-blue-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-glow-blue active:translate-y-px disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <CircleNotch size={18} weight="bold" className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <PaperPlaneTilt size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {status === "error" && (
          <p role="alert" className="flex items-center gap-1.5 text-sm text-red-400">
            <Warning size={16} weight="fill" />
            Something went wrong. Try email instead.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldBase}
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
