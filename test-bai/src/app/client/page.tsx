"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, IconButton, Modal, Pill, StatCard, TrustNote } from "@/components/ui";
import { applications, uploadedDocs, bookings } from "@/lib/data";
import { appStatusTone, currency, docStatusTone } from "@/lib/tone";
import { portalNav } from "@/lib/portals";
import type { LoanApplication, UploadedDoc } from "@/lib/types";

const acceptedTypes = ["PDF", "JPG", "PNG"];

function AppCard({
  app,
  onUpload,
}: {
  app: LoanApplication;
  onUpload: () => void;
}) {
  return (
    <Card className="gap-5 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
          <I.File className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-ink">{app.lender}</span>
            <span className="text-xs text-muted">· {app.id}</span>
          </div>
          <div className="mt-0.5 text-sm text-muted">
            {currency(app.amount)} · {app.purpose}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Pill tone={appStatusTone[app.status]}>{app.status}</Pill>
          <span className="hidden text-xs text-muted sm:block">Updated {app.updatedAt}</span>
        </div>
        <Link
          href={`/client/applications/${app.id}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,72,204,0.3)] transition-colors hover:bg-primary-dark"
        >
          View Details
        </Link>
      </div>

      {app.actionNeeded && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg bg-gold-soft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <I.Alert className="mt-0.5 size-4 shrink-0 text-[#6f5a08]" />
            <p className="text-sm font-medium text-[#4a3f08]">
              Action needed: Please upload your latest payslip
            </p>
          </div>
          <Button variant="navy" className="shrink-0" onClick={onUpload}>
            <I.Upload className="size-4" />
            Upload
          </Button>
        </div>
      )}
    </Card>
  );
}

export default function ClientDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const docs: UploadedDoc[] = uploadedDocs;

  const stats = useMemo(() => {
    const active = applications.filter((a) =>
      ["Submitted", "In Review", "Additional Info Requested", "Approved"].includes(a.status),
    ).length;
    const missing = applications.filter((a) => a.actionNeeded).length;
    const next = bookings.find((b) => b.status === "Confirmed");
    return { active, pendingDocs: missing, booking: next };
  }, []);

  return (
    <PortalShell
      role="client"
      nav={portalNav.client}
      title="My Applications"
      breadcrumb="Client Portal / Dashboard"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-navy">Welcome back, Maria</h2>
        <p className="mt-1 text-sm text-muted">
          Here is what is happening with your applications, as of {new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={<I.File className="size-5" />}
          value={String(stats.active)}
          label="Active Applications"
          note="In progress across all lenders"
        />
        <StatCard
          icon={<I.Upload className="size-5" />}
          value={String(stats.pendingDocs)}
          label="Pending Documents"
          note="Action needed to keep moving"
        />
        <StatCard
          icon={<I.Calendar className="size-5" />}
          value={stats.booking ? "Thu 20 Aug" : "None"}
          label="Upcoming Consultation"
          note={stats.booking ? stats.booking.topic : "No consultation scheduled"}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="text-base font-semibold text-navy">Your loan applications</h3>
        <span className="text-xs text-muted">{applications.length} total</span>
      </div>

      <div className="mt-3 space-y-4">
        {applications.map((app) => (
          <AppCard key={app.id} app={app} onUpload={() => setModalOpen(true)} />
        ))}
      </div>

      <TrustNote />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload document"
        wide
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragOver ? "border-primary bg-primary-soft" : "border-ink/20 bg-surface"
          }`}
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <I.Upload className="size-6" />
          </span>
          <p className="mt-3 text-sm font-semibold text-ink">
            {dragOver ? "Drop it here" : "Drag and drop files here"}
          </p>
          <p className="mt-1 text-xs text-muted">
            or click to browse · Maximum 10&nbsp;MB per file
          </p>
          <div className="mt-4 flex gap-2">
            {acceptedTypes.map((t) => (
              <span
                key={t}
                className="rounded-md border border-ink/10 bg-white px-2 py-0.5 text-[10px] font-semibold text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <Button variant="outline" className="mt-5">
            <I.Folder className="size-4" />
            Browse files
          </Button>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-navy">Previously uploaded</h4>
            <span className="text-xs text-muted">{docs.length} document{docs.length === 1 ? "" : "s"}</span>
          </div>
          <ul className="mt-3 space-y-2">
            {docs.map((d) => (
              <li
                key={d.id}
                className="flex items-center gap-3 rounded-lg border border-black/[0.06] bg-white px-3 py-2.5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {d.type}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{d.name}</div>
                  <div className="text-xs text-muted">{d.size}</div>
                </div>
                <Pill tone={docStatusTone[d.status]}>{d.status}</Pill>
                <IconButton label={`Download ${d.name}`}>
                  <I.Download className="size-4" />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </PortalShell>
  );
}