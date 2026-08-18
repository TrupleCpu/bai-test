import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/CallNowButton";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a free consultation with a BAI Finance broker — choose a slot and we'll confirm by email.",
};

export default function BookPage() {
  return (
    <>
      <PageHeader
        pill="Book a Consultation"
        title="A free conversation with a real broker"
        subtitle="Pick a time that suits you. We'll discuss your goals and what's realistic for your budget."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <BookingForm />

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-navy-100 bg-cream p-7">
              <h2 className="font-display text-lg font-semibold text-navy-700">
                Prefer to talk now?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Our brokers are available Monday to Friday, 9:00am – 6:00pm.
              </p>
              <a
                href={PHONE_TEL}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
              >
                <Icon name="phone" className="size-4" />
                {PHONE_DISPLAY}
              </a>
              <ul className="mt-6 space-y-3 text-sm text-ink/70">
                <li className="flex items-start gap-2.5">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  No fees and no obligation
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  We'll confirm your slot by email
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  Calendar invites and reminders go to both parties
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  Reschedule anytime — just call or email
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
