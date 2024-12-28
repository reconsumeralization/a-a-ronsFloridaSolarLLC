interface ComparisonTableProps {
  monthlyBill: number;
  yearlySavings: number;
  twentyYearSavings: number;
}

export function ComparisonTable({
  monthlyBill,
  yearlySavings,
  twentyYearSavings,
}: ComparisonTableProps) {
  const withoutSolar = {
    monthlyBill,
    yearlyBill: monthlyBill * 12,
    twentyYearCost: monthlyBill * 12 * 20,
  };

  const withSolar = {
    monthlyBill: Math.max(0, monthlyBill - yearlySavings / 12),
    yearlyBill: Math.max(0, monthlyBill * 12 - yearlySavings),
    twentyYearCost: Math.max(0, monthlyBill * 12 * 20 - twentyYearSavings),
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Metric
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              Without Solar
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              With Solar
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-primary">
              Savings
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {[
            {
              label: "Monthly Bill",
              without: withoutSolar.monthlyBill,
              with: withSolar.monthlyBill,
            },
            {
              label: "Yearly Bill",
              without: withoutSolar.yearlyBill,
              with: withSolar.yearlyBill,
            },
            {
              label: "20-Year Cost",
              without: withoutSolar.twentyYearCost,
              with: withSolar.twentyYearCost,
            },
          ].map((row) => (
            <tr key={row.label}>
              <td className="px-6 py-4 text-sm text-gray-900">{row.label}</td>
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                ${row.without.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                ${row.with.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium text-primary">
                ${(row.without - row.with).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
