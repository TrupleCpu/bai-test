"use client";

import { useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, ClientSelect, Field, Select, TextArea, TextInput } from "@/components/ui";
import { clients, lenders } from "@/lib/data";
import { portalNav } from "@/lib/portals";

const purposes = [
  "Home purchase",
  "Home refinance",
  "Investment property",
  "Debt consolidation",
  "Car purchase",
  "Personal loan",
];

export default function NewApplication() {
  const [client, setClient] = useState("");
  const [draft, setDraft] = useState(false);

  return (
    <PortalShell
      role="broker"
      nav={portalNav.broker}
      title={draft ? "Application saved as draft" : "New application"}
      breadcrumb="Broker Portal / Applications"
    >
      {draft && (
        <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-positive/10 px-4 py-3 text-sm font-semibold text-positive">
          <I.Check className="size-4" />
          Draft saved. It is visible in your Applications list and can be submitted later.
        </div>
      )}

      <div className="mb-5 flex items-start gap-3 rounded-lg border border-gold/50 bg-gold-soft px-4 py-3">
        <I.Alert className="mt-0.5 size-4 shrink-0 text-[#6f5a08]" />
        <p className="text-sm text-[#4a3f08]">
          <span className="font-semibold">Client access is invite-only.</span> Clients cannot
          self-submit — this form is only accessible to Broker and Compliance roles, and submissions are
          logged to the audit trail.
        </p>
      </div>

      <Card pad="p-6" className="max-w-3xl">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Client" hint="Search by name or email — submitted on the client's behalf">
              <ClientSelect
                options={clients}
                value={client}
                onChange={setClient}
                placeholder="Search for a client…"
              />
            </Field>
          </div>
          <Field label="Loan amount (AUD)">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
              <TextInput inputMode="numeric" placeholder="350,000" className="pl-7" />
            </div>
          </Field>
          <Field label="Lender / Bank">
            <Select defaultValue="ANZ">
              {lenders.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Purpose">
            <Select defaultValue="Home refinance">
              {purposes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Loan term (months)">
            <Select defaultValue="360">
              {[
                ["36", "3 years"],
                ["48", "4 years"],
                ["60", "5 years"],
                ["120", "10 years"],
                ["240", "20 years"],
                ["300", "25 years"],
                ["360", "30 years"],
              ].map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notes" hint="Visible to brokers and compliance only — never shown to the client">
              <TextArea placeholder="Income, employment history, special conditions…" />
            </Field>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-black/5 pt-5 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setDraft(true)}>
            Save as Draft
          </Button>
          <Button variant="primary" onClick={() => setDraft(true)}>
            <I.Send className="size-4" />
            Submit Application
          </Button>
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <I.Lock className="size-3.5" />
          Submission is stored against the client and made visible to compliance immediately.
        </p>
      </Card>
    </PortalShell>
  );
}