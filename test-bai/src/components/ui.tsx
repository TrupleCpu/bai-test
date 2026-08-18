import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { I } from "@/components/icons";
import type { Tone } from "@/lib/tone";

/* ---------- Card ---------- */
export function Card({ children, className = "", pad = "p-5", id }: { children: ReactNode; className?: string; pad?: string; id?: string }) {
  return (
    <div id={id} className={`rounded-xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(10,40,129,0.06)] ${pad} ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Pill badge ---------- */
export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${tone.bg} ${tone.text} ${tone.border ?? "border-transparent"}`}
    >
      <span className={`size-1.5 rounded-full ${tone.dot}`} />
      {children}
    </span>
  );
}

/* ---------- Status badge alias ---------- */
export const StatusBadge = Pill;

/* ---------- Buttons ---------- */
type BtnVariant = "primary" | "navy" | "outline" | "ghost" | "positive" | "danger" | "goldOutline";

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const btnVariants: Record<BtnVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark shadow-[0_1px_2px_rgba(0,72,204,0.3)]",
  navy: "bg-navy text-white hover:bg-navy-deep",
  outline: "border border-navy/25 bg-white text-navy hover:bg-primary-soft",
  ghost: "text-navy hover:bg-primary-soft",
  positive: "bg-positive text-white hover:brightness-95",
  danger: "bg-danger/10 text-danger hover:bg-danger hover:text-white",
  goldOutline: "border border-gold/60 bg-gold/5 text-[#6f5a08] hover:bg-gold/20",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return <button className={`${btnBase} ${btnVariants[variant]} ${className}`} {...props} />;
}

export function IconButton({
  label,
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex size-9 items-center justify-center rounded-lg text-navy transition-colors hover:bg-primary-soft ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------- Stat card ---------- */
export function StatCard({
  icon,
  value,
  label,
  note,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <Card className="flex items-start gap-4 p-5">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-bold tracking-tight text-navy">{value}</div>
        <div className="mt-0.5 text-sm font-medium text-ink">{label}</div>
        {note && <div className="mt-1 text-xs text-muted">{note}</div>}
      </div>
    </Card>
  );
}

/* ---------- Avatar ---------- */
export function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  const s = size === "sm" ? "size-8 text-xs" : "size-9 text-sm";
  return (
    <span className={`inline-flex ${s} items-center justify-center rounded-full bg-gold font-bold text-navy`}>
      {initials}
    </span>
  );
}

/* ---------- Secure portal label ---------- */
export function SecureLabel() {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-positive/25 bg-positive/5 px-3 py-1 text-[11px] font-semibold text-positive">
      <I.Lock className="size-3.5" />
      Secure Portal
    </span>
  );
}

/* ---------- Trust footer note ---------- */
export function TrustNote() {
  return (
    <p className="mt-6 text-center text-xs text-muted">
      <span className="inline-flex items-center gap-1.5">
        <I.Lock className="size-3.5" />
        All documents are encrypted and access is logged.
      </span>
    </p>
  );
}

/* ---------- Modal ---------- */
export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-deep/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={`relative w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[86vh] overflow-auto rounded-xl bg-white shadow-2xl`}
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-white px-5 py-4">
          <h3 className="text-base font-semibold text-navy">{title}</h3>
          <IconButton label="Close" onClick={onClose}>
            <I.Close />
          </IconButton>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Form field bits ---------- */
export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition";

export function TextInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${inputCls} ${className}`} {...props} />;
}

export function TextArea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${inputCls} min-h-28 resize-y ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${inputCls} appearance-none ${className}`} {...props}>
      {children}
    </select>
  );
}

/* ---------- Searchable client dropdown ---------- */
export function ClientSelect({
  options,
  value,
  onChange,
  placeholder = "Search for a client…",
}: {
  options: { id: string; name: string; email: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const selected = options.find((o) => o.id === value);
  return (
    <div className="relative">
      <input
        list="client-options"
        className={inputCls}
        placeholder={placeholder}
        value={selected ? selected.name : ""}
        onChange={(e) => {
          const m = options.find((o) => o.name === e.target.value);
          onChange(m ? m.id : e.target.value);
        }}
      />
      <datalist id="client-options">
        {options.map((o) => (
          <option key={o.id} value={o.name}>
            {o.email}
          </option>
        ))}
      </datalist>
    </div>
  );
}