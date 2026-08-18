import Link from "next/link";
import type { ReactNode } from "react";
import { I } from "@/components/icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MarketingLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        className={`flex size-9 items-center justify-center rounded-lg bg-gradient-to-br ${
          dark ? "from-primary to-navy" : "from-primary to-navy"
        } text-white shadow`}
      >
        <I.ShieldCheck className="size-5" />
      </span>
      <span className="leading-tight">
        <span className={`block text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-navy"}`}>
          BAI Finance
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          {dark ? "Secure Lending" : "Loan Specialists"}
        </span>
      </span>
    </Link>
  );
}

export function MarketingHeader({ dark = false }: { dark?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-30 border-b ${
        dark ? "border-white/10 bg-navy-deep/95 backdrop-blur" : "border-black/5 bg-white/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <MarketingLogo dark={dark} />
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                dark ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-ink/70 hover:bg-primary-soft hover:text-navy"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/portal"
            className="hidden items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-primary-soft sm:inline-flex"
          >
            <I.User className="size-4" />
            Client Login
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,72,204,0.3)] transition-colors hover:bg-primary-dark"
          >
            Talk to a broker
          </Link>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <MarketingLogo dark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Secure loan application tracking and broker workflow for BAI Finance — from first
              enquiry to settlement, with lender decisions handled by the bank.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "AUSTRAC: N/A",
                "Privacy Act (APPs) compliant",
                "SSL/TLS everywhere",
                "Invite-only access",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-white/75"
                >
                  <I.Lock className="size-3 text-gold" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/portal" className="transition-colors hover:text-white">
                  Portal access
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>Level 12, 40 Market Street, Sydney NSW 2000</li>
              <li>1300 BAI NOW (1300 224 669)</li>
              <li>hello@baifinance.com.au</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BAI Finance. BAI Finance does not hold funds, process repayments, or make lending decisions.</p>
          <p>The authenticated portal is excluded from search indexing.</p>
        </div>
      </div>
    </footer>
  );
}

export default function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}