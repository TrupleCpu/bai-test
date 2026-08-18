"use client";

import { useMemo, useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button } from "@/components/ui";
import { auditLog } from "@/lib/data";
import { portalNav } from "@/lib/portals";

const sortTs = (a: string, b: string) => b.localeCompare(a);

export default function AuditLog() {
  const [q, setQ] = useState("");
  const [entity, setEntity] = useState("all");
  const [action, setAction] = useState("all");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");

  const rows = useMemo(() => {
    const list = [...auditLog].sort((a, b) => sortTs(a.timestamp, b.timestamp));
    const needle = q.trim().toLowerCase();
    return list.filter((r) => {
      if (needle && !r.id.toLowerCase().includes(needle) && !r.entityId.toLowerCase().includes(needle) && !r.actor.toLowerCase().includes(needle)) return false;
      if (entity !== "all" && r.entityType !== entity) return false;
      if (action !== "all" && r.action !== action) return false;
      if (from && r.timestamp.slice(0, 10) < from) return false;
      if (until && r.timestamp.slice(0, 10) > until) return false;
      return true;
    });
  }, [q, entity, action, from, until]);

  const entityTypes = useMemo(() => ["all", ...new Set(auditLog.map((r) => r.entityType))], []);
  const actions = useMemo(() => ["all", ...new Set(auditLog.map((r) => r.action))], []);

  return (
    <PortalShell
      role="compliance"
      nav={portalNav.compliance}
      title="Audit Log"
      breadcrumb="Compliance Portal / Audit Log"
      notifications={3}
      mfa
    >
      <div className="mb-4 flex flex-col gap-3 bg-white px-5 py-4 shadow-[0_1px_3px_rgba(10,40,129,0.06)] lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-1 flex-wrap items-end gap-3">
          <label className="block flex-1 basis-56">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Search
            </span>
            <div className="relative">
              <I.Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Application ID, user, entity ID…"
                className="w-full rounded-lg border border-ink/15 bg-white py-2 pl-9 pr-3 font-mono text-xs text-ink placeholder:font-sans placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Entity
            </span>
            <select
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
            >
              {entityTypes.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All types" : t}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Action
            </span>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
            >
              {actions.map((a) => (
                <option key={a} value={a}>
                  {a === "all" ? "All actions" : a.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              From
            </span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              To
            </span>
            <input
              type="date"
              value={until}
              onChange={(e) => setUntil(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
            />
          </label>
        </div>
        <Button variant="navy" className="shrink-0">
          <I.Download className="size-4" />
          Export for Regulatory Reporting
        </Button>
      </div>

      <div className="overflow-hidden bg-white shadow-[0_1px_3px_rgba(10,40,129,0.06)]">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-2.5">
          <span className="text-xs text-muted">
            {rows.length} event{rows.length === 1 ? "" : "s"} retained · immutable · export-ready
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-positive">
            <I.Lock className="size-3.5" />
            Access logging active
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 bg-surface/70 text-[11px] uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">Timestamp</th>
                <th className="px-5 py-3 font-semibold">Actor</th>
                <th className="px-5 py-3 font-semibold">Action</th>
                <th className="px-5 py-3 font-semibold">Entity Type</th>
                <th className="px-5 py-3 font-semibold">Entity ID</th>
                <th className="px-5 py-3 text-right font-semibold">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-black/5 last:border-0 hover:bg-primary-soft/30">
                  <td className="whitespace-nowrap px-5 py-2.5 font-mono text-xs text-ink">{r.timestamp}</td>
                  <td className="px-5 py-2.5 text-sm text-ink">{r.actor}</td>
                  <td className="px-5 py-2.5 text-sm text-ink">
                    <span className="rounded-md bg-navy/5 px-2 py-0.5 font-medium text-navy">
                      {r.action.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-sm text-muted">{r.entityType}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 font-mono text-xs text-navy">{r.entityId}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 text-right font-mono text-xs text-muted">{r.ip}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-muted">
                    No audit events match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}