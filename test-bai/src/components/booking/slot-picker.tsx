"use client";

import { useMemo, useState } from "react";
import { I } from "@/components/icons";
import { Button, Card } from "@/components/ui";
import { bookingSlots } from "@/lib/data";
import type { BookingSlot } from "@/lib/types";

export default function BookingSlotPicker({
  onConfirmed,
}: {
  onConfirmed?: (slot: BookingSlot, topic: string) => void;
}) {
  const dates = useMemo(() => {
    const list: string[] = [];
    bookingSlots.forEach((s) => {
      if (s.status !== "past" && !list.includes(s.date)) list.push(s.date);
    });
    return list;
  }, []);

  const [day, setDay] = useState(dates[0] ?? "");
  const [topic, setTopic] = useState("General consultation");
  const [picked, setPicked] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const daySlots = bookingSlots.filter((s) => s.date === day && s.status !== "past");
  const selected = bookingSlots.find((s) => s.id === picked);

  const confirm = () => {
    if (!selected) return;
    setConfirmed(true);
    onConfirmed?.(selected, topic);
  };

  if (confirmed && selected) {
    return (
      <Card className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-positive/10 text-positive">
          <I.Check className="size-7" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-navy">Consultation booked</h3>
        <p className="mt-2 text-sm text-muted">
          {topic} · {selected.date} at {selected.time} with {selected.broker}.
        </p>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
          <I.Calendar className="size-3.5" />
          Calendar invites and a reminder are sent to both you and your broker.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Date column */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-navy">Select a day</h3>
        {dates.map((d) => (
          <button
            key={d}
            onClick={() => {
              setDay(d);
              setPicked(null);
            }}
            className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors ${
              day === d
                ? "border-primary bg-primary text-white shadow"
                : "border-black/10 bg-white text-ink hover:border-primary/40"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Slots column */}
      <div>
        <h3 className="text-sm font-semibold text-navy">Available times · {day}</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {daySlots.map((s) => {
            const busy = s.status === "booked";
            const isPicked = picked === s.id;
            return (
              <button
                key={s.id}
                disabled={busy}
                onClick={() => setPicked(s.id)}
                className={`relative rounded-lg border px-3 py-3 text-sm font-semibold transition-colors ${
                  isPicked
                    ? "border-primary bg-primary text-white shadow"
                    : busy
                      ? "cursor-not-allowed border-black/5 bg-surface text-muted line-through"
                      : "border-black/10 bg-white text-ink hover:border-primary/40"
                }`}
              >
                {s.time}
                {busy && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-normal no-underline">
                    booked
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {daySlots.length === 0 && (
          <p className="mt-3 text-sm text-muted">No availability on this day.</p>
        )}

        <div className="mt-6 grid gap-4 rounded-xl border border-black/[0.06] bg-white p-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Consultation topic</span>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {[
                "General consultation",
                "Home loan / refinance",
                "Investment lending",
                "Personal loan",
                "Application status update",
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted">
              {selected ? (
                <>
                  {selected.date} at {selected.time} with {selected.broker}
                </>
              ) : (
                "Select a time to continue."
              )}
            </p>
            <Button variant="primary" disabled={!selected} onClick={confirm}>
              <I.Check className="size-4" />
              Confirm booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}