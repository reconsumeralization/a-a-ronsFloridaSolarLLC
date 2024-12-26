import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function calculateSavings(monthlyBill: number): {
  monthlySavings: number;
  yearlySavings: number;
  twentyYearSavings: number;
} {
  const averageSavingsPercentage = 0.85; // 85% savings on average
  const monthlyIncrease = 0.03; // 3% yearly increase in utility rates

  const monthlySavings = monthlyBill * averageSavingsPercentage;
  const yearlySavings = monthlySavings * 12;

  let twentyYearSavings = 0;
  let currentYearlySavings = yearlySavings;

  for (let year = 0; year < 20; year++) {
    twentyYearSavings += currentYearlySavings;
    currentYearlySavings *= 1 + monthlyIncrease;
  }

  return {
    monthlySavings,
    yearlySavings,
    twentyYearSavings,
  };
}
