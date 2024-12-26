"use client";

import { CheckCircle } from "lucide-react";

interface RepairIssue {
  title: string;
  description: string;
}

interface RepairIssuesProps {
  issues: RepairIssue[];
}

export function RepairIssues({ issues }: RepairIssuesProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Common PV Solar Issues We Repair
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {issues.map((issue) => (
          <div
            key={issue.title}
            className="flex items-start gap-4 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {issue.title}
              </h3>
              <p className="text-gray-600">{issue.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
