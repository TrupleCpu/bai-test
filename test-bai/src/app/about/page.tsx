import Link from "next/link";
import MarketingShell from "@/components/layout/marketing-shell";
import { I } from "@/components/icons";

const values = [
  {
    icon: "ShieldCheck",
    title: "Security first",
    body: "Strict role-based access, encrypted storage, and a complete audit trail on every action a staff member takes against your file.",
  },
  {
    icon: "Users",
    title: "Broker you know by name",
    body: "A dedicated BAI Finance broker manages your application from start to settlement.",
  },
  {
    icon: "Eye",
    title: "Transparency as standard",
    body: "Every communication is logged and visible to you — nothing happens on your file that you can't trace.",
  },
  {
    icon: "Lock",
    title: "Compliance we take seriously",
    body: "We operate under the Australian Privacy Act (APPs) and treat your personal and financial data with care.",
  },
] as const;

export default function AboutPage() {
  return (
    <MarketingShell>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            About BAI Finance
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-navy">
            We do the paperwork. You live the plan.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            BAI Finance is a broker-driven lending business based in Sydney. Our team prepares,
            submits and manages loan applications on behalf of clients — across home loans,
            refinancing, investment and personal lending — comparing options across a panel of major
            Australian lenders.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Importantly, we never hold or move your funds, and we never make lending decisions.
            Those responsibilities remain with the external lender. Our secure portal is where your
            application progress, requested documents, and broker communication all come together.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-navy">What we stand for</h2>
        <p className="mt-1 text-sm text-muted">Why clients trust us with their application journey.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {values.map((v) => {
            const Icon = I[v.icon];
            return (
              <div key={v.title} className="flex gap-4 rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(10,40,129,0.06)]">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy">Our team</h2>
            <p className="mt-2 text-sm text-muted">Brokers and compliance staff, all under one roof.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { initials: "JR", name: "Jamie Ramirez", role: "Senior Broker" },
              { initials: "BT", name: "Bianca Torres", role: "Broker" },
              { initials: "KC", name: "Keanu Chen", role: "Compliance Team" },
              { initials: "SG", name: "Sofia Garcia", role: "Compliance Team" },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-surface/50 p-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                  {m.initials}
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-ink">{m.name}</div>
                  <div className="text-xs text-muted">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight">Let&apos;s talk about your goals</h2>
          <p className="max-w-lg text-sm text-white/65">
            Whether it&apos;s a first home or a portfolio restructure, a 20-minute chat can point you in
            the right direction.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:brightness-95"
          >
            <I.Calendar className="size-4" />
            Contact us
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}