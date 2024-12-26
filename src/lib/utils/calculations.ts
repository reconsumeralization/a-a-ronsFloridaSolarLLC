export interface ROIProjection {
  year: number;
  savings: number;
  cumulativeSavings: number;
  maintenanceCost: number;
  netSavings: number;
  roi: number;
}

export interface EnvironmentalImpact {
  co2Reduction: number; // in kg
  treesEquivalent: number;
  waterSaved: number; // in gallons
  carbonOffset: number; // in kg
  energyProduced: number; // in kWh
  gasEmissionsAvoided: number; // in kg
  carMilesOffset: number; // in miles
  homesPowered: number; // equivalent homes
  wasteDiverted: number; // in kg
  airQualityImprovement: number; // percentage
}

export function calculateROIProjections(
  systemSize: number,
  annualSavings: number,
  maintenanceCost: number,
  years: number = 5
): ROIProjection[] {
  return Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    const savings = annualSavings * year;
    const totalMaintenance = maintenanceCost * year;
    const netSavings = savings - totalMaintenance;
    const roi = (netSavings / (maintenanceCost * year)) * 100;

    return {
      year,
      savings,
      cumulativeSavings: savings,
      maintenanceCost: totalMaintenance,
      netSavings,
      roi: Math.round(roi * 100) / 100,
    };
  });
}

export function calculateEnvironmentalImpact(
  systemSize: number,
  efficiency: number
): EnvironmentalImpact {
  const annualKwh = systemSize * 1000 * (efficiency / 100);

  // EPA and industry standard conversion factors
  const co2PerKwh = 0.7; // kg CO2 per kWh
  const treesPerTonCo2 = 45; // trees per metric ton of CO2
  const waterPerKwh = 0.5; // gallons per kWh
  const gasPerKwh = 0.0089; // kg CH4 per kWh
  const milesPerKgCo2 = 2.5; // miles per kg CO2
  const kwhPerHome = 10649; // average annual household consumption
  const wastePerPanel = 20; // kg waste avoided per panel
  const airQualityPerKw = 0.1; // % improvement per kW

  const co2Reduction = annualKwh * co2PerKwh;
  const treesEquivalent = (co2Reduction / 1000) * treesPerTonCo2;
  const waterSaved = annualKwh * waterPerKwh;
  const carbonOffset = co2Reduction;
  const energyProduced = annualKwh;
  const gasEmissionsAvoided = annualKwh * gasPerKwh;
  const carMilesOffset = co2Reduction * milesPerKgCo2;
  const homesPowered = annualKwh / kwhPerHome;
  const wasteDiverted = systemSize * wastePerPanel;
  const airQualityImprovement = systemSize * airQualityPerKw;

  return {
    co2Reduction: Math.round(co2Reduction),
    treesEquivalent: Math.round(treesEquivalent),
    waterSaved: Math.round(waterSaved),
    carbonOffset: Math.round(carbonOffset),
    energyProduced: Math.round(energyProduced),
    gasEmissionsAvoided: Math.round(gasEmissionsAvoided),
    carMilesOffset: Math.round(carMilesOffset),
    homesPowered: Math.round(homesPowered * 100) / 100,
    wasteDiverted: Math.round(wasteDiverted),
    airQualityImprovement: Math.round(airQualityImprovement * 100) / 100,
  };
}
