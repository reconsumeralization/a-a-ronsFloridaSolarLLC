import type { BlogPost } from "@/types/blog";

import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentPost: BlogPost;
  posts: BlogPost[];
}

export function RelatedPosts({ currentPost, posts }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
          post.author.name === currentPost.author.name),
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
