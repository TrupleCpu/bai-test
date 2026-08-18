"use client";

import { useMemo, useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Field, Pill, Select, TextArea, TextInput } from "@/components/ui";
import { applications, clients, communications } from "@/lib/data";
import { portalNav } from "@/lib/portals";

const ALL = "all";

export default function BrokerCommunication() {
  const [app, setApp] = useState<string>(ALL);
  const [compose, setCompose] = useState(false);
  const [sent, setSent] = useState(false);

  const appOptions = useMemo(() => applications.map((a) => a.id), []);
  const rows = useMemo(() => {
    const list = [...communications].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    if (app === ALL) return list;
    return list.filter((c) => c.subject.includes(app));
  }, [app]);

  return (
    <PortalShell
      role="broker"
      nav={portalNav.broker}
      title="Communication"
      breadcrumb="Broker Portal / Communication"
      mfa
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-navy">Client communication</h2>
          <p className="mt-1 text-sm text-muted">
            Every email you send is logged against the application — both sides keep a copy (UC-4).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={app} onChange={(e) => setApp(e.target.value)} className="w-44">
            <option value={ALL}>All applications</option>
            {appOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
          <Button variant="primary" onClick={() => { setCompose((v) => !v); setSent(false); }}>
            <I.Mail className="size-4" />
            Compose Email
          </Button>
        </div>
      </div>

      {compose && (
        <Card className="mb-6 border-primary/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy">New email</h3>
            <button aria-label="Close composer" onClick={() => setCompose(false)} className="rounded-lg p-1 text-muted hover:bg-ink/5">
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
              <TextInput placeholder="e.g. Valuation booked for APP-2041" defaultValue="Valuation booked for APP-2041" />
            </Field>
            <Field label="Message">
              <TextArea placeholder="Write your message…" />
            </Field>
            <div className="flex flex-col gap-3 border-t border-black/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-1.5 text-xs text-muted">
                <I.Lock className="mt-0.5 size-3.5 shrink-0" />
                Logged to the application&apos;s communication record automatically.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCompose(false)}>Discard</Button>
                <Button onClick={() => { setSent(true); setCompose(false); }}>
                  <I.Send className="size-4" />
                  Send email
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {sent && (
        <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-positive/10 px-4 py-3 text-sm font-semibold text-positive">
          <I.Check className="size-4" />
          Sent — logged to the application&apos;s communication record.
        </div>
      )}

      <div className="space-y-3">
        {rows.map((c) => {
          const inbound = c.direction === "inbound";
          return (
            <Card key={c.id} className="p-4">
              <div className="flex items-start gap-3.5">
                <span className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full ${inbound ? "bg-navy/5 text-navy" : "bg-primary/10 text-primary"}`}>
                  {inbound ? <I.User className="size-4" /> : <I.Mail className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-semibold text-ink">{c.subject}</span>
                    <Pill tone={c.read ? { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" } : { text: "text-warn", bg: "bg-warn/10", dot: "bg-warn" }}>
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
    </PortalShell>
  );
}