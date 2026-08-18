import type { SVGProps } from "react";

type IP = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-5",
} as const;

export const I = {
  Home: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M3 10.2 12 3l9 7.2V21h-5.5v-6h-7v6H3z" />
    </svg>
  ),
  Users: (p: IP) => (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.6-3.4 2.8-5 5.5-5s4.9 1.6 5.5 5" />
      <path d="M16 5.4a3 3 0 0 1 0 5.4" />
      <path d="M17.5 15c1.7.4 2.8 1.8 3.2 4" />
    </svg>
  ),
  File: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M6 2.5h8l4 4V21H6z" />
      <path d="M14 2.5V7h4" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  ),
  Calendar: (p: IP) => (
    <svg {...base} {...p}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M8 2.5v4M16 2.5v4" />
    </svg>
  ),
  Chat: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M21 12a8 8 0 0 1-8 8H4.5L6 17.2A8 8 0 1 1 21 12z" />
      <path d="M8.5 10.5h7M8.5 13.5h4" />
    </svg>
  ),
  User: (p: IP) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.6 3.2-5.5 7-5.5s6.3 1.9 7 5.5" />
    </svg>
  ),
  Logout: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M9 21H5a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 5 3h4" />
      <path d="M15.5 8l4 4-4 4M19.5 12h-9" />
    </svg>
  ),
  Bell: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M6 9.5a6 6 0 0 1 12 0c0 4 1.5 5 1.5 5H4.5S6 13.5 6 9.5z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  ),
  Lock: (p: IP) => (
    <svg {...base} {...p}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
    </svg>
  ),
  Shield: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M12 2.8 20 6v6c0 4.8-3.4 8.3-8 9.4-4.6-1.1-8-4.6-8-9.4V6z" />
      <path d="m8.5 11.6 2.4 2.4 4.6-4.8" />
    </svg>
  ),
  Search: (p: IP) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  ),
  Filter: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M4 5h16M7 12h10M10 19h4" />
    </svg>
  ),
  Plus: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Upload: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M12 16V4M7.5 8.5 12 4l4.5 4.5" />
      <path d="M5 16.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-2.5" />
    </svg>
  ),
  Eye: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Check: (p: IP) => (
    <svg {...base} {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  ),
  Close: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  ChevronDown: (p: IP) => (
    <svg {...base} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  ChevronRight: (p: IP) => (
    <svg {...base} {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  ArrowRight: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  ),
  Clock: (p: IP) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  Download: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M12 4v12M7.5 11.5 12 16l4.5-4.5" />
      <path d="M5 16.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-2.5" />
    </svg>
  ),
  Mail: (p: IP) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  ),
  Menu: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
    </svg>
  ),
  Send: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M21 3 10 14M21 3l-6.5 18-3.5-8-8-4z" />
    </svg>
  ),
  Refresh: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M20 5v5h-5" />
      <path d="M19.2 15.5A8 8 0 1 1 19 8.5L20 10" />
    </svg>
  ),
  Alert: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M12 3.5 22 20H2z" />
      <path d="M12 9.5V14M12 17h.01" />
    </svg>
  ),
  XCircle: (p: IP) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </svg>
  ),
  Doc: (p: IP) => (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  ),
  Folder: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  Dots: (p: IP) => (
    <svg {...base} {...p}>
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  ShieldCheck: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M12 2.8 20 6v6c0 4.8-3.4 8.3-8 9.4-4.6-1.1-8-4.6-8-9.4V6z" />
      <path d="m8.5 11.6 2.4 2.4 4.6-4.8" />
    </svg>
  ),
  ChevronUp: (p: IP) => (
    <svg {...base} {...p}>
      <path d="m6 15 6-6 6 6" />
    </svg>
  ),
  TrendingUp: (p: IP) => (
    <svg {...base} {...p}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  ),
  Wallet: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M16 12h.01" />
    </svg>
  ),
  Car: (p: IP) => (
    <svg {...base} {...p}>
      <path d="M5 17H3.5a1.5 1.5 0 0 1-1.5-1.5V11l2-5a2 2 0 0 1 1.9-1.4h9.2A2 2 0 0 1 16.6 6l2 5v4.5a1.5 1.5 0 0 1-1.5 1.5H15" />
      <path d="M5.5 13h13" />
      <circle cx="8" cy="17" r="1.5" />
      <circle cx="16" cy="17" r="1.5" />
      <path d="M9 4.5 8.2 6.5M14 4.5 14.8 6.5" />
    </svg>
  ),
  Building: (p: IP) => (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 3v18M15 3v18" />
      <path d="M4 9h5M15 9h5M4 15h5M15 15h5M9 7h6M9 13h6" />
    </svg>
  ),
};