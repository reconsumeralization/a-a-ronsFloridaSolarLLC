"use client";

import { useState } from "react";

import { ClientButton } from "@/components/shared/ClientButton";
import type {
  ElectricityData,
  IncentiveData,
  SolarSystemData,
} from "@/data/calculator";
import { generatePdfReport } from "@/utils/reportGenerator";

interface DownloadReportProps {
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

export function DownloadReport(props: DownloadReportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generatePdfReport(props);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "solar-analysis-report.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate report:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ClientButton onClick={handleDownload} disabled={isGenerating}>
      {isGenerating ? "Generating..." : "Download Report"}
    </ClientButton>
  );
}
