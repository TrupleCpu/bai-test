import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="BAI Finance — home"
      className="inline-flex items-center gap-2.5"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-700 font-display text-lg font-bold text-white">
        B
      </span>
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          light ? "text-white" : "text-navy-700"
        }`}
      >
        BAI
        <span className={light ? "text-gold-400" : "text-navy-500"}>
          {" "}
          Finance
        </span>
      </span>
    </Link>
  );
}
