import type { ApplicationStatus, DocStatus, InviteStatus, VerificationStatus } from "./types";

export interface Tone {
  text: string;
  bg: string;
  dot: string;
  border?: string;
}

export const appStatusTone: Record<ApplicationStatus, Tone> = {
  Submitted: { text: "text-primary", bg: "bg-primary/10", dot: "bg-primary" },
  "In Review": {
    text: "text-[#6f5a08]",
    bg: "bg-gold/20",
    dot: "bg-gold",
  },
  "Additional Info Requested": {
    text: "text-warn",
    bg: "bg-warn/10",
    dot: "bg-warn",
  },
  Approved: { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" },
  Declined: { text: "text-muted", bg: "bg-surface", dot: "bg-muted" },
  Settled: { text: "text-white", bg: "bg-navy", dot: "bg-white/70" },
};

export const inviteStatusTone: Record<InviteStatus, Tone> = {
  Sent: { text: "text-primary", bg: "bg-primary/10", dot: "bg-primary" },
  Activated: { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" },
  Expired: { text: "text-muted", bg: "bg-surface", dot: "bg-muted" },
};

export const verificationStatusTone: Record<VerificationStatus, Tone> = {
  Pending: { text: "text-warn", bg: "bg-warn/10", dot: "bg-warn" },
  Verified: { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" },
  Flagged: { text: "text-danger", bg: "bg-danger/10", dot: "bg-danger" },
};

export const docStatusTone: Record<DocStatus, Tone> = {
  Uploaded: { text: "text-primary", bg: "bg-primary/10", dot: "bg-primary" },
  "In Review": { text: "text-warn", bg: "bg-warn/10", dot: "bg-warn" },
  Reviewed: { text: "text-positive", bg: "bg-positive/10", dot: "bg-positive" },
};

export const currency = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);