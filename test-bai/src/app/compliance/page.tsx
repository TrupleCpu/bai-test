"use client";

import { useMemo, useRef, useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Field, IconButton, Pill, TextArea, TextInput, TrustNote } from "@/components/ui";
import { invitations as seedInvitations } from "@/lib/data";
import { inviteStatusTone, verificationStatusTone } from "@/lib/tone";
import { portalNav } from "@/lib/portals";
import type { Invitation, InviteStatus, VerificationStatus } from "@/lib/types";

const ALL = "all";

export default function ComplianceOverview() {
  const inviteSeq = useRef(1099);
  const [invites, setInvites] = useState<Invitation[]>(seedInvitations);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [inviteFilter, setInviteFilter] = useState<InviteStatus | typeof ALL>(ALL);
  const [verifyFilter, setVerifyFilter] = useState<VerificationStatus | typeof ALL>(ALL);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  const filtered = useMemo(() => {
    let list = invites;
    if (inviteFilter !== ALL) list = list.filter((i) => i.inviteStatus === inviteFilter);
    if (verifyFilter !== ALL) list = list.filter((i) => i.verificationStatus === verifyFilter);
    return list;
  }, [invites, inviteFilter, verifyFilter]);

  const sendInvite = () => {
    if (!form.name || !form.email) return;
    inviteSeq.current += 1;
    const next: Invitation = {
      id: `inv-${inviteSeq.current}`,
      name: form.name,
      email: form.email,
      phone: form.phone || "—",
      inviteStatus: "Sent",
      verificationStatus: "Pending",
      sentAt: new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" }),
      notes: form.notes || "Newly invited",
    };
    setInvites((v) => [next, ...v]);
    setForm({ name: "", email: "", phone: "", notes: "" });
    markSeen(next.id);
  };

  const resend = (id: string) => {
    markSeen(id);
    setInvites((v) => v.map((i) => (i.id === id ? { ...i, inviteStatus: "Sent" } : i)));
  };

  const revoke = (id: string) => {
    markSeen(id);
    setInvites((v) => v.map((i) => (i.id === id ? { ...i, inviteStatus: "Expired" } : i)));
  };

  const markSeen = (id: string) => setSeen((s) => new Set(s).add(id));

  return (
    <PortalShell
      role="compliance"
      nav={portalNav.compliance}
      title="Overview"
      breadcrumb="Compliance Portal / Overview"
      notifications={3}
      mfa
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,360px)_1fr]">
        {/* Left: invite form */}
        <div>
          <Card pad="p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <I.Mail className="size-4" />
              </span>
              <h3 className="text-sm font-semibold text-navy">Invite New Client</h3>
            </div>
            <div className="mt-5 space-y-4">
              <Field label="Full name">
                <TextInput
                  placeholder="e.g. Nova Aguilar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Email address">
                <TextInput
                  type="email"
                  placeholder="nova.aguilar@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <Field label="Phone">
                <TextInput
                  placeholder="+61 400 000 000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </Field>
              <Field label="Notes">
                <TextArea
                  placeholder="Referral source, context…"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </Field>
              <Button className="w-full" onClick={sendInvite}>
                <I.Send className="size-4" />
                Send Invite
              </Button>
              <p className="flex items-start gap-1.5 text-xs text-muted">
                <I.Lock className="mt-0.5 size-3.5 shrink-0" />
                Invites are single-use and expire after 30 days. Issuance is written to the audit log.
              </p>
            </div>
          </Card>
        </div>

        {/* Right: invitations table */}
        <div>
          <Card className="p-0 overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 border-b border-black/5 px-5 py-4">
              <h3 className="text-sm font-semibold text-navy">Pending &amp; recent invitations</h3>
              <div className="ml-auto flex flex-wrap gap-2">
                <select
                  aria-label="Filter by invite status"
                  value={inviteFilter}
                  onChange={(e) => setInviteFilter(e.target.value as InviteStatus | typeof ALL)}
                  className="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm text-ink focus:border-primary focus:outline-none"
                >
                  <option value={ALL}>Invite: all</option>
                  <option value="Sent">Sent</option>
                  <option value="Activated">Activated</option>
                  <option value="Expired">Expired</option>
                </select>
                <select
                  aria-label="Filter by verification status"
                  value={verifyFilter}
                  onChange={(e) => setVerifyFilter(e.target.value as VerificationStatus | typeof ALL)}
                  className="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm text-ink focus:border-primary focus:outline-none"
                >
                  <option value={ALL}>Verification: all</option>
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                  <option value="Flagged">Flagged</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-black/5 bg-surface/60 text-[11px] uppercase tracking-wide text-muted">
                    <th className="px-5 py-3 font-semibold">Client</th>
                    <th className="px-5 py-3 font-semibold">Invite status</th>
                    <th className="px-5 py-3 font-semibold">Verification</th>
                    <th className="px-5 py-3 font-semibold">Sent</th>
                    <th className="px-5 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inv) => (
                    <tr key={inv.id} className="border-b border-black/5 last:border-0 hover:bg-primary-soft/40">
                      <td className="px-5 py-3">
                        <div className="font-semibold text-ink">{inv.name}</div>
                        <div className="text-xs text-muted">{inv.email}</div>
                      </td>
                      <td className="px-5 py-3">
                        <Pill tone={inviteStatusTone[inv.inviteStatus]}>{inv.inviteStatus}</Pill>
                      </td>
                      <td className="px-5 py-3">
                        <Pill tone={verificationStatusTone[inv.verificationStatus]}>
                          {inv.verificationStatus}
                        </Pill>
                      </td>
                      <td className="px-5 py-3 text-muted">{inv.sentAt}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <IconButton label={`Resend invite to ${inv.name}`} onClick={() => resend(inv.id)}>
                            <I.Refresh className="size-4" />
                          </IconButton>
                          <button
                            onClick={() => revoke(inv.id)}
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-danger transition-colors hover:bg-danger/10"
                          >
                            Revoke
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted">
                        No invitations match these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {seen.size > 0 && (
              <div className="flex items-center gap-2 border-t border-black/5 px-5 py-3 text-xs text-muted">
                <I.Lock className="size-3.5 text-positive" />
                {seen.size} action{seen.size === 1 ? "" : "s"} logged to the audit trail this session.
              </div>
            )}
          </Card>
        </div>
      </div>
      <TrustNote />
    </PortalShell>
  );
}