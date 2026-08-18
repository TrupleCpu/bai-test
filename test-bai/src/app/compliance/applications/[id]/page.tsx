"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Pill, TextArea, TrustNote } from "@/components/ui";
import { applications, uploadedDocs } from "@/lib/data";
import { appStatusTone, currency, docStatusTone } from "@/lib/tone";
import { portalNav } from "@/lib/portals";
import type { ApplicationStatus } from "@/lib/types";

export default function ComplianceApplicationReview() {
  const params = useParams<{ id: string }>();
  const app = useMemo(() => applications.find((a) => a.id === params.id), [params.id]);
  const [reason, setReason] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  if (!app) {
    return (
      <PortalShell role="compliance" nav={portalNav.compliance} title="Application not found">
        <Card className="p-8 text-center">
          <p className="text-sm text-muted">We couldn&apos;t find that application.</p>
          <Link href="/compliance/queue" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            <I.ArrowRight className="size-4 rotate-180" />
            Back to the queue
          </Link>
        </Card>
      </PortalShell>
    );
  }

  const submit = (status: ApplicationStatus) => {
    setToast(`Application ${app.id} ${status} — decision, reviewer and timestamp logged to the audit trail.`);
    window.setTimeout(() => setToast(null), 5000);
  };

  return (
    <PortalShell
      role="compliance"
      nav={portalNav.compliance}
      title={app.id}
      breadcrumb="Compliance Portal / Applications Queue"
      notifications={3}
      mfa
    >
      <Link href="/compliance/queue" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <I.ArrowRight className="size-4 rotate-180" />
        Back to the queue
      </Link>

      {toast && (
        <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-positive/10 px-4 py-3 text-sm font-semibold text-positive">
          <I.Check className="size-4" />
          {toast}
        </div>
      )}

      <Card className="mb-6 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-navy">{app.clientName}</h2>
            <p className="mt-1 text-sm text-muted">
              {app.lender} · {currency(app.amount)} · {app.purpose} · {app.termMonths} months
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Pill tone={appStatusTone[app.status]}>{app.status}</Pill>
            <span className="text-xs text-muted">Submitted {app.updatedAt}</span>
          </div>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <I.ShieldCheck className="size-3.5 text-positive" />
          Mandatory 2FA required for decisions · every action is written to the immutable audit log.
        </p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card pad="p-6">
            <h3 className="text-sm font-semibold text-navy">Client details</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Client", app.clientName],
                ["Assigned broker", app.broker],
                ["Lender", app.lender],
                ["Loan amount", currency(app.amount)],
                ["Purpose", app.purpose],
                ["Term", `${app.termMonths} months`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card pad="p-6">
            <h3 className="text-sm font-semibold text-navy">Documents</h3>
            <ul className="mt-4 space-y-2">
              {uploadedDocs.map((d) => (
                <li key={d.id} className="flex items-center gap-3 rounded-lg border border-black/[0.06] bg-surface/40 px-3 py-2.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {d.type}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-ink">{d.name}</div>
                    <div className="text-xs text-muted">{d.size}</div>
                  </div>
                  <Pill tone={docStatusTone[d.status]}>{d.status}</Pill>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <I.Lock className="size-3.5 text-positive" />
              Full document view requires a logged business reason (data-minimization policy).
            </p>
          </Card>

          <Card pad="p-6">
            <h3 className="text-sm font-semibold text-navy">Broker notes</h3>
            <p className="mt-3 rounded-lg bg-surface/60 p-4 text-sm leading-relaxed text-ink/80">
              {app.notes ??
                app.broker +
                  " flagged the file as complete. Income confirmations verified; valuation pending bank confirmation."}
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          <Card pad="p-6">
            <h3 className="text-sm font-semibold text-navy">Review decision</h3>
            <p className="mt-1 text-xs text-muted">
              Current status: {app.status}. Changes notify both client and broker and are logged.
            </p>
            <div className="mt-4 space-y-2">
              <Button variant="goldOutline" className="w-full" onClick={() => submit("Additional Info Requested")}>
                <I.Alert className="size-4" />
                Request More Info
              </Button>
              <Button variant="danger" className="w-full" onClick={() => submit("Declined")}>
                <I.XCircle className="size-4" />
                Decline
              </Button>
              <Button variant="positive" className="w-full" onClick={() => submit("Approved")}>
                <I.Check className="size-4" />
                Approve
              </Button>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-semibold text-muted">
                Decision note <span className="font-normal">(logged to audit trail)</span>
              </span>
              <TextArea
                placeholder="Optional — reason for the decision, next steps…"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-24"
              />
            </label>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <I.ShieldCheck className="size-3.5 text-positive" />
              Decision requires the reviewer&apos;s 2FA to be active.
            </p>
          </Card>
        </div>
      </div>
      <TrustNote />
    </PortalShell>
  );
}