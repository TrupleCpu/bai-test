import Link from "next/link";
import { I } from "@/components/icons";

const roles = [
  {
    href: "/client",
    label: "Client Portal",
    icon: I.User,
    desc: "Track your loan applications, upload documents and messages from your broker.",
    tags: ["Invite only", "Read-only", "Secure documents"],
  },
  {
    href: "/broker",
    label: "Broker Portal",
    icon: I.Users,
    desc: "Manage clients, submit applications and communicate across the workflow.",
    tags: ["MFA required", "Submit on behalf", "Audited"],
  },
  {
    href: "/compliance",
    label: "Compliance Portal",
    icon: I.ShieldCheck,
    desc: "Invite clients, review the application queue and inspect audit trails.",
    tags: ["Full audit", "Approvals", "Regulatory export"],
  },
];

export default function Portal() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Branding panel */}
      <div className="flex flex-col justify-between bg-navy px-8 py-10 text-white lg:w-1/3 lg:px-12 lg:py-12">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-navy shadow">
              <I.ShieldCheck className="size-6" />
            </span>
            <div className="leading-tight">
              <div className="text-lg font-bold tracking-tight">BAI Finance</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Secure Portal
              </div>
            </div>
          </Link>
        </div>

        <div className="my-10">
          <h1 className="max-w-md text-3xl font-bold leading-tight tracking-tight">
            Loan application tracking &amp; broker workflow, kept secure.
          </h1>
          <ul className="mt-6 space-y-3 text-sm text-white/75">
            {[
              "Role-based access for clients, brokers and compliance",
              "Encrypted document handling with a full audit trail",
              "Every action logged, every access traceable",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <I.Check className="mt-0.5 size-4 shrink-0 text-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/10 pt-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white">
            <I.ArrowRight className="size-4 rotate-180" />
            Back to the marketing site
          </Link>
        </div>
      </div>

      {/* Portal picker */}
      <div className="flex flex-1 flex-col justify-center bg-surface px-8 py-10 lg:px-16">
        <h2 className="text-xl font-bold tracking-tight text-navy">Choose a portal</h2>
        <p className="mt-1 text-sm text-muted">
          Select your role to open the design system demo for that experience.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
          {roles.map(({ href, label, icon: Icon, desc, tags }) => (
            <Link
              key={label}
              href={href}
              className="group rounded-xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(10,40,129,0.06)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy">{label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-ink/10 bg-surface px-2 py-0.5 text-[10px] font-semibold text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8 flex items-center gap-1.5 text-xs text-muted">
          <I.Lock className="size-3.5 text-positive" />
          Portal screens are static design demos — no credentials required. Representative sample
          accounts are shown in each portal.
        </p>
      </div>
    </div>
  );
}