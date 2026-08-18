"use client";

import { useState } from "react";
import PortalShell from "@/components/layout/portal-shell";
import { I } from "@/components/icons";
import BookingSlotPicker from "@/components/booking/slot-picker";
import { portalNav } from "@/lib/portals";
import type { BookingSlot } from "@/lib/types";

export default function ClientBook() {
  const [done, setDone] = useState<{ lane: string; date: string; time: string; topic: string } | null>(null);

  return (
    <PortalShell
      role="client"
      nav={portalNav.client}
      title="Book a consultation"
      breadcrumb="Client Portal / Book Consultation"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-navy">Book a consultation</h2>
        <p className="mt-1 text-sm text-muted">
          Choose a slot with your broker — calendar invites and reminders are sent to both of you
          (UC-5).
        </p>
      </div>

      {done && (
        <div className="mb-6 flex items-center gap-2.5 rounded-lg bg-positive/10 px-4 py-3 text-sm font-semibold text-positive">
          <I.Check className="size-4" />
          Booked {done.topic} · {done.date} at {done.time} with {done.lane}. Invites sent.
        </div>
      )}

      <BookingSlotPicker
        onConfirmed={(s: BookingSlot, topic: string) => {
          setDone({ lane: s.broker, date: s.date, time: s.time, topic });
        }}
      />
    </PortalShell>
  );
}