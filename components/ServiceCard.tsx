import Link from "next/link";
import Icon from "@/components/Icon";

export type Service = {
  icon: string;
  title: string;
  description: string;
  fields: string[];
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-50 text-navy-700 transition-colors duration-200 group-hover:bg-navy-700 group-hover:text-white">
        <Icon name={service.icon} className="size-6" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy-700">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">
        {service.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {service.fields.map((field) => (
          <li
            key={field}
            className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-navy-700"
          >
            {field}
          </li>
        ))}
      </ul>
      <Link
        href="/services"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 transition-colors duration-200 hover:text-gold-500"
      >
        Learn more
        <Icon
          name="arrow-right"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
