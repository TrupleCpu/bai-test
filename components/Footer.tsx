import Link from "next/link";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/CallNowButton";

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/apply", label: "How to Apply" },
  { href: "/trust-security", label: "Trust & Security" },
  { href: "/privacy", label: "Privacy" },
];

const CLIENT_LINKS = [
  { href: "/track-application", label: "Track My Application" },
  { href: "/portal", label: "Client Login" },
  { href: "/book", label: "Book a Consultation" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">
              A trusted loan brokerage helping families and businesses across
              the{" "}
              <span className="font-semibold tracking-wide text-gold-400">
                PHILIPPINES
              </span>{" "}
              find the right lender, prepare a complete application, and track
              it securely from submission to settlement.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-navy-300">
              <span className="rounded-full border border-navy-700 px-3 py-1">
                SSL / TLS encrypted
              </span>
              <span className="rounded-full border border-navy-700 px-3 py-1">
                AU Privacy Act (APPs)
              </span>
              <span className="rounded-full border border-navy-700 px-3 py-1">
                Invite-only access
              </span>
            </div>
          </div>

          <nav aria-label="Company">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Clients">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Clients
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {CLIENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-gold-400"
                >
                  <Icon name="phone" className="size-4" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <Icon name="envelope" className="mt-0.5 size-4" />
                <a
                  href="mailto:hello@baifinance.example.com"
                  className="transition-colors duration-200 hover:text-gold-400"
                >
                  hello@baifinance.example.com
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <Icon name="map" className="mt-0.5 size-4" />
                <span>
                  Makati City, Philippines
                  <br />
                  Sydney, Australia
                </span>
              </li>
              <li className="inline-flex items-start gap-2">
                <Icon name="clock" className="mt-0.5 size-4" />
                <span>Mon – Fri, 9:00am – 6:00pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-navy-800 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} BAI Finance. All rights reserved.
          </p>
          <p className="max-w-xl leading-relaxed">
            BAI Finance is a loan application tracking and brokerage platform.
            It does not hold funds, process repayments, or make lending
            decisions — those remain with your chosen lender.
          </p>
        </div>
      </div>
    </footer>
  );
}
