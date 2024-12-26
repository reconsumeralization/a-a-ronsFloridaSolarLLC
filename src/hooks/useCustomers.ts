import { useEffect, useState } from "react";

import { fetchCustomers } from "@/services/mockData";
import type { Customer } from "@/types/crm";

interface UseCustomersOptions {
  page?: number;
  limit?: number;
  status?: string;
  source?: string;
  dateRange?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface UseCustomersReturn {
  customers: Customer[];
  isLoading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export function useCustomers(
  options: UseCustomersOptions = {}
): UseCustomersReturn {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadCustomers() {
      try {
        setIsLoading(true);
        const result = await fetchCustomers(options);
        if (isMounted) {
          setCustomers(result.customers);
          setPagination(result.pagination);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch customers")
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadCustomers();

    return () => {
      isMounted = false;
    };
  }, [options]);

  return {
    customers,
    isLoading,
    error,
    pagination,
  };
}
