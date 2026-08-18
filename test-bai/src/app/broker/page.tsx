"use client";

import { useMemo, useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Field, Pill, Select, StatCard, TextArea, TextInput } from "@/components/ui";
import { applications, bookings, clients, lenders } from "@/lib/data";
import { appStatusTone, currency } from "@/lib/tone";
import { portalNav } from "@/lib/portals";
import type { ApplicationStatus } from "@/lib/types";

const ALL = "all";
const statuses: ApplicationStatus[] = ["Submitted", "In Review", "Additional Info Requested", "Approved", "Declined", "Settled"];

const statusColor: Record<ApplicationStatus, string> = {
  Submitted: "#0048cc",
  "In Review": "#e4ba37",
  "Additional Info Requested": "#e8710a",
  Approved: "#1e8e3e",
  Declined: "#999999",
  Settled: "#0a2881",
};

const sortDate = (a: string, b: string) =>
  new Date(b).getTime() - new Date(a).getTime();

export default function BrokerDashboard() {
  const [status, setStatus] = useState<string>(ALL);
  const [lender, setLender] = useState<string>(ALL);
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [sort, setSort] = useState<"date" | "amount" | "client">("date");
  const [composeOpen, setComposeOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const filtered = useMemo(() => {
    let list = [...applications].sort((a, b) => sortDate(a.updatedAt, b.updatedAt));
    if (status !== ALL) list = list.filter((a) => a.status === status);
    if (lender !== ALL) list = list.filter((a) => a.lender === lender);
    if (from) list = list.filter((a) => new Date(a.updatedAt) >= new Date(from));
    if (until) list = list.filter((a) => new Date(a.updatedAt) <= new Date(until));
    if (sort === "amount") list.sort((a, b) => b.amount - a.amount);
    if (sort === "client") list.sort((a, b) => a.clientName.localeCompare(b.clientName));
    return list;
  }, [status, lender, from, until, sort]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { Submitted: 0, "In Review": 0, "Additional Info Requested": 0, Approved: 0, Declined: 0, Settled: 0 };
    applications.forEach((a) => (c[a.status] += 1));
    return c;
  }, []);

  const total = applications.length;
  const assignedClients = useMemo(
    () => new Set(applications.filter((a) => a.broker === "Jamie Ramirez").map((a) => a.clientId)).size,
    [],
  );
  const upcomingBookings = bookings.filter((b) => b.status !== "Completed").length;

  return (
    <PortalShell
      role="broker"
      nav={portalNav.broker}
      title="Dashboard"
      breadcrumb="Broker Portal"
      mfa
      notifications={5}
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-navy">Good morning, Jamie</h2>
          <p className="mt-1 text-sm text-muted">Your client pipeline at a glance.</p>
        </div>
        <Button variant="primary" onClick={() => setComposeOpen((v) => !v)}>
          <I.Mail className="size-4" />
          Compose Email
        </Button>
      </div>

      {composeOpen && (
        <Card className="mb-6 border-primary/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy">New email</h3>
            <button
              aria-label="Close composer"
              onClick={() => setComposeOpen(false)}
              className="rounded-lg p-1 text-muted hover:bg-ink/5"
            >
              <I.Close className="size-4" />
            </button>
          </div>
          <div className="mt-4 grid gap-4">
            <Field label="Recipient (client)">
              <Select defaultValue="cl-001">
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} · {c.email}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Subject">
              <TextInput placeholder="e.g. Payslip requested for APP-2038" defaultValue="Payslip requested for APP-2038" />
            </Field>
            <Field label="Message">
              <TextArea placeholder="Write your message…" />
            </Field>
            <div className="flex flex-col gap-3 border-t border-black/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-1.5 text-xs text-muted">
                <I.Lock className="mt-0.5 size-3.5 shrink-0" />
                This email will be logged to the application&apos;s Communication tab automatically.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setComposeOpen(false)}>
                  Discard
                </Button>
                <Button onClick={() => setSent(true)}>
                  <I.Send className="size-4" />
                  Send email
                </Button>
              </div>
            </div>
            {sent && (
              <p className="flex items-center gap-2 rounded-lg bg-positive/10 px-3 py-2 text-xs font-semibold text-positive">
                <I.Check className="size-4" />
                Sent — logged to application CM-2026-08.
              </p>
            )}
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<I.Users className="size-5" />}
          value={String(assignedClients)}
          label="Assigned Clients"
          note="With active applications"
        />
        <StatCard
          icon={<I.Calendar className="size-5" />}
          value={String(upcomingBookings)}
          label="Upcoming Bookings"
          note="Confirmed & pending"
        />
        <Card className="p-5">
          <div className="text-sm font-medium text-ink">Applications by status</div>
          <div className="mt-3 space-y-2">
            {statuses.map((s) => {
              const pct = ((counts[s] / total) * 100).toFixed(0);
              return (
                <div key={s} className="flex items-center gap-2 text-xs">
                  <span className="w-32 truncate text-muted">{s}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: statusColor[s] }}
                    />
                  </div>
                  <span className="w-6 text-right font-semibold text-ink">{counts[s]}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-0 overflow-hidden">
        <div className="border-b border-black/5 bg-white px-5 py-4">
          <h3 className="text-sm font-semibold text-navy">Applications</h3>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <Field label="Status">
              <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-48">
                <option value={ALL}>All statuses</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Lender">
              <Select value={lender} onChange={(e) => setLender(e.target.value)} className="w-40">
                <option value={ALL}>All lenders</option>
                {lenders.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="From">
              <TextInput type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-40" />
            </Field>
            <Field label="To">
              <TextInput type="date" value={until} onChange={(e) => setUntil(e.target.value)} className="w-40" />
            </Field>
            <Field label="Sort by">
              <Select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="w-40">
                <option value="date">Last updated</option>
                <option value="amount">Loan amount</option>
                <option value="client">Client name</option>
              </Select>
            </Field>
            <span className="ml-auto pb-2 text-xs text-muted">{filtered.length} shown</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-surface/60 text-[11px] uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Lender</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Last updated</th>
                <th className="px-5 py-3 font-semibold">Assigned broker</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-black/5 last:border-0 hover:bg-primary-soft/40">
                  <td className="px-5 py-3">
                    <div className="font-semibold text-ink">{a.clientName}</div>
                    <div className="text-xs text-muted">{a.id}</div>
                  </td>
                  <td className="px-5 py-3 text-ink">{a.lender}</td>
                  <td className="px-5 py-3 font-medium text-navy">{currency(a.amount)}</td>
                  <td className="px-5 py-3">
                    <Pill tone={appStatusTone[a.status]}>{a.status}</Pill>
                  </td>
                  <td className="px-5 py-3 text-muted">{a.updatedAt}</td>
                  <td className="px-5 py-3 text-ink">{a.broker}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted">
                    No applications match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PortalShell>
  );
}