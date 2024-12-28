export function CalculatorSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-16" />

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-100 rounded-xl h-[300px]" />
        <div className="bg-gray-100 rounded-xl h-[300px]" />
      </div>

      <div className="space-y-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-xl h-[120px]"
            />
          ))}
        </div>

        <div className="bg-gray-100 rounded-xl h-[400px]" />
        <div className="bg-gray-100 rounded-xl h-[400px]" />
      </div>
    </div>
  );
}
