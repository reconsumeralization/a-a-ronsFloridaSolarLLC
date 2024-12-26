"use client";

import Link from "next/link";

import type { BlogPost } from "@/data/blog";

import { OptimizedImage } from "../shared/OptimizedImage";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-48">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <OptimizedImage
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-600">{post.author.role}</p>
            </div>
          </div>
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-3">
            {post.category}
          </span>
          <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
            <span>{post.date}</span>
            <span>{post.readTime} read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
