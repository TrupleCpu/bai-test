"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const CONSULTATION_TYPES = [
  "Home Loan",
  "Refinancing",
  "Investment Loan",
  "Personal / Car Loan",
  "Not sure yet",
];

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "3:00 PM", "4:30 PM"];

const inputClasses =
  "w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(CONSULTATION_TYPES[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your full name.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!phone.trim()) next.phone = "Please enter a phone number.";
    if (!date) next.date = "Please choose a date.";
    if (!time) next.time = "Please choose a time slot.";
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
          Consultation booked
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/70">
          Thanks {name.split(" ")[0] || "there"} — your{" "}
          {type.toLowerCase()} consultation is reserved for{" "}
          <strong className="text-navy-700">{date}</strong> at{" "}
          <strong className="text-navy-700">{time}</strong>. A calendar invite
          and reminder have been sent to you and your broker.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setDate("");
            setTime("");
          }}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-navy-500 px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:bg-navy-50"
        >
          Book another slot
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
      <h3 className="font-display text-xl font-semibold text-navy-700">
        Book a consultation
      </h3>
      <p className="mt-1 text-sm text-ink/60">
        Choose a time that suits you and we&apos;ll confirm by email.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Full name
          </label>
          <input
            id="bk-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Dela Cruz"
            className={inputClasses}
          />
          {errors.name && <p className="mt-1 text-xs text-flag-red">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="bk-email" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Email
          </label>
          <input
            id="bk-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className={inputClasses}
          />
          {errors.email && <p className="mt-1 text-xs text-flag-red">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Phone
          </label>
          <input
            id="bk-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+63 9xx xxx xxxx"
            className={inputClasses}
          />
          {errors.phone && <p className="mt-1 text-xs text-flag-red">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="bk-type" className="mb-1.5 block text-sm font-semibold text-navy-700">
            What are you interested in?
          </label>
          <select
            id="bk-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputClasses}
          >
            {CONSULTATION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bk-date" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Preferred date
          </label>
          <input
            id="bk-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClasses}
          />
          {errors.date && <p className="mt-1 text-xs text-flag-red">{errors.date}</p>}
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-semibold text-navy-700">
            Preferred time
          </span>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                aria-pressed={time === slot}
                className={`cursor-pointer rounded-lg border px-2 py-2 text-xs font-medium transition-colors duration-200 ${
                  time === slot
                    ? "border-navy-700 bg-navy-700 text-white"
                    : "border-navy-200 bg-white text-navy-700 hover:border-navy-500"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.time && <p className="mt-1 text-xs text-flag-red">{errors.time}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bk-notes" className="mb-1.5 block text-sm font-semibold text-navy-700">
            Anything we should know? <span className="font-normal text-ink/50">(optional)</span>
          </label>
          <textarea
            id="bk-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. First home, budget around ₱3M, self-employed"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/50">
          By booking, you agree we may contact you to confirm your slot.
        </p>
        <button
          type="submit"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
        >
          <Icon name="calendar" className="size-4" />
          Confirm booking
        </button>
      </div>
    </form>
  );
}
