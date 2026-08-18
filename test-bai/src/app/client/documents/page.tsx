"use client";

import { useState } from "react";
import Link from "next/link";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Pill, TrustNote } from "@/components/ui";
import { uploadedDocs, applications } from "@/lib/data";
import { docStatusTone } from "@/lib/tone";
import { portalNav } from "@/lib/portals";

export default function ClientDocuments() {
  const [over, setOver] = useState(false);
  const requestedApps = applications.filter((a) => a.actionNeeded);

  return (
    <PortalShell
      role="client"
      nav={portalNav.client}
      title="Documents"
      breadcrumb="Client Portal / My Documents"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-navy">Your documents</h2>
        <p className="mt-1 text-sm text-muted">
          Upload only when requested — your broker will ask for specific files as your application
          progresses.
        </p>
      </div>

      {requestedApps.length > 0 && (
        <Card className="mb-6 border-gold/40 bg-gold-soft/60">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-[#6f5a08]">
                <I.Alert className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">Documents currently requested</p>
                <p className="mt-0.5 text-xs text-muted">
                  {requestedApps.map((a) => `"${a.actionNeeded}" for ${a.id}`).join(" · ")}
                </p>
              </div>
            </div>
            <Button variant="navy" onClick={() => document.getElementById("doc-upload")?.scrollIntoView({ behavior: "smooth" })}>
              <I.Upload className="size-4" />
              Upload now
            </Button>
          </div>
        </Card>
      )}

      <Card id="doc-upload" pad="p-6" className="mb-6">
        <h3 className="text-sm font-semibold text-navy">Upload a document</h3>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
          }}
          className={`mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            over ? "border-primary bg-primary-soft" : "border-ink/20 bg-surface"
          }`}
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <I.Upload className="size-6" />
          </span>
          <p className="mt-3 text-sm font-semibold text-ink">{over ? "Drop it here" : "Drag and drop files here"}</p>
          <p className="mt-1 text-xs text-muted">or click to browse · PDF, JPG or PNG · Max 10 MB per file</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted">
            <I.Lock className="size-3.5 text-positive" />
            Files are stored encrypted and scanned before staff access.
          </p>
          <Button variant="outline" className="mt-5">
            <I.Folder className="size-4" />
            Browse files
          </Button>
        </div>
      </Card>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-navy">
          Previously uploaded <span className="font-normal text-muted">· {uploadedDocs.length}</span>
        </h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {uploadedDocs.map((d) => (
          <Card key={d.id} className="flex items-center gap-3 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              {d.type}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink">{d.name}</div>
              <div className="text-xs text-muted">{d.size}</div>
            </div>
            <Pill tone={docStatusTone[d.status]}>{d.status}</Pill>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
              <I.ShieldCheck className="size-4" />
            </span>
            <div className="text-sm text-muted">
              <span className="font-semibold text-navy">Read-only for you.</span> You can view every
              access to your documents in the{" "}
              <Link href="/compliance/audit-log" className="text-primary hover:underline">audit trail</Link> —
              your broker and compliance team can&apos;t open a file without it being logged.
            </div>
          </div>
        </Card>
      </div>
      <TrustNote />
    </PortalShell>
  );
}