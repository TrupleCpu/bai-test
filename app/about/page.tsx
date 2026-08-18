import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import CallNowButton from "@/components/CallNowButton";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about BAI Finance — a trusted loan brokerage serving clients across the Philippines with support from leading Australian lenders.",
};

const VALUES = [
  {
    icon: "shield-check",
    title: "Integrity first",
    description:
      "We're transparent about lenders, rates, and fees — and we never handle or move your funds.",
  },
  {
    icon: "chat",
    title: "A real human, always",
    description:
      "Every application is prepared and submitted by a dedicated broker who knows your situation.",
  },
  {
    icon: "lock",
    title: "Security built-in",
    description:
      "Invite-only access, encryption everywhere, and full audit trails on every application.",
  },
  {
    icon: "globe",
    title: "AU roots, PH heart",
    description:
      "Backed by Australian lending partners and banking standards, delivered close to home.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        pill="About Us"
        title="A friendlier way to get a loan"
        subtitle="BAI Finance exists to make the loan journey clear, secure, and genuinely helpful — from your first conversation to settlement."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy-700 sm:text-3xl">
              We prepare the paperwork, you keep the peace of mind.
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              Getting a loan shouldn&apos;t feel like a maze of forms and
              jargon. BAI Finance partners with leading Australian lenders
              including ANZ and CommBank, and our brokers work alongside our
              Compliance Team to prepare, verify, and submit every application
              on your behalf.
            </p>
            <p className="mt-4 leading-relaxed text-ink/75">
              Once your application is underway, you&apos;re invited into a
              secure portal where you can track its progress and respond to
              document requests — no phone-tag, no guesswork. Because we never
              move money, repayments and disbursements always happen directly
              with your chosen lender.
            </p>
            <div className="mt-8 rounded-2xl border border-navy-100 bg-cream p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                Our promise
              </p>
              <p className="mt-2 text-lg font-medium leading-relaxed text-navy-700">
                &ldquo;You&apos;ll always know where your application stands —
                and there&apos;s always a person to call.&rdquo;
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon name={value.icon} className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-navy-700">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-block rounded-full border border-navy-500 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy-500">
                Who we serve
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-700">
                Proudly serving the{" "}
                <span className="text-gold-500">PHILIPPINES</span>
              </h2>
              <p className="mt-4 leading-relaxed text-ink/75">
                From first home buyers in Manila to families refinancing across
                the islands, we bring Australian banking standards to Filipino
                borrowers — with local offices and local brokers who speak your
                language.
              </p>
              <p className="mt-4 leading-relaxed text-ink/75">
                Our approach is deliberately personal: small team, low client
                loads, and a promise that your broker knows your file inside
                and out.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
                >
                  How to apply
                  <Icon name="arrow-right" className="size-4" />
                </Link>
                <CallNowButton variant="gold" />
              </div>
            </div>
            <div className="rounded-2xl bg-navy-900 p-8 text-navy-100">
              <h3 className="font-display text-lg font-semibold text-white">
                Our credentials
              </h3>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    icon: "building-office",
                    text: "Partnered with leading Australian lenders, including ANZ and CommBank",
                  },
                  {
                    icon: "check-badge",
                    text: "Licensed and experienced brokers on every application",
                  },
                  {
                    icon: "shield-check",
                    text: "Compliant with the Australian Privacy Act (APPs) and its principles",
                  },
                  {
                    icon: "lock",
                    text: "SSL/TLS everywhere, encryption at rest, and full audit logging",
                  },
                  {
                    icon: "document",
                    text: "Invite-only client access — no public self-registration, ever",
                  },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3 text-sm">
                    <Icon
                      name={item.icon}
                      className="mt-0.5 size-5 shrink-0 text-gold-400"
                    />
                    <span className="leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
