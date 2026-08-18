import Link from "next/link";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/apply", label: "Apply" },
  { href: "/track-application", label: "Track My Application" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-700 transition-colors duration-200 hover:text-gold-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:text-gold-500"
          >
            <Icon name="lock" className="size-4" />
            Client Login
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
          >
            <Icon name="calendar" className="size-4" />
            Book a Consultation
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary
            aria-label="Open navigation menu"
            className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-lg border border-navy-100 text-navy-700 transition-colors duration-200 hover:border-navy-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </summary>
          <div className="absolute inset-x-4 top-16 rounded-2xl border border-navy-100 bg-white p-4 shadow-lg">
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 transition-colors duration-200 hover:bg-navy-50 hover:text-gold-500"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-navy-100 pt-3">
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-500 px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:bg-navy-50"
                >
                  <Icon name="lock" className="size-4" />
                  Client Login
                </Link>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
                >
                  <Icon name="calendar" className="size-4" />
                  Book a Consultation
                </Link>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
