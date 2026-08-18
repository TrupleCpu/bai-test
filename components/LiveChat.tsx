"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

export default function LiveChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 w-80 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-navy-700 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white">
                <Icon name="chat" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">BAI Finance</p>
                <p className="text-xs text-navy-100">Online · loan &amp; application questions</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-navy-100 transition-colors duration-200 hover:bg-white/15 hover:text-white"
            >
              <Icon name="x-mark" className="size-5" />
            </button>
          </div>
          <div className="px-4 py-4">
            <div className="rounded-xl rounded-tl-sm bg-cream px-3.5 py-2.5 text-sm text-ink/80">
              Hi there! Ask us about home loans, refinancing, or your
              application status. A member of our team will reply shortly.
            </div>
            <div className="mt-2 text-center text-[11px] text-ink/50">
              This is a demo widget — no messages are sent.
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-navy-100 px-3 py-2.5">
            <span className="flex-1 rounded-full bg-cream px-4 py-2 text-sm text-ink/50">
              Type a message…
            </span>
            <button
              type="button"
              aria-label="Send message"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-navy-700 text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
            >
              <Icon name="paper-airplane" className="size-4" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close live chat" : "Open live chat"}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
      >
        <Icon name="chat" className="size-5" />
        {open ? "Close chat" : "Live chat"}
      </button>
    </div>
  );
}
