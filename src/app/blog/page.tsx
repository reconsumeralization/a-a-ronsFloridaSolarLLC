"use client";

import { useState } from "react";

import { BlogCard } from "@/components/blog/BlogCard";
import { ClientButton } from "@/components/shared/ClientButton";
import type { Category } from "@/data/blog";
import { categories, featuredPosts } from "@/data/blog";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = featuredPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" ||
      post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Blog</h1>
          <p className="text-gray-600">
            Expert insights, maintenance tips, and updates from the solar
            industry
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <ClientButton
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category
                    ? "primary"
                    : "secondary"}
                >
                  {category}
                </ClientButton>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No posts found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
