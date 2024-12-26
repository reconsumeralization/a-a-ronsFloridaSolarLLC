"use client";

import { useRouter } from "next/navigation";

import { ClientButton } from "@/components/shared/ClientButton";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useCustomers } from "@/hooks/useCustomers";
import type { Customer } from "@/types/crm";
import { getDateRangeStart } from "@/utils/dates";

interface CustomerListProps {
  filters: {
    status: string;
    source: string;
    dateRange: string;
  };
}

export function CustomerList({ filters }: CustomerListProps) {
  const router = useRouter();
  const { customers, isLoading, error } = useCustomers(filters);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-800">
        Failed to load customers: {error.message}
      </div>
    );
  }

  const filteredCustomers = customers.filter((customer) => {
    // Status filter
    if (filters.status !== "all" && customer.status !== filters.status) {
      return false;
    }

    // Source filter
    if (filters.source !== "all" && customer.source !== filters.source) {
      return false;
    }

    // Date range filter
    if (filters.dateRange !== "all") {
      const rangeStart = getDateRangeStart(filters.dateRange);
      if (customer.createdAt < rangeStart) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Source
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Created
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/crm/customers/${customer.id}`)}
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusColor(
                        customer.status,
                      )
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {customer.source}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {customer.address.city}, {customer.address.state}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(customer.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  <ClientButton
                    onClick={() => router.push(`/crm/customers/${customer.id}`)}
                    className="text-primary hover:text-primary/80"
                    variant="ghost"
                  >
                    View Details
                  </ClientButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getStatusColor(status: Customer["status"]) {
  switch (status) {
    case "lead":
      return "bg-yellow-100 text-yellow-800";
    case "prospect":
      return "bg-blue-100 text-blue-800";
    case "customer":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
