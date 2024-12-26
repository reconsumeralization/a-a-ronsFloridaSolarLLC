export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: "lead" | "prospect" | "customer" | "completed";
  source: "website" | "referral" | "advertisement" | "other";
  notes: Note[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  customerId: string;
  content: string;
  type: "general" | "follow_up" | "quote" | "installation";
  createdBy: string;
  createdAt: Date;
}

export interface Quote {
  id: string;
  customerId: string;
  systemSize: number;
  panelCount: number;
  estimatedProduction: number;
  estimatedSavings: number;
  totalCost: number;
  status: "draft" | "sent" | "accepted" | "rejected";
  createdAt: Date;
  validUntil: Date;
}

export interface Installation {
  id: string;
  customerId: string;
  quoteId: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduledDate: Date;
  completionDate?: Date;
  teamAssigned: string[];
  documents: Document[];
}

export interface Document {
  id: string;
  type: "permit" | "contract" | "inspection" | "warranty";
  url: string;
  name: string;
  uploadedAt: Date;
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";

export type ServiceStatus =
  | "scheduled"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Contact {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  contact: Contact;
  status: LeadStatus;
  source: string;
  notes: string[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceHistory {
  id: string;
  contactId: string;
  serviceType: "repair" | "maintenance" | "inspection";
  status: ServiceStatus;
  scheduledDate?: Date;
  completedDate?: Date;
  technician?: string;
  notes: string[];
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerProfile {
  contact: Contact;
  leads: Lead[];
  serviceHistory: ServiceHistory[];
  totalSpent: number;
  lastService?: Date;
  tags: string[];
  preferences: {
    communicationPreference: "email" | "phone" | "sms";
    marketingOptIn: boolean;
  };
}
