type SectionHeadingProps = {
  pill?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  pill,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {pill && (
        <span className="inline-block rounded-full border border-navy-500 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy-500">
          {pill}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-700 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
