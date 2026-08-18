import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/CallNowButton";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with BAI Finance — call, email, or send us a message through our secure, spam-protected contact form.",
};

const DETAILS = [
  {
    icon: "phone",
    title: "Call us",
    lines: [PHONE_DISPLAY, "Mon – Fri, 9:00am – 6:00pm"],
    href: PHONE_TEL,
  },
  {
    icon: "envelope",
    title: "Email us",
    lines: ["hello@baifinance.example.com", "We reply within one business day"],
    href: "mailto:hello@baifinance.example.com",
  },
  {
    icon: "map",
    title: "Visit us",
    lines: ["Makati City, Philippines", "Sydney, Australia"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        pill="Contact"
        title="We'd love to hear from you"
        subtitle="Questions about a loan, a refinance, or an application in progress — reach out any way you like."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <div className="space-y-5">
              {DETAILS.map((detail) => (
                <div
                  key={detail.title}
                  className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                    <Icon name={detail.icon} className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold text-navy-700">
                      {detail.title}
                    </h2>
                    {detail.lines.map((line) =>
                      detail.href ? (
                        <a
                          key={line}
                          href={detail.href}
                          className="mt-0.5 block text-sm text-ink/70 transition-colors duration-200 hover:text-gold-500"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="mt-0.5 text-sm text-ink/70">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-navy-100 bg-cream p-5">
              <h2 className="font-display text-base font-semibold text-navy-700">
                Prefer live chat?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                Use the chat button in the corner for loan and application
                questions during business hours.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
