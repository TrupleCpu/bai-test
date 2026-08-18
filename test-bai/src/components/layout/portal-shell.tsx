"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { I } from "@/components/icons";
import { Avatar, SecureLabel } from "@/components/ui";
import { portalUser, type NavItem, type PortalUser } from "@/lib/portals";
import type { Role } from "@/lib/types";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-navy text-white shadow">
        <I.ShieldCheck className="size-5" />
      </span>
      {!compact && (
        <div className="leading-tight">
          <div className="text-[15px] font-bold tracking-tight text-white">
            BAI Finance
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
            Secure Portal
          </div>
        </div>
      )}
    </div>
  );
}

function NavList({
  nav,
  active,
  onNavigate,
}: {
  nav: NavItem[];
  active: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="mt-6 flex-1 space-y-1 px-3">
      {nav.map((item) => {
        const Icon = I[item.icon];
        const isActive = item.href !== "/" && (active === item.href || active.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-white shadow"
                : item.logout
                  ? "text-muted hover:bg-white/5 hover:text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="size-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SideContent({ user, nav, active, onNavigate }: { user: PortalUser; nav: NavItem[]; active: string; onNavigate?: () => void }) {
  return (
    <>
      <div className="px-3 pt-5">
        <Logo />
      </div>
      <NavList nav={nav} active={active} onNavigate={onNavigate} />
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Avatar initials={user.initials} size="sm" />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-semibold text-white">{user.name}</div>
            <div className="truncate text-[11px] text-muted">{user.email}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PortalShell({
  role,
  nav,
  user: userOverride,
  title,
  breadcrumb,
  children,
  mfa = false,
  notifications = 2,
}: {
  role: Role;
  nav: NavItem[];
  user?: PortalUser;
  title: string;
  breadcrumb?: string;
  children: ReactNode;
  mfa?: boolean;
  notifications?: number;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = userOverride ?? portalUser[role];

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-navy lg:flex">
        <div className="flex flex-1 flex-col">
          <SideContent user={user} nav={nav} active={pathname} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy-deep/50" onClick={() => setMenuOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-navy">
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-1.5 text-white/70 hover:bg-white/10"
            >
              <I.Close />
            </button>
            <SideContent user={user} nav={nav} active={pathname} onNavigate={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex w-full flex-col lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-black/5 bg-white/95 px-4 backdrop-blur sm:px-6">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-lg p-1.5 text-navy hover:bg-primary-soft lg:hidden"
          >
            <I.Menu />
          </button>
          <div className="min-w-0 flex-1">
            {breadcrumb && (
              <div className="text-[11px] font-medium text-muted">{breadcrumb}</div>
            )}
            <h1 className="truncate text-lg font-bold tracking-tight text-navy">{title}</h1>
          </div>
          <SecureLabel />
          <div className="relative">
            <button
              aria-label="Notifications"
              className="relative flex size-9 items-center justify-center rounded-lg text-navy hover:bg-primary-soft"
            >
              <I.Bell className="size-5" />
              {notifications > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-navy">
                  {notifications}
                </span>
              )}
            </button>
          </div>
          {mfa && (
            <span
              title="Multi-factor authentication enabled"
              className="hidden items-center gap-1 rounded-full border border-positive/25 bg-positive/5 px-2.5 py-1 text-[11px] font-semibold text-positive sm:inline-flex"
            >
              <I.ShieldCheck className="size-3.5" />
              MFA
            </span>
          )}
          <div className="flex items-center gap-2.5 border-l border-black/5 pl-4">
            <Avatar initials={user.initials} />
            <div className="hidden leading-tight md:block">
              <div className="text-sm font-semibold text-ink">{user.name}</div>
              <div className="text-[11px] text-muted">{user.roleLabel}</div>
            </div>
            <I.ChevronDown className="size-4 text-muted" />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}