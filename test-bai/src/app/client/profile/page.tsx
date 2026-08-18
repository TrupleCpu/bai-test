"use client";

import { useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Field, Pill, TextInput } from "@/components/ui";
import { portalNav } from "@/lib/portals";

export default function ClientProfile() {
  const [mfa, setMfa] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <PortalShell
      role="client"
      nav={portalNav.client}
      title="Profile & security"
      breadcrumb="Client Portal / Profile"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-navy">Profile &amp; security</h2>
        <p className="mt-1 text-sm text-muted">
          Manage your contact details and multi-factor authentication preferences (§8.2).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card pad="p-6">
          <h3 className="text-sm font-semibold text-navy">Personal details</h3>
          <div className="mt-5 grid gap-4">
            <Field label="Full name">
              <TextInput defaultValue="Maria Dela Cruz" />
            </Field>
            <Field label="Email address">
              <TextInput defaultValue="maria.delacruz@email.com" />
            </Field>
            <Field label="Phone">
              <TextInput defaultValue="+61 400 111 234" />
            </Field>
            <div className="flex items-center justify-between border-t border-black/5 pt-4">
              <span className="text-sm text-muted">Changes are reflected in the portal immediately.</span>
              <Button
                onClick={() => {
                  setSaved(true);
                  window.setTimeout(() => setSaved(false), 3000);
                }}
              >
                Save changes
              </Button>
            </div>
            {saved && (
              <p className="flex items-center gap-2 rounded-lg bg-positive/10 px-3 py-2 text-xs font-semibold text-positive">
                <I.Check className="size-4" />
                Details updated — change logged to the audit trail.
              </p>
            )}
          </div>
        </Card>

        <Card pad="p-6">
          <h3 className="text-sm font-semibold text-navy">Multi-factor authentication</h3>
          <p className="mt-1.5 text-sm text-muted">
            Strongly recommended for clients — it protects your application and document data.
          </p>
          <div className="mt-5 flex items-center justify-between rounded-lg border border-black/[0.06] bg-surface/60 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-positive/10 text-positive">
                <I.ShieldCheck className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-navy">Authenticator app</div>
                <div className="text-xs text-muted">{mfa ? "Enabled — codes required at sign-in" : "Not enabled"}</div>
              </div>
            </div>
            <button
              role="switch"
              aria-checked={mfa}
              onClick={() => setMfa((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition-colors ${mfa ? "bg-positive" : "bg-ink/20"}`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${mfa ? "left-[22px]" : "left-0.5"}`}
              />
            </button>
          </div>
          <div className="mt-4 flex items-start gap-2 text-xs text-muted">
            <I.Lock className="mt-0.5 size-3.5 shrink-0 text-positive" />
            Turning MFA off is discouraged. Sessions on new devices will still require email
            verification.
          </div>
          <div className="mt-5 border-t border-black/5 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">Sessions</h4>
            <ul className="mt-3 space-y-2">
              {[
                ["Chrome · Windows", "Sydney, AU · Active now"],
                ["Safari · iPhone", "Manila, PH · 2 days ago"],
              ].map(([d, meta]) => (
                <li key={d} className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-surface/40 px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <I.User className="size-4 text-muted" />
                    {d}
                  </span>
                  <Pill tone={d.includes("Active") ? { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" } : { text: "text-muted", bg: "bg-surface", dot: "bg-muted" }}>
                    {d.includes("Active") ? "Active" : "Inactive"}
                  </Pill>
                  <span className="text-xs text-muted">{meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </PortalShell>
  );
}