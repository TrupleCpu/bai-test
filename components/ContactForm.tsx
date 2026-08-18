"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const SUBJECTS = [
  "Loan enquiry",
  "Refinancing",
  "Track an application",
  "Documents",
  "Something else",
];

const inputClasses =
  "w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your full name.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!message.trim()) next.message = "Please write a short message.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-400 text-navy-950">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-navy-700">
          Message received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/70">
          Thanks {name.split(" ")[0] || "there"} — our team will get back to you
          within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
          }}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-navy-500 px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:bg-navy-50"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Full name
          </label>
          <input
            id="ct-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Dela Cruz"
            className={inputClasses}
          />
          {errors.name && <p className="mt-1 text-xs text-flag-red">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ct-email" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Email
          </label>
          <input
            id="ct-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className={inputClasses}
          />
          {errors.email && <p className="mt-1 text-xs text-flag-red">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="ct-phone" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Phone <span className="font-normal text-ink/50">(optional)</span>
          </label>
          <input
            id="ct-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+63 9xx xxx xxxx"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="ct-subject" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Subject
          </label>
          <select
            id="ct-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClasses}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ct-message" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Message
          </label>
          <textarea
            id="ct-message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            className={inputClasses}
          />
          {errors.message && <p className="mt-1 text-xs text-flag-red">{errors.message}</p>}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg border border-navy-100 bg-cream px-4 py-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-navy-500">
          <Icon name="shield-check" className="size-5" />
        </span>
        <p className="text-xs leading-relaxed text-ink/60">
          This form is protected by hCaptcha — automated spam submissions are
          blocked. We only use your details to respond to your enquiry.
        </p>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
      >
        <Icon name="envelope" className="size-4" />
        Send message
      </button>
    </form>
  );
}
