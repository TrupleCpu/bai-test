"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Card, Pill } from "@/components/ui";
import { applications, lenders } from "@/lib/data";
import { appStatusTone, currency } from "@/lib/tone";
import { portalNav } from "@/lib/portals";
import type { ApplicationStatus } from "@/lib/types";

const ALL = "all";
const statuses: ApplicationStatus[] = ["Submitted", "In Review", "Additional Info Requested", "Approved", "Declined", "Settled"];

export default function BrokerApplications() {
  const [status, setStatus] = useState<string>(ALL);
  const [lender, setLender] = useState<string>(ALL);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"date" | "amount" | "client">("date");

  const rows = useMemo(() => {
    let list = [...applications].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    if (status !== ALL) list = list.filter((a) => a.status === status);
    if (lender !== ALL) list = list.filter((a) => a.lender === lender);
    if (q.trim()) {
      const n = q.trim().toLowerCase();
      list = list.filter((a) => a.clientName.toLowerCase().includes(n) || a.id.toLowerCase().includes(n));
    }
    if (sort === "amount") list.sort((a, b) => b.amount - a.amount);
    if (sort === "client") list.sort((a, b) => a.clientName.localeCompare(b.clientName));
    return list;
  }, [status, lender, q, sort]);

  return (
    <PortalShell
      role="broker"
      nav={portalNav.broker}
      title="Applications"
      breadcrumb="Broker Portal / Applications"
      mfa
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-navy">Loan applications</h2>
          <p className="mt-1 text-sm text-muted">
            Your book of applications across all assigned clients (UC-3).
          </p>
        </div>
        <Link
          href="/broker/applications/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,72,204,0.3)] transition-colors hover:bg-primary-dark"
        >
          <I.Plus className="size-4" />
          New Application
        </Link>
      </div>

      <Card className="mb-4 p-0 overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-black/5 px-5 py-4">
          <div className="relative">
            <I.Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search client or application…"
              className="w-56 rounded-lg border border-ink/15 bg-white py-2 pl-9 pr-3 text-sm text-ink focus:border-primary focus:outline-none"
            />
          </div>
          <select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
          >
            <option value={ALL}>All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            aria-label="Filter by lender"
            value={lender}
            onChange={(e) => setLender(e.target.value)}
            className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
          >
            <option value={ALL}>All lenders</option>
            {lenders.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select
            aria-label="Sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
          >
            <option value="date">Sort: last updated</option>
            <option value="amount">Sort: loan amount</option>
            <option value="client">Sort: client name</option>
          </select>
          <span className="ml-auto text-xs text-muted">{rows.length} shown</span>
        </div>
      </Card>

      <div className="space-y-3">
        {rows.map((a) => (
          <Card key={a.id} className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
                <I.File className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-ink">{a.clientName}</span>
                  <span className="text-xs text-muted">· {a.id}</span>
                </div>
                <div className="mt-0.5 text-sm text-muted">
                  {a.lender} · {currency(a.amount)} · {a.purpose}
                </div>
              </div>
              <Pill tone={appStatusTone[a.status]}>{a.status}</Pill>
              <span className="hidden text-xs text-muted sm:block">Updated {a.updatedAt}</span>
            </div>
          </Card>
        ))}
        {rows.length === 0 && (
          <Card className="p-10 text-center text-sm text-muted">No applications match these filters.</Card>
        )}
      </div>
    </PortalShell>
  );
}