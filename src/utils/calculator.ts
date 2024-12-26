import type {
  ElectricityData,
  IncentiveData,
  SolarSystemData,
} from "@/data/calculator";

export function calculateSolarSavings(
  electricity: ElectricityData,
  system: SolarSystemData,
  incentives: IncentiveData,
  years: number = 25
) {
  // Calculate annual production
  const sunHoursPerDay = 5.5; // Average sun hours in Florida
  const annualProduction =
    system.systemSize * sunHoursPerDay * 365 * system.panelEfficiency;

  // Calculate savings over time
  const savings = Array.from({ length: years }, (_, year) => {
    const yearlyDegradation = Math.pow(1 - system.annualDegradation, year);
    const yearlyProduction = annualProduction * yearlyDegradation;
    const yearlySavings = yearlyProduction * electricity.utilityRate;
    return yearlySavings;
  });

  // Calculate total incentives
  const totalIncentives =
    system.installationCost * incentives.federalTaxCredit +
    incentives.stateTaxCredit +
    incentives.utilityRebate +
    incentives.otherIncentives;

  // Calculate net cost
  const netCost = system.installationCost - totalIncentives;

  // Calculate payback period
  const paybackPeriod = netCost / (savings[0] + electricity.monthlyBill * 12);

  return {
    annualProduction,
    savings,
    totalIncentives,
    netCost,
    paybackPeriod,
  };
}

export function recommendSystemSize(monthlyUsage: number): number {
  const annualUsage = monthlyUsage * 12;
  const sunHoursPerDay = 5.5;
  const systemEfficiency = 0.85; // Account for various losses

  return annualUsage / (sunHoursPerDay * 365 * systemEfficiency);
}
