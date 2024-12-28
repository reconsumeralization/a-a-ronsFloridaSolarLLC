import Image from 'next/image';
import Link from 'next/link';

import { Comments } from '@/components/blog/Comments';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { Newsletter } from '@/components/shared/Newsletter';
import { featuredPosts } from '@/data/blog';
import type { BlogPost } from '@/types/blog';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = featuredPosts.find((p) => p.slug === params.slug) as BlogPost;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              ← Back to Blog
            </Link>
            <span className="text-sm text-primary font-medium">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">
              {post.readTime} min read
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 mb-8">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-gray-500">{post.date}</p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-8">
            <ShareButtons title={post.title} description={post.excerpt} />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            {post.content}
          </div>
          <Comments postId={post.id} />
        </div>

        {/* Related Posts */}
        <div className="max-w-7xl mx-auto">
          <RelatedPosts currentPost={post} posts={featuredPosts} />
        </div>

        {/* Replace the newsletter section with the new component */}
        <div className="max-w-3xl mx-auto mt-20">
          <Newsletter />
        </div>
      </div>
    </article>
  );
}
