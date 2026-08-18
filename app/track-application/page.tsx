import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import StatusTimeline from "@/components/StatusTimeline";

export const metadata: Metadata = {
  title: "Track My Application",
  description:
    "Once invited, track your loan application securely in the BAI Finance client portal — live status, document requests, and more.",
};

const STEPS = [
  {
    icon: "envelope",
    title: "1 · You receive an invite",
    description:
      "Our Compliance Team creates your account and emails you a secure activation link.",
  },
  {
    icon: "key",
    title: "2 · Activate your account",
    description:
      "Open the link, set a password, and complete activation. Turn on MFA for extra protection.",
  },
  {
    icon: "lock",
    title: "3 · Log in securely",
    description:
      "Sign in with your email and password to land on My Applications.",
  },
  {
    icon: "magnifying-glass",
    title: "4 · Track, respond, stay updated",
    description:
      "View live status, upload documents when requested, and see your application history.",
  },
];

export default function TrackApplicationPage() {
  return (
    <>
      <PageHeader
        pill="Track My Application"
        title="Your application, at your fingertips"
        subtitle="No phone-tag and no guesswork. Once you're invited, everything about your application lives in one secure place."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy-700 sm:text-3xl">
              Secure, invite-only access
            </h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              BAI Finance doesn&apos;t have public sign-ups. Every client
              account is created and invited by our Compliance Team, so access
              stays controlled and verified.
            </p>
            <ol className="mt-8 space-y-6">
              {STEPS.map((step) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700">
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-700">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-2xl border border-navy-100 bg-cream p-5">
              <p className="flex items-start gap-2 text-sm leading-relaxed text-ink/75">
                <Icon name="exclamation-triangle" className="mt-0.5 size-5 shrink-0 text-gold-600" />
                Invite link expired? Don&apos;t worry — ask your broker or the
                Compliance Team to send a new one. You can&apos;t register
                directly, and that&apos;s intentional.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/portal"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
              >
                <Icon name="lock" className="size-4" />
                Client Login
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy-700 sm:text-3xl">
              What you&apos;ll see
            </h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Each application moves through clear statuses — here&apos;s what
              they mean.
            </p>
            <div className="mt-8">
              <StatusTimeline />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-3">
          {[
            {
              icon: "document",
              title: "Document requests",
              description:
                "When a lender needs more information, you'll see a request and upload directly in the portal.",
            },
            {
              icon: "chat",
              title: "Communication log",
              description:
                "A read-only history of emails between you and your broker, kept with your application.",
            },
            {
              icon: "clock",
              title: "Real-time updates",
              description:
                "Status changes and notifications keep you informed the moment they happen.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-700 text-white">
                <Icon name={item.icon} className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-700">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
