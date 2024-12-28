"use client";

import { MDXRemote } from "next-mdx-remote";

import type { BlogPost as BlogPostType } from "@/data/blog";

import { OptimizedImage } from "../shared/OptimizedImage";

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <header className="relative h-[400px]">
        <OptimizedImage
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4">
            <OptimizedImage
              src={post.author.avatar}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full border-2 border-white"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-200">{post.author.role}</p>
            </div>
            <div className="ml-auto text-sm">
              <span>{post.date}</span>
              <span className="mx-2">·</span>
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>
      </header>
      <div className="p-8">
        <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary hover:prose-a:text-primary/80">
          <MDXRemote
            source={post.content}
            components={{
              p: (props) => <p className="mb-6 leading-relaxed" {...props} />,
              ul: (props) => (
                <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
              ),
              li: (props) => (
                <li className="text-gray-600 leading-relaxed" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
              ),
              h3: (props) => (
                <h3 className="text-xl font-bold mt-6 mb-3" {...props} />
              ),
            }}
          />
        </div>
      </div>
    </article>
  );
}
