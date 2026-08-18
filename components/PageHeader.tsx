export default function PageHeader({
  pill,
  title,
  subtitle,
}: {
  pill: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="inline-block rounded-full border border-navy-500 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy-500">
          {pill}
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy-700 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
