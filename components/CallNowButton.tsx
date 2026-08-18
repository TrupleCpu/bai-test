import Icon from "@/components/Icon";

const PHONE_DISPLAY = "+63 917 555 0123";
const PHONE_TEL = "tel:+639175550123";

export default function CallNowButton({
  variant = "white",
  size = "md",
  className = "",
}: {
  variant?: "white" | "gold";
  size?: "sm" | "md";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer";
  const sizing = size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm";
  const tone =
    variant === "white"
      ? "bg-white text-navy-700 ring-2 ring-navy-700 hover:bg-navy-700 hover:text-white"
      : "bg-gold-400 text-navy-950 hover:bg-gold-500";
  return (
    <a href={PHONE_TEL} className={`${base} ${sizing} ${tone} ${className}`}>
      <Icon name="phone" className="size-4" />
      Call Now · {PHONE_DISPLAY}
    </a>
  );
}

export { PHONE_DISPLAY, PHONE_TEL };
