"use client";

import { useMemo, useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Pill, TrustNote } from "@/components/ui";
import { invitations as seed } from "@/lib/data";
import { inviteStatusTone, verificationStatusTone } from "@/lib/tone";
import { portalNav } from "@/lib/portals";
import type { Invitation, VerificationStatus } from "@/lib/types";

export default function ComplianceInvitations() {
  const [rows, setRows] = useState<Invitation[]>(seed);
  const [note, setNote] = useState<string | null>(null);

  const pending = useMemo(() => rows.filter((r) => r.verificationStatus === "Pending"), [rows]);

  const flash = (msg: string) => {
    setNote(msg);
    window.setTimeout(() => setNote(null), 3500);
  };

  const verify = (id: string, status: VerificationStatus) => {
    setRows((v) => v.map((r) => (r.id === id ? { ...r, verificationStatus: status } : r)));
    flash(`Verification set to ${status} — logged to the audit trail.`);
  };

  const suspend = (id: string) => {
    setRows((v) => v.map((r) => (r.id === id ? { ...r, inviteStatus: "Expired" } : r)));
    flash("Account suspended — invite revoked and logged to the audit trail.");
  };

  return (
    <PortalShell
      role="compliance"
      nav={portalNav.compliance}
      title="Client Invitation & Verification"
      breadcrumb="Compliance Portal / Invitations"
      notifications={3}
      mfa
    >
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-navy">Invitation &amp; verification</h2>
        <p className="mt-1 text-sm text-muted">
          There is no public self-registration — every client account is created and invited here, then
          verified before accessing application tracking (UC-6).
        </p>
      </div>

      {note && (
        <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-positive/10 px-4 py-3 text-sm font-semibold text-positive">
          <I.Check className="size-4" />
          {note}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,340px)_1fr]">
        <div>
          <Card pad="p-6">
            <h3 className="text-sm font-semibold text-navy">Awaiting verification</h3>
            <p className="mt-1 text-xs text-muted">
              Invites sent but identity not yet confirmed.
            </p>
            <ul className="mt-4 space-y-3">
              {pending.map((p) => (
                <li key={p.id} className="rounded-lg border border-black/[0.06] bg-surface/50 p-3">
                  <div className="text-sm font-semibold text-ink">{p.name}</div>
                  <div className="text-xs text-muted">{p.email}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button variant="positive" className="!px-3 !py-1 !text-xs" onClick={() => verify(p.id, "Verified")}>
                      Verify
                    </Button>
                    <Button variant="goldOutline" className="!px-3 !py-1 !text-xs" onClick={() => verify(p.id, "Flagged")}>
                      Flag
                    </Button>
                    <Button variant="ghost" className="!px-3 !py-1 !text-xs" onClick={() => suspend(p.id)}>
                      Suspend
                    </Button>
                  </div>
                  {p.notes && <p className="mt-2 text-xs text-muted">{p.notes}</p>}
                </li>
              ))}
              {pending.length === 0 && (
                <li className="py-6 text-center text-xs text-muted">All invites verified — queue clear.</li>
              )}
            </ul>
          </Card>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
            <h3 className="text-sm font-semibold text-navy">All invitations</h3>
            <span className="text-xs text-muted">{rows.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-surface/60 text-[11px] uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Invite status</th>
                  <th className="px-5 py-3 font-semibold">Verification</th>
                  <th className="px-5 py-3 font-semibold">Sent</th>
                  <th className="px-5 py-3 font-semibold">Notes</th>
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
                      <Pill tone={inviteStatusTone[r.inviteStatus]}>{r.inviteStatus}</Pill>
                    </td>
                    <td className="px-5 py-3">
                      <Pill tone={verificationStatusTone[r.verificationStatus]}>
                        {r.verificationStatus}
                      </Pill>
                    </td>
                    <td className="px-5 py-3 text-muted">{r.sentAt}</td>
                    <td className="px-5 py-3 text-xs text-muted">{r.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <TrustNote />
    </PortalShell>
  );
}