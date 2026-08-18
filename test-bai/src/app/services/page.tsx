import Link from "next/link";
import MarketingShell from "@/components/layout/marketing-shell";
import { I } from "@/components/icons";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <MarketingShell>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-navy">Our lending services</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Every application is prepared and submitted for you by a BAI Finance broker. We compare
            across a panel of major Australian lenders — the final decision always rests with the bank.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = I[s.icon];
            return (
              <div
                key={s.id}
                className="flex flex-col rounded-xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(10,40,129,0.06)]"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-navy">{s.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink">
                      <I.Check className="mt-0.5 size-4 shrink-0 text-positive" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Discuss this service
                  <I.ArrowRight className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-navy">What your application includes</h2>
            <ul className="mt-5 space-y-3">
              {[
                "Free, honest consultation — no obligation",
                "Rate and product comparison across lenders",
                "A broker who submits and manages your application",
                "Document management with encrypted, private storage",
                "Status tracking and updates from your secure portal",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-positive/10 text-positive">
                    <I.Check className="size-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-navy p-8 text-white">
            <span className="flex size-11 items-center justify-center rounded-xl bg-gold/20 text-gold">
              <I.Lock className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">Ready when you are</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Book a consultation and we&apos;ll map out the right path for your goals — home, investment,
              refinance or consolidation.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:brightness-95"
            >
              <I.Calendar className="size-4" />
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}