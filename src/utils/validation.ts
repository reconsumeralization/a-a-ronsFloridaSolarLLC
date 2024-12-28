export function validateElectricityInput(value: string): boolean {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0 && num < 100000;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatKwh(value: number): string {
  return `${formatNumber(Math.round(value))} kWh`;
}
