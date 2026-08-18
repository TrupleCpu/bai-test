"use client";

import { useMemo, useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Pill } from "@/components/ui";
import { applications, clients } from "@/lib/data";
import { appStatusTone, currency } from "@/lib/tone";
import { portalNav } from "@/lib/portals";

export default function BrokerClients() {
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return clients.filter((c) => !needle || c.name.toLowerCase().includes(needle) || c.email.toLowerCase().includes(needle));
  }, [q]);

  return (
    <PortalShell
      role="broker"
      nav={portalNav.broker}
      title="My Clients"
      breadcrumb="Broker Portal / My Clients"
      mfa
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-navy">My clients</h2>
          <p className="mt-1 text-sm text-muted">
            Assigned book — you only see clients assigned to you (object-level access control).
          </p>
        </div>
        <div className="relative">
          <I.Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search clients…"
            className="w-64 rounded-lg border border-ink/15 bg-white py-2 pl-9 pr-3 text-sm text-ink focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((c) => {
          const apps = applications.filter((a) => a.clientId === c.id);
          const active = apps.filter((a) => ["Submitted", "In Review", "Additional Info Requested", "Approved"].includes(a.status)).length;
          return (
            <Card key={c.id} className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                  {c.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink">{c.name}</div>
                  <div className="truncate text-xs text-muted">{c.email}</div>
                  <div className="mt-1 text-xs text-muted">{c.phone}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/5 pt-4 text-center">
                <div>
                  <div className="text-lg font-bold text-navy">{apps.length}</div>
                  <div className="text-[11px] uppercase tracking-wide text-muted">Applications</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-positive">{active}</div>
                  <div className="text-[11px] uppercase tracking-wide text-muted">Active</div>
                </div>
              </div>
              {apps.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {apps.slice(0, 2).map((a) => (
                    <li key={a.id} className="flex items-center justify-between gap-2 text-xs">
                      <span className="truncate text-muted">
                        {a.id} · {currency(a.amount)}
                      </span>
                      <Pill tone={appStatusTone[a.status]}>{a.status}</Pill>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">
                  <I.Mail className="size-4" />
                  Email
                </Button>
                <Button variant="ghost" className="flex-1">
                  <I.ChevronRight className="size-4" />
                  View file
                </Button>
              </div>
            </Card>
          );
        })}
        {rows.length === 0 && (
          <Card className="p-10 text-center text-sm text-muted md:col-span-2 xl:col-span-3">
            No clients match this search.
          </Card>
        )}
      </div>
    </PortalShell>
  );
}