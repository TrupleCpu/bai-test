import type { Metadata } from "next";
import Icon from "@/components/Icon";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Client Login",
  description:
    "Secure, invite-only sign in to the BAI Finance client portal.",
};

export default function PortalPage() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
        <div className="lg:pt-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-500 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy-500">
            <Icon name="lock" className="size-4 text-gold-500" />
            Client Portal
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-navy-700 sm:text-4xl">
            Track your application securely
          </h1>
          <p className="mt-4 leading-relaxed text-ink/70">
            Sign in to see your application status, respond to document
            requests, and review your communication history with your broker.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: "key", text: "Accounts are created and invited by the BAI Finance Compliance Team" },
              { icon: "shield-check", text: "Multi-factor authentication available for extra protection" },
              { icon: "clock", text: "Sessions time out automatically after inactivity" },
              { icon: "document", text: "Upload documents only when we request them" },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3 text-sm text-ink/75">
                <Icon name={item.icon} className="mt-0.5 size-5 shrink-0 text-gold-500" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-7 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-navy-100 pb-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-700 text-white">
              <Icon name="user" className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-navy-700">
                Welcome back
              </h2>
              <p className="text-sm text-ink/60">Sign in to your application dashboard</p>
            </div>
          </div>
          <LoginForm />
          <div className="mt-6 rounded-xl bg-cream p-4">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-ink/70">
              <Icon name="exclamation-triangle" className="mt-0.5 size-4 shrink-0 text-gold-600" />
              No account yet? BAI Finance has no public sign-up — ask your
              broker or the Compliance Team for your secure invite.
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-ink/50">
            This is a UI preview. No authentication is performed.
          </p>
        </div>
      </div>
    </section>
  );
}
