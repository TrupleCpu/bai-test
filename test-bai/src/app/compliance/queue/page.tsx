"use client";

import { useState } from "react";
import Link from "next/link";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Pill, TrustNote } from "@/components/ui";
import { applications, uploadedDocs } from "@/lib/data";
import { appStatusTone, currency, docStatusTone } from "@/lib/tone";
import { portalNav } from "@/lib/portals";
import type { ApplicationStatus, LoanApplication } from "@/lib/types";

const sortDate = (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime();

const queueStatuses: ApplicationStatus[] = ["Submitted", "In Review", "Additional Info Requested"];

export default function ReviewQueue() {
  const [rows, setRows] = useState<LoanApplication[]>(
    applications.filter((a) => queueStatuses.includes(a.status)).sort((a, b) => sortDate(a.updatedAt, b.updatedAt)),
  );
  const [open, setOpen] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const act = (id: string, status: ApplicationStatus, message: string) => {
    setRows((v) => v.map((a) => (a.id === id ? { ...a, status } : a)));
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  };

  return (
    <PortalShell
      role="compliance"
      nav={portalNav.compliance}
      title="Applications Queue"
      breadcrumb="Compliance Portal / Applications Queue"
      notifications={3}
      mfa
    >
      {toast && (
        <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-positive/10 px-4 py-3 text-sm font-semibold text-positive">
          <I.Check className="size-4" />
          {toast} — logged to the audit trail.
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <span className="font-semibold text-navy">{rows.length}</span> application
          {rows.length === 1 ? "" : "s"} awaiting review, ordered oldest first.
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-positive/25 bg-positive/5 px-3 py-1 text-[11px] font-semibold text-positive">
          <I.ShieldCheck className="size-3.5" />
          Decisions audited
        </span>
      </div>

      <div className="space-y-3">
        {rows.map((app) => {
          const expanded = open === app.id;
          return (
            <Card key={app.id} pad="p-0" className="overflow-hidden">
              <button
                onClick={() => setOpen(expanded ? null : app.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-primary-soft/40"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <I.File className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-ink">{app.clientName}</span>
                    <span className="text-xs text-muted">{app.id}</span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {app.lender} · {currency(app.amount)} · {app.purpose}
                  </span>
                </span>
                <Pill tone={appStatusTone[app.status]}>{app.status}</Pill>
                <span className="hidden text-xs text-muted sm:block">Submitted {app.updatedAt}</span>
                <span
                  className={`flex size-8 items-center justify-center rounded-lg text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
                >
                  <I.ChevronDown className="size-4" />
                </span>
              </button>

              {expanded && (
                <div className="border-t border-black/5 bg-surface/40 px-5 py-5">
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                        Client details
                      </h4>
                      <dl className="mt-2 space-y-1.5 text-sm">
                        <div className="flex gap-2"><dt className="w-20 shrink-0 text-muted">Name</dt><dd className="font-medium text-ink">{app.clientName}</dd></div>
                        <div className="flex gap-2"><dt className="w-20 shrink-0 text-muted">Lender</dt><dd className="font-medium text-ink">{app.lender}</dd></div>
                        <div className="flex gap-2"><dt className="w-20 shrink-0 text-muted">Amount</dt><dd className="font-medium text-ink">{currency(app.amount)}</dd></div>
                        <div className="flex gap-2"><dt className="w-20 shrink-0 text-muted">Term</dt><dd className="font-medium text-ink">{app.termMonths} months</dd></div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted">Documents</h4>
                      <ul className="mt-2 space-y-1.5">
                        {uploadedDocs.slice(0, 3).map((d) => (
                          <li key={d.id} className="flex items-center justify-between gap-3 text-sm">
                            <span className="flex min-w-0 items-center gap-2 text-ink">
                              <I.Doc className="size-4 shrink-0 text-primary" />
                              <span className="truncate">{d.name}</span>
                            </span>
                            <Pill tone={docStatusTone[d.status]}>{d.status}</Pill>
                          </li>
                        ))}
                        <li className="flex items-center gap-2 text-xs text-muted">
                          <I.Lock className="size-3.5 text-positive" />
                          Full document view is access-logged per audit policy.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted">Broker notes</h4>
                      <p className="mt-2 rounded-lg bg-white p-3 text-sm leading-relaxed text-ink/80">
                        {app.notes ??
                          app.broker +
                            " flagged the file as complete. Income confirmations verified, valuation pending bank confirmation."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4">
                    <span className="text-xs text-muted">
                      Decision requires mandatory 2FA. Last activity: {app.updatedAt}.
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/compliance/applications/${app.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-primary-soft"
                      >
                        <I.Eye className="size-4" />
                        Full review
                      </Link>
                      <Button variant="goldOutline" onClick={() => act(app.id, "Additional Info Requested", `More info requested for ${app.clientName}`)}>
                        Request More Info
                      </Button>
                      <Button variant="danger" onClick={() => act(app.id, "Declined", `Application ${app.id} declined`)}>
                        Decline
                      </Button>
                      <Button variant="positive" onClick={() => act(app.id, "Approved", `Application ${app.id} approved`)}>
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
        {rows.length === 0 && (
          <Card className="p-10 text-center text-sm text-muted">
            <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-positive/10 text-positive">
              <I.Check className="size-6" />
            </span>
            Queue is clear — all applications have been decided.
          </Card>
        )}
      </div>
      <TrustNote />
    </PortalShell>
  );
}