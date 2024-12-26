interface SavingsResultsProps {
  annualProduction: number;
  totalIncentives: number;
  netCost: number;
  paybackPeriod: number;
  twentyYearSavings: number;
}

export function SavingsResults({
  annualProduction,
  totalIncentives,
  netCost,
  paybackPeriod,
  twentyYearSavings,
}: SavingsResultsProps) {
  const metrics = [
    {
      label: "Annual Energy Production",
      value: `${Math.round(annualProduction).toLocaleString()} kWh`,
    },
    {
      label: "Total Incentives",
      value: `$${Math.round(totalIncentives).toLocaleString()}`,
    },
    {
      label: "Net System Cost",
      value: `$${Math.round(netCost).toLocaleString()}`,
    },
    {
      label: "Payback Period",
      value: `${paybackPeriod.toFixed(1)} years`,
    },
    {
      label: "20-Year Savings",
      value: `$${Math.round(twentyYearSavings).toLocaleString()}`,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white rounded-xl shadow-lg p-6 text-center"
        >
          <p className="text-gray-600 mb-2">{metric.label}</p>
          <p className="text-2xl font-bold text-primary">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
