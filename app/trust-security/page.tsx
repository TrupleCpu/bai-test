import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Trust & Security",
  description:
    "How BAI Finance protects your personal and financial data — encryption, invite-only access, audit trails, and Australian Privacy Act compliance.",
};

const CONTROLS = [
  {
    icon: "lock",
    title: "Encrypted everywhere",
    description:
      "SSL/TLS on every page and API call, with encryption at rest for stored data. Your information is protected in transit and at rest.",
  },
  {
    icon: "key",
    title: "Invite-only accounts",
    description:
      "No public self-registration. Every client account is created and verified by our Compliance Team, then activated via a secure invite link.",
  },
  {
    icon: "shield-check",
    title: "Strict access controls",
    description:
      "Role-based access means brokers and staff only see what their role requires — and object-level checks prevent anyone from viewing another client's application.",
  },
  {
    icon: "clock",
    title: "Full audit trail",
    description:
      "Every access to and change of an application is logged — who, what, when, and from where. The trail is immutable and reviewable.",
  },
  {
    icon: "document",
    title: "Secure document handling",
    description:
      "Identity documents and payslips are stored in private storage and shared only through short-lived, authorized links — never public URLs.",
  },
  {
    icon: "sparkles",
    title: "Data minimization",
    description:
      "We collect only what the loan and KYC process genuinely requires, and we keep it no longer than needed for your loan relationship.",
  },
];

const COMPLIANCE = [
  {
    title: "Australian Privacy Act (APPs)",
    text: "As an Australian-based operation, we comply with the Australian Privacy Principles. We never hold funds and never collect card data — repayments and disbursements stay with your lender.",
  },
  {
    title: "Multi-factor authentication",
    text: "MFA is mandatory for brokers and staff and available to clients, protecting every account against unauthorized access.",
  },
  {
    title: "OWASP-aligned development",
    text: "We build against the OWASP Top 10 — parameterized queries, strict input validation, malware scanning on uploads, and rate limiting on public endpoints.",
  },
  {
    title: "No public sign-up",
    text: "Invite-only access reduces the risk of fraud and identity theft. If you weren't invited, you can't create an account — by design.",
  },
];

export default function TrustSecurityPage() {
  return (
    <>
      <PageHeader
        pill="Trust & Security"
        title="Your data is handled with care"
        subtitle="A loan application holds sensitive personal and financial information. We treat it as seriously as it deserves — here's how."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CONTROLS.map((control) => (
              <div
                key={control.title}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-700 text-white">
                  <Icon name={control.icon} className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-base font-semibold text-navy-700">
                  {control.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {control.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {COMPLIANCE.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold text-navy-700">
                  <Icon name="check-badge" className="size-6 text-gold-500" />
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink/60">
            We monitor our systems for suspicious activity, review access
            regularly, and keep our privacy practices under continuous review.
            For details on how we collect and use your information, see our{" "}
            <a
              href="/privacy"
              className="font-semibold text-navy-700 underline decoration-gold-400 underline-offset-2 transition-colors duration-200 hover:text-gold-500"
            >
              Privacy page
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
