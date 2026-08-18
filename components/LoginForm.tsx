"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const inputClasses =
  "w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!password.trim()) next.password = "Please enter your password.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-400 text-navy-950">
          <Icon name="check" className="size-7" />
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold text-navy-700">
          Demo login successful
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
          This is a design preview — no real authentication happens here. The
          authenticated Client Portal is part of the BAI Finance platform.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-navy-500 px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:bg-navy-50"
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="pf-email" className="mb-1.5 block text-sm font-semibold text-navy-700">
          Email address
        </label>
        <input
          id="pf-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className={inputClasses}
        />
        {errors.email && <p className="mt-1 text-xs text-flag-red">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="pf-password" className="mb-1.5 block text-sm font-semibold text-navy-700">
          Password
        </label>
        <input
          id="pf-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={inputClasses}
        />
        {errors.password && <p className="mt-1 text-xs text-flag-red">{errors.password}</p>}
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="size-4 rounded border-navy-300 accent-navy-700"
        />
        Remember me on this device
      </label>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
      >
        Log in
      </button>
    </form>
  );
}
