export function CustomerStats() {
  const stats = [
    {
      name: "Total Leads",
      value: "125",
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Conversion Rate",
      value: "24%",
      change: "+4%",
      changeType: "increase",
    },
    {
      name: "Active Customers",
      value: "48",
      change: "+8",
      changeType: "increase",
    },
    {
      name: "Revenue",
      value: "$284,500",
      change: "+23%",
      changeType: "increase",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-xl shadow-lg overflow-hidden px-6 py-4"
        >
          <p className="text-sm font-medium text-gray-600 truncate">
            {stat.name}
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {stat.value}
          </p>
          <div className="mt-1">
            <span
              className={`text-sm ${
                stat.changeType === "increase"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-600">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
