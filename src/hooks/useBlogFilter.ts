"use client";

import { useCallback, useState } from "react";

import type { BlogPost, Category } from "@/data/blog";

export function useBlogFilter(initialPosts: BlogPost[]) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  const handleCategoryChange = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      if (category === "All") {
        setFilteredPosts(initialPosts);
      } else {
        setFilteredPosts(
          initialPosts.filter((post) => post.category === category)
        );
      }
    },
    [initialPosts]
  );

  return {
    selectedCategory,
    filteredPosts,
    handleCategoryChange,
  };
}
