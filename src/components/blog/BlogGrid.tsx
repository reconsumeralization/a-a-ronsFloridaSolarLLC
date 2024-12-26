"use client";

import type { BlogPost } from "@/data/blog";

import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => <BlogCard key={post.id} post={post} />)}
    </div>
  );
}
