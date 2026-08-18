import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about applying, tracking your application, documents, security, and privacy with BAI Finance.",
};

const FAQ_GROUPS: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Applying",
    items: [
      {
        q: "Do I need to sign up to get a loan?",
        a: "No — there is no public sign-up. Your broker prepares your application and submits it on your behalf, and our Compliance Team creates your client account and sends you a secure invite.",
      },
      {
        q: "How do I know which loan is right for me?",
        a: "Start with a free consultation. We'll review your income, goals, and budget, then recommend the right loan type and lender — including ANZ, CommBank, and others.",
      },
      {
        q: "Does BAI Finance charge fees?",
        a: "Your consultation is free. Any lender or broker fees are always explained clearly before you proceed — we never move or hold your funds.",
      },
      {
        q: "What information does my broker need?",
        a: "Typically income details, identity documents, and information about the property or purchase — your broker will tell you exactly what's needed and when.",
      },
    ],
  },
  {
    group: "Tracking your application",
    items: [
      {
        q: "How do I track my application?",
        a: "Once you've been invited, log in to the Client Portal and open My Applications. You'll see live status: Submitted, In Review, Additional Info Requested, Approved, Declined, or Settled.",
      },
      {
        q: "My invite link expired. What now?",
        a: "Ask your broker or the Compliance Team to send a new invite. Because there's no public self-registration, we'll simply re-issue a fresh secure link.",
      },
      {
        q: "Can I submit a new application myself?",
        a: "No — applications are created and submitted by your broker or the Compliance Team. Your role is to track progress and respond to requests.",
      },
      {
        q: "Who handles the money side?",
        a: "BAI Finance never collects payments or disburses funds. Repayments and disbursements happen directly with your chosen lender.",
      },
    ],
  },
  {
    group: "Documents & security",
    items: [
      {
        q: "When can I upload documents?",
        a: "Only when a specific request is pending — you'll see the request in your portal and upload securely from there. We never ask for unnecessary documents.",
      },
      {
        q: "How is my data protected?",
        a: "Every page uses SSL/TLS, data is encrypted at rest, sessions time out, and MFA is available. Every access to and change of your application is recorded in an audit log.",
      },
      {
        q: "Why is access invite-only?",
        a: "Invite-only access is a deliberate security decision. It keeps accounts verified and controlled — reducing the risk of fraud and identity theft that open sign-ups invite.",
      },
    ],
  },
  {
    group: "Privacy",
    items: [
      {
        q: "What privacy rules apply to BAI Finance?",
        a: "As an Australian-based operation handling personal and financial data, BAI Finance follows the Australian Privacy Principles under the Privacy Act. We only collect what the loan process requires.",
      },
      {
        q: "How long do you keep my information?",
        a: "Only as long as it's needed for your loan relationship and standard commercial record-keeping — following privacy-minimization principles, not lengthy defaults.",
      },
      {
        q: "Can I request my data or corrections?",
        a: "Yes. Contact us to request access to or correction of your personal information. See our Privacy page for details.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        pill="FAQ"
        title="Frequently asked questions"
        subtitle="Quick answers about applying, tracking your application, and how we protect your data."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="space-y-12">
            {FAQ_GROUPS.map((group) => (
              <div key={group.group}>
                <h2 className="font-display text-xl font-semibold text-navy-700">
                  {group.group}
                </h2>
                <div className="mt-5 divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white shadow-sm">
                  {group.items.map((item) => (
                    <details key={item.q} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:text-gold-500">
                        {item.q}
                        <Icon
                          name="chevron-down"
                          className="size-5 shrink-0 text-navy-400 transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink/70">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-navy-900 p-7 text-center">
            <h2 className="font-display text-xl font-semibold text-white">
              Still have questions?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-100">
              Our team is happy to help — call, email, or use live chat during
              business hours.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="mailto:hello@baifinance.example.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors duration-200 hover:bg-gold-500"
              >
                <Icon name="envelope" className="size-4" />
                Email us
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy-800"
              >
                Contact page
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
