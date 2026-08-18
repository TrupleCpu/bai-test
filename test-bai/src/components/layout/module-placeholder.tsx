"use client";

import { useParams } from "next/navigation";
import PortalShell from "./portal-shell";
import { I } from "@/components/icons";
import { Card } from "@/components/ui";
import { portalNav } from "@/lib/portals";
import type { Role } from "@/lib/types";

export default function ModulePlaceholder({ role }: { role: Role }) {
  const params = useParams<{ slug?: string[] }>();
  const slug = (params.slug ?? []).map(decodeURIComponent).join(" / ");
  const label = slug ? `Module — ${slug}` : "Module";
  return (
    <PortalShell
      role={role}
      nav={portalNav[role]}
      title={label}
      breadcrumb={`${role.charAt(0).toUpperCase() + role.slice(1)} Portal`}
    >
      <Card className="mx-auto max-w-2xl p-10 text-center">
        <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <I.Alert className="size-7" />
        </span>
        <h2 className="text-lg font-bold text-navy">This screen is part of the design set</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This route is a placeholder in the static demo. Use the active screens (Dashboard, review
          queue, audit log, application detail…) to explore the implemented BAI Finance design system.
        </p>
      </Card>
    </PortalShell>
  );
}