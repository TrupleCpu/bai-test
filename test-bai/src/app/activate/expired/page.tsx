import Link from "next/link";
import { I } from "@/components/icons";
import { Card } from "@/components/ui";

export default function ActivateExpiredPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-navy text-white shadow">
          <I.ShieldCheck className="size-6" />
        </span>
        <div className="leading-tight">
          <div className="text-lg font-bold tracking-tight text-navy">BAI Finance</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Secure Portal</div>
        </div>
      </Link>

      <Card pad="p-6" className="w-full max-w-md text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-warn/10 text-warn">
          <I.Alert className="size-7" />
        </span>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-navy">This invite has expired</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Invite links are single-use and expire after 30 days for your security. There&apos;s no
          public sign-up — ask your broker or the Compliance Team to send a new invite.
        </p>
        <div className="mt-6 grid gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,72,204,0.3)] transition-colors hover:bg-primary-dark"
          >
            <I.Mail className="size-4" />
            Request a new invite
          </Link>
          <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy/25 bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-primary-soft">
            Back to log in
          </Link>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
          <I.ShieldCheck className="size-3.5 text-positive" />
          Already activated? Just log in normally.
        </p>
      </Card>
    </div>
  );
}