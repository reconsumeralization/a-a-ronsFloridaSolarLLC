export interface EfficiencyMetrics {
  energyOutput: number;
  panelEfficiency: number;
  shadeOptimization: number;
  dustReduction: number;
  degradationPrevention: number;
  temperatureOptimization: number;
  microcracksStatus: number;
  inverterEfficiency: number;
  wiringOptimization: number;
  orientationAlignment: number;
}

export const EFFICIENCY_DESCRIPTIONS = {
  energyOutput: "Overall power generation capacity of the system",
  panelEfficiency: "Individual panel conversion efficiency",
  shadeOptimization: "Effectiveness of shade management",
  dustReduction: "Cleanliness and dust prevention",
  degradationPrevention: "Protection against long-term wear",
  temperatureOptimization: "Panel temperature management",
  microcracksStatus: "Panel structural integrity",
  inverterEfficiency: "Power conversion performance",
  wiringOptimization: "System wiring and connection quality",
  orientationAlignment: "Panel positioning optimization",
} as const;

export function calculateEfficiencyMetrics(
  systemAge: number,
  lastCleaning: number,
  shading: string,
  location: string
): EfficiencyMetrics {
  // Base calculations
  const ageImpact = Math.max(0, 100 - systemAge * 2);
  const cleaningImpact = Math.max(0, 100 - lastCleaning * 5);
  const shadingFactor =
    {
      heavy: 0.7,
      moderate: 0.85,
      minimal: 1,
    }[shading as keyof typeof shadingFactor] || 0.85;

  const locationFactor =
    {
      coastal: 0.9,
      urban: 0.95,
      rural: 1,
    }[location as keyof typeof locationFactor] || 0.95;

  return {
    energyOutput: Math.round(ageImpact * shadingFactor * locationFactor),
    panelEfficiency: Math.round(cleaningImpact * locationFactor),
    shadeOptimization: Math.round(100 * shadingFactor),
    dustReduction: Math.round(cleaningImpact),
    degradationPrevention: Math.round(ageImpact),
    temperatureOptimization: Math.round(85 * locationFactor),
    microcracksStatus: Math.round(ageImpact * 0.9),
    inverterEfficiency: Math.round(90 * locationFactor),
    wiringOptimization: Math.round(95 * shadingFactor),
    orientationAlignment: Math.round(90 * shadingFactor),
  };
}

export function calculatePotentialEfficiency(
  current: EfficiencyMetrics
): EfficiencyMetrics {
  return Object.entries(current).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: Math.min(100, Math.round(value * 1.2)),
    }),
    {} as EfficiencyMetrics
  );
}
