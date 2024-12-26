import type { companyHistory } from "@/data/team";

interface CompanyHistoryProps {
  history: typeof companyHistory;
}

export function CompanyHistory({ history }: CompanyHistoryProps) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200" />
      <div className="space-y-12">
        {history.map((event, index) => (
          <div
            key={event.year}
            className={`flex items-center ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className="w-5/12" />
            <div className="w-2/12 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {event.year}
                </span>
              </div>
            </div>
            <div className="w-5/12 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
