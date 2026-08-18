import Icon from "@/components/Icon";

const ITEMS = [
  { icon: "lock", label: "SSL / TLS encrypted everywhere" },
  { icon: "shield-check", label: "Encrypted at rest" },
  { icon: "check-badge", label: "AU Privacy Act (APPs) compliant" },
  { icon: "key", label: "Invite-only secure access" },
  { icon: "building-office", label: "ANZ · CommBank · more" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-navy-100 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2.5 text-sm font-medium text-navy-700"
          >
            <Icon name={item.icon} className="size-5 shrink-0 text-gold-500" />
            <span className="leading-snug">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
