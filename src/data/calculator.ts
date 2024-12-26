export interface ElectricityData {
  monthlyBill: number;
  averageUsage: number; // in kWh
  utilityRate: number; // per kWh
}

export interface SolarSystemData {
  systemSize: number; // in kW
  panelEfficiency: number;
  installationCost: number;
  annualDegradation: number;
}

export interface IncentiveData {
  federalTaxCredit: number;
  stateTaxCredit: number;
  utilityRebate: number;
  otherIncentives: number;
}

export const defaultSystemData: SolarSystemData = {
  systemSize: 6,
  panelEfficiency: 0.2,
  installationCost: 15000,
  annualDegradation: 0.005, // 0.5% per year
};

export const floridaIncentives: IncentiveData = {
  federalTaxCredit: 0.3, // 30% federal tax credit
  stateTaxCredit: 0,
  utilityRebate: 1000,
  otherIncentives: 500,
};

export const averageUtilityRates = {
  florida: 0.1251, // Average rate in Florida
};
