"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Card, Pill, TrustNote } from "@/components/ui";
import { applications, communications } from "@/lib/data";
import { appStatusTone, currency } from "@/lib/tone";
import { portalNav } from "@/lib/portals";
import type { ApplicationStatus } from "@/lib/types";

const stepOrder: { key: string; label: string }[] = [
  { key: "Submitted", label: "Submitted" },
  { key: "Additional Info Requested", label: "Additional Info Requested" },
  { key: "Approved", label: "Approved / Declined" },
  { key: "Settled", label: "Settled" },
];

const stepIndex: Record<string, number> = {
  Submitted: 0,
  "In Review": 0,
  "Additional Info Requested": 1,
  Approved: 2,
  Declined: 2,
  Settled: 3,
};

function Stepper({ status }: { status: ApplicationStatus }) {
  const current = stepIndex[status] ?? 0;
  const progress = stepOrder.length > 1 ? current / (stepOrder.length - 1) : 0;
  return (
    <div className="overflow-x-auto pb-1">
      <div className="relative flex min-w-[560px] items-start sm:min-w-0">
        <span aria-hidden="true" className="absolute left-4 right-4 top-4 h-0.5 rounded-full bg-ink/10" />
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 h-0.5 rounded-full bg-navy/50 transition-all"
          style={{ width: `calc((100% - 2rem) * ${progress})` }}
        />
        {stepOrder.map((step, i) => {
          const done = i < current;
          const isCurrent = i === current;
          const isSettled = status === "Settled";
          return (
            <div key={step.key} className="relative z-10 flex flex-1 flex-col items-center px-1">
              <span
                className={`flex size-8 items-center justify-center rounded-full text-sm font-bold ${
                  isSettled && i === 3
                    ? "bg-navy text-white"
                    : done
                      ? "bg-navy text-white"
                      : isCurrent
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-surface text-muted ring-1 ring-ink/10"
                }`}
              >
                {done || (isSettled && i === 3) ? <I.Check className="size-4" /> : i + 1}
              </span>
              <div className="mt-2 w-24 text-center">
                <div
                  className={`text-xs font-semibold ${isCurrent ? "text-primary" : done ? "text-navy" : "text-muted"}`}
                >
                  {status === "Declined" && i === 2 ? "Declined" : step.label}
                </div>
                {isCurrent && status === "Declined" && (
                  <div className="mt-0.5 text-[10px] font-medium text-danger">Final decision</div>
                )}
                {isCurrent && status === "In Review" && (
                  <div className="mt-0.5 text-[10px] font-medium text-muted">Under assessment</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ApplicationDetail() {
  const params = useParams<{ id: string }>();
  const app = useMemo(
    () => applications.find((a) => a.id === params.id),
    [params.id],
  );
  const [tab, setTab] = useState<"overview" | "communication">("communication");

  if (!app) {
    return (
      <PortalShell role="client" nav={portalNav.client} title="Application not found">
        <Card className="p-8 text-center">
          <p className="text-sm text-muted">We couldn’t find that application. Go back to your dashboard.</p>
        </Card>
      </PortalShell>
    );
  }

  return (
    <PortalShell
      role="client"
      nav={portalNav.client}
      title={app.id}
      breadcrumb="Client Portal / My Applications"
    >
      <Link href="/client" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <I.ChevronRight className="size-4 rotate-180" />
        Back to My Applications
      </Link>

      <Card className="mb-6 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-navy">{app.lender} application</h2>
            <p className="mt-1 text-sm text-muted">
              {currency(app.amount)} · {app.purpose} · {app.termMonths} months
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Pill tone={appStatusTone[app.status]}>{app.status}</Pill>
            <span className="text-xs text-muted">Updated {app.updatedAt}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-navy">
          <span className="size-2 rounded-full bg-primary" />
          Application status
        </div>
        <Stepper status={app.status} />
      </Card>

      <div className="mb-4 flex gap-1 rounded-xl bg-white p-1 shadow-[0_1px_3px_rgba(10,40,129,0.06)]">
        {(
          [
            ["overview", "Application Details"],
            ["communication", "Communication"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === key ? "bg-primary text-white shadow" : "text-muted hover:text-navy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <Card pad="p-6">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Lender", app.lender],
              ["Loan amount", currency(app.amount)],
              ["Purpose", app.purpose],
              ["Loan term", `${app.termMonths} months`],
              ["Assigned broker", app.broker],
              ["Last updated", app.updatedAt],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 flex items-center gap-1.5 border-t border-black/5 pt-4 text-xs text-muted">
            <I.Lock className="size-3.5 text-positive" />
            This view is read-only. Changes are made by your broker on your behalf.
          </p>
        </Card>
      ) : (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy">
              Communication log <span className="font-normal text-muted">· read-only</span>
            </h3>
            <span className="text-xs text-muted">Chronological order</span>
          </div>
          <div className="space-y-3">
            {communications.map((c) => (
              <Card key={c.id} className="p-4">
                <div className="flex items-start gap-3.5">
                  <span
                    className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${
                      c.direction === "inbound" ? "bg-navy/5 text-navy" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {c.direction === "inbound" ? <I.User className="size-4" /> : <I.Mail className="size-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-sm font-semibold text-ink">{c.subject}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        <I.Check className="size-3" />
                        Receipt confirmed
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      {c.from} → {c.to} · {c.timestamp}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/80">{c.preview}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      <TrustNote />
    </PortalShell>
  );
}