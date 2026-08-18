export type Role = "client" | "broker" | "compliance";

export type ApplicationStatus =
  | "Submitted"
  | "In Review"
  | "Additional Info Requested"
  | "Approved"
  | "Declined"
  | "Settled";

export type InviteStatus = "Sent" | "Activated" | "Expired";
export type VerificationStatus = "Pending" | "Verified" | "Flagged";
export type DocStatus = "Uploaded" | "In Review" | "Reviewed";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface LoanApplication {
  id: string;
  clientId: string;
  clientName: string;
  lender: string;
  amount: number;
  purpose: string;
  termMonths: number;
  status: ApplicationStatus;
  updatedAt: string;
  broker: string;
  notes?: string;
  actionNeeded?: string;
}

export interface Communication {
  id: string;
  subject: string;
  from: string;
  to: string;
  timestamp: string;
  direction: "inbound" | "outbound";
  read: boolean;
  preview: string;
}

export interface UploadedDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  status: DocStatus;
}

export interface Booking {
  id: string;
  clientName: string;
  topic: string;
  dateTime: string;
  status: "Confirmed" | "Pending" | "Completed";
}

export interface Invitation {
  id: string;
  name: string;
  email: string;
  phone: string;
  inviteStatus: InviteStatus;
  verificationStatus: VerificationStatus;
  sentAt: string;
  notes?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  ip: string;
}

export interface Service {
  id: string;
  name: string;
  blurb: string;
  features: string[];
  icon: "Home" | "Refresh" | "TrendingUp" | "Wallet" | "Car" | "File" | "Building" | "Users";
}

export type BookingSlotStatus = "available" | "booked" | "past";

export interface BookingSlot {
  id: string;
  broker: string;
  date: string;
  time: string;
  status: BookingSlotStatus;
}

export type StaffRole = "Broker" | "Senior Broker" | "Compliance Team";
export type StaffStatus = "Pending" | "Active" | "Suspended";

export interface StaffAccount {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  status: StaffStatus;
  requestedAt: string;
  approvedBy?: string;
  mfa: boolean;
}