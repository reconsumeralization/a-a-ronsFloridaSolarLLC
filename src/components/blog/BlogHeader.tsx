"use client";

import { categories } from "@/data/blog";

interface BlogHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogHeader({
  selectedCategory,
  onCategoryChange,
}: BlogHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Solar Power Insights
      </h1>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
