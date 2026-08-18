import Link from "next/link";
import MarketingShell from "@/components/layout/marketing-shell";
import { I } from "@/components/icons";
import { services } from "@/lib/data";

const trustPoints = [
  { icon: "Lock", title: "Secure by design", body: "Encrypted document storage, signed URLs and a full audit trail on every action." },
  { icon: "ShieldCheck", title: "Your data, protected", body: "Australian Privacy Act (APPs) compliant handling of your personal and financial details." },
  { icon: "Users", title: "Invite-only access", body: "Your broker and compliance team set up your account — no public self-registration." },
] as const;

const steps = [
  { n: "1", title: "Talk to a broker", body: "Book a consultation and we'll assess options across our panel of lenders." },
  { n: "2", title: "We pre-fill your application", body: "Your broker builds and submits the application on your behalf — you're never asked to do it alone." },
  { n: "3", title: "Track from your portal", body: "Log in to follow the status, upload documents when requested, and message your broker." },
  { n: "4", title: "Lender decides, we support", body: "The bank makes the final decision. We keep you updated through to settlement." },
];

export default function HomePage() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              <I.Lock className="size-3.5" />
              Lending, without the legwork
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Loan application tracking, kept simple &amp; secure.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              BAI Finance&apos;s brokers handle your application end-to-end across major Australian
              lenders. Log in to track progress, upload documents when asked, and stay in the loop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:brightness-95"
              >
                <I.Calendar className="size-4" />
                Book a consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore loan products
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/50">
              We never hold your funds or make lending decisions — that stays with your lender.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/75">
                  <I.ShieldCheck className="size-4 text-gold" />
                  Sample application
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-positive/20 px-2.5 py-0.5 text-[10px] font-semibold text-positive">
                  <span className="size-1.5 rounded-full bg-positive" />
                  In Review
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  ["Lender", "ANZ"],
                  ["Loan amount", "AUD 480,000"],
                  ["Purpose", "Home refinance"],
                  ["Broker", "Jamie Ramirez"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                    <span className="text-white/50">{k}</span>
                    <span className="font-semibold text-white">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-white/50">
                <I.Check className="size-4 text-gold" />
                Stepper shows Submitted → Additional Info → Approved → Settled
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3">
          {trustPoints.map((t) => {
            const Icon = I[t.icon];
            return (
              <div key={t.title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{t.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy">Lending products</h2>
            <p className="mt-1 text-sm text-muted">A broker-managed application for every stage of life.</p>
          </div>
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See all services
            <I.ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => {
            const Icon = I[s.icon];
            return (
              <Link
                key={s.id}
                href="/services"
                className="group rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(10,40,129,0.06)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more
                  <I.ArrowRight className="size-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-navy">How it works</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted">
            One broker, one profile, a single secure place to follow your application.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-xl border border-black/[0.06] bg-surface/60 p-5">
                <span className="flex size-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-navy">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight">
            Have an existing application? Log in to track it securely.
          </h2>
          <p className="max-w-lg text-sm text-white/65">
            If you&apos;ve received an invite from BAI Finance, activate your account and follow your
            application anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:brightness-95"
            >
              <I.Logout className="size-4 rotate-180" />
              Log in to your portal
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Not a client yet?
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}