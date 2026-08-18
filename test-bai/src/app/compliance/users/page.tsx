"use client";

import { useMemo, useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Pill } from "@/components/ui";
import { staffAccounts as seed } from "@/lib/data";
import { portalNav } from "@/lib/portals";
import type { StaffAccount, StaffRole, StaffStatus } from "@/lib/types";

const roleTone: Record<StaffRole, { text: string; bg: string; dot: string }> = {
  Broker: { text: "text-primary", bg: "bg-primary/10", dot: "bg-primary" },
  "Senior Broker": { text: "text-navy", bg: "bg-navy/10", dot: "bg-navy" },
  "Compliance Team": { text: "text-warn", bg: "bg-warn/10", dot: "bg-warn" },
};

const statusTone: Record<StaffStatus, { text: string; bg: string; dot: string }> = {
  Pending: { text: "text-warn", bg: "bg-warn/10", dot: "bg-warn" },
  Active: { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" },
  Suspended: { text: "text-muted", bg: "bg-surface", dot: "bg-muted" },
};

export default function ComplianceUsers() {
  const [rows, setRows] = useState<StaffAccount[]>(seed);
  const [note, setNote] = useState<string | null>(null);

  const pending = useMemo(() => rows.filter((r) => r.status === "Pending"), [rows]);

  const flash = (msg: string) => {
    setNote(msg);
    window.setTimeout(() => setNote(null), 3500);
  };

  const approve = (id: string, role: StaffRole) => {
    setRows((v) => v.map((r) => (r.id === id ? { ...r, status: "Active", role, approvedBy: "Keanu Chen", mfa: true } : r)));
    flash(`${id} approved as ${role} — role assigned, MFA enforced.`);
  };

  const reject = (id: string) => {
    setRows((v) => v.map((r) => (r.id === id ? { ...r, status: "Suspended" } : r)));
    flash(`Request rejected — account suspended. Least-privilege defaults retained.`);
  };

  const suspend = (id: string) => {
    setRows((v) => v.map((r) => (r.id === id ? { ...r, status: "Suspended" } : r)));
    flash("Access suspended — logged to the audit trail.");
  };

  return (
    <PortalShell
      role="compliance"
      nav={portalNav.compliance}
      title="User & Role Management"
      breadcrumb="Compliance Portal / User Management"
      notifications={3}
      mfa
    >
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-navy">User &amp; role management</h2>
        <p className="mt-1 text-sm text-muted">
          Approve broker and staff accounts, assign roles, and enforce least-privilege defaults
          (UC-8).
        </p>
      </div>

      {note && (
        <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-positive/10 px-4 py-3 text-sm font-semibold text-positive">
          <I.Check className="size-4" />
          {note}
        </div>
      )}

      {pending.length > 0 && (
        <Card pad="p-6" className="mb-6 border-gold/40 bg-gold-soft/40">
          <h3 className="text-sm font-semibold text-navy">Pending approvals</h3>
          <p className="mt-1 text-xs text-muted">
            New accounts start with the minimum role needed — no elevated permissions by default.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {pending.map((p) => (
              <div key={p.id} className="rounded-xl border border-black/[0.06] bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                    {p.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-ink">{p.name}</div>
                    <div className="truncate text-xs text-muted">{p.email}</div>
                    <div className="mt-0.5 text-xs text-muted">Requested {p.requestedAt}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(["Broker", "Senior Broker", "Compliance Team"] as StaffRole[]).map((role) => (
                    <Button key={role} variant="outline" className="!px-3 !py-1 !text-xs" onClick={() => approve(p.id, role)}>
                      Approve as {role}
                    </Button>
                  ))}
                  <Button variant="ghost" className="!px-3 !py-1 !text-xs" onClick={() => reject(p.id)}>
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h3 className="text-sm font-semibold text-navy">All staff accounts</h3>
          <span className="text-xs text-muted">{rows.length} accounts</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-surface/60 text-[11px] uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">MFA</th>
                <th className="px-5 py-3 font-semibold">Approved by</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-black/5 last:border-0 hover:bg-primary-soft/30">
                  <td className="px-5 py-3">
                    <div className="font-semibold text-ink">{r.name}</div>
                    <div className="text-xs text-muted">{r.email}</div>
                  </td>
                  <td className="px-5 py-3">
                    <Pill tone={roleTone[r.role]}>{r.role}</Pill>
                  </td>
                  <td className="px-5 py-3">
                    <Pill tone={statusTone[r.status]}>{r.status}</Pill>
                  </td>
                  <td className="px-5 py-3">
                    {r.mfa ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-positive">
                        <I.ShieldCheck className="size-3.5" />
                        Enforced
                      </span>
                    ) : (
                      <span className="text-xs text-muted">Pending</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-muted">{r.approvedBy ?? "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {r.status === "Active" ? (
                        <Button variant="ghost" className="!px-3 !py-1 !text-xs" onClick={() => suspend(r.id)}>
                          Suspend
                        </Button>
                      ) : (
                        <Button variant="outline" className="!px-3 !py-1 !text-xs" onClick={() => approve(r.id, r.role)}>
                          Reactivate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PortalShell>
  );
}