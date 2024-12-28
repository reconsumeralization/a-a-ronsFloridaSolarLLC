"use client";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface RepairProcessProps {
  steps: ProcessStep[];
}

export function RepairProcess({ steps }: RepairProcessProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Our Repair Process
      </h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex gap-6 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
              {step.number}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
