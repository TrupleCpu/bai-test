import Icon from "@/components/Icon";

const STATUSES = [
  {
    icon: "paper-airplane",
    title: "Submitted",
    description:
      "Your broker has submitted your complete application to the lender.",
  },
  {
    icon: "magnifying-glass",
    title: "In Review",
    description:
      "The lender is assessing your details, documents, and eligibility.",
  },
  {
    icon: "document",
    title: "Additional Info Requested",
    description:
      "We've asked for more documents — you can upload them securely through your portal.",
  },
  {
    icon: "check-badge",
    title: "Approved",
    description: "Your loan has been approved. Settlement steps follow.",
  },
  {
    icon: "exclamation-triangle",
    title: "Declined",
    description:
      "The application didn't proceed — your broker will explain your options.",
  },
  {
    icon: "building-office",
    title: "Settled",
    description:
      "The loan has been settled directly with the lender — repayment stays with them.",
  },
];

export default function StatusTimeline() {
  return (
    <ol className="relative space-y-8 border-l-2 border-navy-100 pl-8">
      {STATUSES.map((status) => (
        <li key={status.title} className="relative">
          <span className="absolute -left-[45px] grid h-8 w-8 place-items-center rounded-full bg-navy-700 text-white">
            <Icon name={status.icon} className="size-4" />
          </span>
          <h3 className="font-display text-base font-semibold text-navy-700">
            {status.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">
            {status.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
