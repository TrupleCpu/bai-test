"use client";

import { useMemo, useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Card, Pill, TrustNote } from "@/components/ui";
import { communications } from "@/lib/data";
import { portalNav } from "@/lib/portals";

const ALL = "all";

export default function ClientCommunication() {
  const [filter, setFilter] = useState<string>(ALL);

  const apps = useMemo(() => {
    const set = new Set(communications.map((c) => c.subject.match(/APP-\d+/)?.[0]).filter(Boolean));
    return Array.from(set);
  }, []);

  const rows = useMemo(() => {
    const list = [...communications].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    if (filter === ALL) return list;
    return list.filter((c) => c.subject.includes(filter));
  }, [filter]);

  return (
    <PortalShell
      role="client"
      nav={portalNav.client}
      title="Communication"
      breadcrumb="Client Portal / Communication"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-navy">Messages from your broker</h2>
          <p className="mt-1 text-sm text-muted">
            A read-only record of everything your broker has sent you — you keep a copy of every
            exchange.
          </p>
        </div>
        <select
          aria-label="Filter by application"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        >
          <option value={ALL}>All applications</option>
          {apps.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
          <I.Lock className="size-3.5" />
          Read-only
        </span>
        <span className="text-xs text-muted">You cannot edit your application from this view.</span>
      </div>

      <div className="space-y-3">
        {rows.map((c) => {
          const inbound = c.direction === "inbound";
          return (
            <Card key={c.id} className="p-4">
              <div className="flex items-start gap-3.5">
                <span
                  className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full ${
                    inbound ? "bg-navy/5 text-navy" : "bg-primary/10 text-primary"
                  }`}
                >
                  {inbound ? <I.User className="size-4" /> : <I.Mail className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-semibold text-ink">{c.subject}</span>
                    <Pill
                      tone={
                        c.read
                          ? { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" }
                          : { text: "text-warn", bg: "bg-warn/10", dot: "bg-warn" }
                      }
                    >
                      {c.read ? "Receipt confirmed" : "Unread"}
                    </Pill>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {c.from} → {c.to} · {c.timestamp}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{c.preview}</p>
                </div>
              </div>
            </Card>
          );
        })}
        {rows.length === 0 && (
          <Card className="p-10 text-center text-sm text-muted">No messages for this filter.</Card>
        )}
      </div>
      <TrustNote />
    </PortalShell>
  );
}