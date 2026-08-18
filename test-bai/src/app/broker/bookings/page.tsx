"use client";

import { useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import { Button, Card, Field, Pill, TextInput } from "@/components/ui";
import { bookings, bookingSlots } from "@/lib/data";
import { portalNav } from "@/lib/portals";

export default function BrokerBookings() {
  const [publish, setPublish] = useState(false);
  const [added, setAdded] = useState(false);

  const upcoming = bookings.filter((b) => b.status !== "Completed");
  const available = bookingSlots.filter((s) => s.status === "available").length;

  return (
    <PortalShell
      role="broker"
      nav={portalNav.broker}
      title="Bookings"
      breadcrumb="Broker Portal / Bookings"
      mfa
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-navy">Consultation bookings</h2>
          <p className="mt-1 text-sm text-muted">
            Publish your availability and manage confirmed consultations (UC-5).
          </p>
        </div>
        <Button variant="primary" onClick={() => { setPublish((v) => !v); setAdded(false); }}>
          <I.Plus className="size-4" />
          Publish availability
        </Button>
      </div>

      {publish && (
        <Card className="mb-6 border-primary/30">
          <h3 className="text-sm font-semibold text-navy">Add a new slot</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="Date">
              <TextInput type="date" />
            </Field>
            <Field label="Start time">
              <TextInput type="time" defaultValue="09:00" />
            </Field>
            <Field label="Duration">
              <select
                className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
                defaultValue="30"
              >
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </Field>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
            <p className="text-xs text-muted">
              Published slots are immediately visible to your clients for booking.
            </p>
            <Button onClick={() => { setAdded(true); setPublish(false); }}>
              <I.Check className="size-4" />
              Publish slot
            </Button>
          </div>
        </Card>
      )}

      {added && (
        <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-positive/10 px-4 py-3 text-sm font-semibold text-positive">
          <I.Check className="size-4" />
          Slot published — clients can now book it.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy">Upcoming consultations</h3>
            <span className="text-xs text-muted">{upcoming.length} upcoming</span>
          </div>
          <div className="space-y-3">
            {upcoming.map((b) => (
              <Card key={b.id} className="p-4">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <I.Calendar className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-ink">{b.clientName}</div>
                    <div className="text-xs text-muted">{b.topic}</div>
                    <div className="mt-1 text-xs text-muted">{b.dateTime}</div>
                  </div>
                  <Pill
                    tone={
                      b.status === "Confirmed"
                        ? { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" }
                        : { text: "text-warn", bg: "bg-warn/10", dot: "bg-warn" }
                    }
                  >
                    {b.status}
                  </Pill>
                </div>
                <div className="mt-3 flex justify-end gap-2 border-t border-black/5 pt-3">
                  <Button variant="ghost">
                    <I.Mail className="size-4" />
                    Send reminder
                  </Button>
                  <Button variant="outline">
                    <I.Calendar className="size-4" />
                    Reschedule
                  </Button>
                </div>
              </Card>
            ))}
            {upcoming.length === 0 && (
              <Card className="p-10 text-center text-sm text-muted">No upcoming consultations.</Card>
            )}
          </div>
        </div>

        <div>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-positive/10 text-positive">
                <I.Check className="size-5" />
              </span>
              <div>
                <div className="text-2xl font-bold text-navy">{available}</div>
                <div className="text-sm text-muted">Available slots this week</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Publish more slots to keep your book open for client consultations. Reminders are sent
              automatically before each booked slot.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
              <I.ShieldCheck className="size-3.5 text-positive" />
              Calendar invites are issued through the transactional email provider.
            </div>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}