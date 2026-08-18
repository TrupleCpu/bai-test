"use client";

import { useState } from "react";
import MarketingShell from "@/components/layout/marketing-shell";
import { I } from "@/components/icons";
import { Button, Card, Field, TextArea, TextInput } from "@/components/ui";

const topics = [
  "Home loan / refinance",
  "Investment lending",
  "Personal loan",
  "Car & asset finance",
  "Existing application enquiry",
  "Something else",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: topics[0], message: "" });

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Contact us
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-navy">Talk to a broker</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Request a consultation and a BAI Finance broker will follow up to discuss your options.
            Prefer to book a specific time? Our online booking is available in the client portal.
          </p>

          <Card pad="p-6" className="mt-8 max-w-xl">
            {sent ? (
              <div className="py-8 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-positive/10 text-positive">
                  <I.Check className="size-7" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-navy">Thanks, {form.name.split(" ")[0]}!</h2>
                <p className="mt-2 text-sm text-muted">
                  Your enquiry has been received. A broker will be in touch at {form.email} within one
                  business day.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", topic: topics[0], message: "" }); }}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="grid gap-5 sm:grid-cols-2"
              >
                <Field label="Full name">
                  <TextInput placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </Field>
                <Field label="Email address">
                  <TextInput type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </Field>
                <Field label="Phone (optional)">
                  <TextInput placeholder="+61 400 000 000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </Field>
                <Field label="Topic">
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="How can we help?">
                    <TextArea placeholder="Tell us a little about your goals…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">
                    <I.Send className="size-4" />
                    Send enquiry
                  </Button>
                </div>
                <p className="flex items-start gap-1.5 text-xs text-muted sm:col-span-2">
                  <I.Lock className="mt-0.5 size-3.5 shrink-0 text-positive" />
                  Protected by spam checks (reCAPTCHA). We only use your details to respond to this
                  enquiry — see our privacy notice for full details.
                </p>
              </form>
            )}
          </Card>
        </div>

        <div className="space-y-4 self-start">
          <Card className="p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <I.Chat className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-navy">Business hours</h3>
            <p className="mt-1.5 text-sm text-muted">Monday – Friday, 9:00 AM – 5:00 PM AEST</p>
            <p className="mt-1 text-sm text-muted">Level 12, 40 Market Street, Sydney NSW 2000</p>
          </Card>
          <Card className="p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <I.Mail className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-navy">Existing application?</h3>
            <p className="mt-1.5 text-sm text-muted">
              Message your broker from the secure portal — it&apos;s logged and you&apos;ll always have a copy
              of the conversation.
            </p>
          </Card>
          <Card className="p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-positive/10 text-positive">
              <I.ShieldCheck className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-navy">Privacy</h3>
            <p className="mt-1.5 text-sm text-muted">
              We handle personal and financial data under the Australian Privacy Principles (APPs).
            </p>
          </Card>
        </div>
      </section>
    </MarketingShell>
  );
}