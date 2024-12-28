import type { companyValues } from "@/data/team";

interface CompanyValuesProps {
  values: typeof companyValues;
}

export function CompanyValues({ values }: CompanyValuesProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {values.map((value) => (
        <div
          key={value.title}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Icon paths based on the icon name */}
              {value.icon === "leaf" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              )}
              {/* Add other icon paths here */}
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">{value.title}</h3>
          <p className="text-gray-600">{value.description}</p>
        </div>
      ))}
    </div>
  );
}
