import Link from "next/link";

import { BlogCard } from "../blog/BlogCard";
import { Button } from "../shared/Button";

const featuredPosts = [
  {
    id: "1",
    title: "The Benefits of Regular Solar Panel Maintenance",
    slug: "benefits-of-solar-panel-maintenance",
    excerpt:
      "Discover how regular maintenance can improve your solar panel efficiency and extend their lifespan.",
    coverImage: "/blog/maintenance.jpg",
    date: "2024-03-15",
    author: {
      name: "John Smith",
      avatar: "/team/john.jpg",
    },
    category: "Maintenance",
    readTime: 5,
    content: "", // Full content would be in the actual blog post page
  },
  {
    id: "2",
    title: "Solar Investment Tax Credits in 2024",
    slug: "solar-tax-credits-2024",
    excerpt:
      "Learn about the latest solar investment tax credits and how they can benefit your solar installation.",
    coverImage: "/blog/tax-credits.jpg",
    date: "2024-03-10",
    author: {
      name: "Sarah Johnson",
      avatar: "/team/sarah.jpg",
    },
    category: "Finance",
    readTime: 7,
    content: "",
  },
  {
    id: "3",
    title: "How to Choose the Right Solar Panel System",
    slug: "choosing-solar-panel-system",
    excerpt:
      "A comprehensive guide to selecting the perfect solar panel system for your home.",
    coverImage: "/blog/solar-choice.jpg",
    date: "2024-03-05",
    author: {
      name: "Mike Wilson",
      avatar: "/team/mike.jpg",
    },
    category: "Guide",
    readTime: 10,
    content: "",
  },
];

export function BlogSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Solar Insights
          </h2>
          <p className="text-gray-600">
            Stay informed about solar technology, maintenance tips, and industry
            updates
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
