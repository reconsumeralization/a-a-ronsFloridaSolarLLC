import type {
  ElectricityData,
  IncentiveData,
  SolarSystemData,
} from "@/data/calculator";

interface ReportData {
  electricity: ElectricityData;
  system: SolarSystemData;
  incentives: IncentiveData;
  results: {
    annualProduction: number;
    savings: number[];
    totalIncentives: number;
    netCost: number;
    paybackPeriod: number;
  };
}

export async function generatePdfReport(data: ReportData): Promise<Blob> {
  // In a real app, you'd use a PDF library like pdfmake or jsPDF
  // For now, we'll create a simple blob
  const content = `
    Solar System Analysis Report

    Current Electricity Usage:
    Monthly Bill: $${data.electricity.monthlyBill}
    Average Usage: ${data.electricity.averageUsage} kWh
    Utility Rate: $${data.electricity.utilityRate}/kWh

    Recommended System:
    System Size: ${data.system.systemSize} kW
    Panel Efficiency: ${(data.system.panelEfficiency * 100).toFixed(1)}%
    Installation Cost: $${data.system.installationCost}

    Financial Analysis:
    Annual Production: ${Math.round(data.results.annualProduction)} kWh
    Total Incentives: $${Math.round(data.results.totalIncentives)}
    Net System Cost: $${Math.round(data.results.netCost)}
    Payback Period: ${data.results.paybackPeriod.toFixed(1)} years
    20-Year Savings: $${Math.round(
      data.results.savings.slice(0, 20).reduce((sum, saving) => sum + saving, 0)
    )}
  `;

  return new Blob([content], { type: "text/plain" });
}
