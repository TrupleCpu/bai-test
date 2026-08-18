import type { Role } from "@/lib/types";
import { I } from "@/components/icons";

export interface NavItem {
  label: string;
  href: string;
  icon: keyof typeof I;
  logout?: boolean;
}

export interface PortalUser {
  name: string;
  roleLabel: string;
  initials: string;
  email: string;
}

export const portalNav: Record<Role, NavItem[]> = {
  client: [
    { label: "My Applications", href: "/client", icon: "Home" },
    { label: "Documents", href: "/client/documents", icon: "Folder" },
    { label: "Communication", href: "/client/communication", icon: "Chat" },
    { label: "Book Consultation", href: "/client/book", icon: "Calendar" },
    { label: "Profile", href: "/client/profile", icon: "User" },
    { label: "Logout", href: "/portal", icon: "Logout", logout: true },
  ],
  broker: [
    { label: "Dashboard", href: "/broker", icon: "Home" },
    { label: "My Clients", href: "/broker/clients", icon: "Users" },
    { label: "Applications", href: "/broker/applications", icon: "File" },
    { label: "Bookings", href: "/broker/bookings", icon: "Calendar" },
    { label: "Communication", href: "/broker/communication", icon: "Chat" },
    { label: "Profile", href: "/broker/profile", icon: "User" },
    { label: "Logout", href: "/portal", icon: "Logout", logout: true },
  ],
  compliance: [
    { label: "Overview", href: "/compliance", icon: "Home" },
    { label: "Invitations", href: "/compliance/invitations", icon: "Mail" },
    { label: "Applications Queue", href: "/compliance/queue", icon: "File" },
    { label: "User Management", href: "/compliance/users", icon: "Users" },
    { label: "Audit Log", href: "/compliance/audit-log", icon: "ShieldCheck" },
    { label: "Logout", href: "/portal", icon: "Logout", logout: true },
  ],
};

export const portalUser: Record<Role, PortalUser> = {
  client: {
    name: "Maria Dela Cruz",
    roleLabel: "Client Portal",
    initials: "MD",
    email: "maria.delacruz@email.com",
  },
  broker: {
    name: "Jamie Ramirez",
    roleLabel: "Broker Portal",
    initials: "JR",
    email: "broker.jramirez@bai.com",
  },
  compliance: {
    name: "Keanu Chen",
    roleLabel: "Compliance Portal",
    initials: "KC",
    email: "compliance.kchen@bai.com",
  },
};

export const roleLanding: Record<Role, string> = {
  client: "/client",
  broker: "/broker",
  compliance: "/compliance",
};
