import type { Customer } from "@/types/crm";

const mockCustomers: Customer[] = Array.from({ length: 50 }, (_, i) => ({
  id: `cust_${i + 1}`,
  firstName: `John${i + 1}`,
  lastName: `Doe${i + 1}`,
  email: `john.doe${i + 1}@example.com`,
  phone: `(555) ${String(i + 1).padStart(3, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
  address: {
    street: `${1234 + i} Solar Street`,
    city: "Tampa",
    state: "FL",
    zipCode: "33601",
  },
  status: ["lead", "prospect", "customer", "completed"][
    Math.floor(Math.random() * 4)
  ] as Customer["status"],
  source: ["website", "referral", "advertisement", "other"][
    Math.floor(Math.random() * 4)
  ] as Customer["source"],
  notes: [],
  createdAt: new Date(
    Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000
  ),
  updatedAt: new Date(),
}));

interface FetchCustomersOptions {
  page?: number;
  limit?: number;
  status?: string;
  source?: string;
  dateRange?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Add type for sortable fields
type SortableFields = keyof Pick<
  Customer,
  | "firstName"
  | "lastName"
  | "email"
  | "status"
  | "source"
  | "createdAt"
  | "updatedAt"
>;

export async function fetchCustomers(options: FetchCustomersOptions = {}) {
  const {
    page = 1,
    limit = 10,
    status = "all",
    source = "all",
    dateRange = "all",
    sortBy = "createdAt" as SortableFields,
    sortOrder = "desc",
  } = options;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredCustomers = [...mockCustomers];

  // Apply filters
  if (status !== "all") {
    filteredCustomers = filteredCustomers.filter((c) => c.status === status);
  }

  if (source !== "all") {
    filteredCustomers = filteredCustomers.filter((c) => c.source === source);
  }

  // Apply date range filter
  if (dateRange !== "all") {
    const startDate = new Date();
    switch (dateRange) {
      case "today":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "quarter":
        startDate.setMonth(startDate.getMonth() - 3);
        break;
    }
    filteredCustomers = filteredCustomers.filter(
      (c) => c.createdAt >= startDate
    );
  }

  // Apply sorting with proper typing
  filteredCustomers.sort((a: Customer, b: Customer) => {
    const aValue = a[sortBy as SortableFields];
    const bValue = b[sortBy as SortableFields];

    // Handle different types of values
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    // Fallback for other types
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    return 0;
  });

  // Calculate pagination
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  return {
    customers: paginatedCustomers,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  };
}

export async function fetchCustomerById(id: string): Promise<Customer | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockCustomers.find((c) => c.id === id) || null;
}
