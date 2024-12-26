"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/Icons";
import { ClientButton } from "@/components/shared/ClientButton";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { featuredPosts } from "@/data/blog";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { NotFoundError } from "@/utils/errors";

export function BlogSection() {
  const [posts, setPosts] = useState(featuredPosts);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!featuredPosts.length) {
          throw new NotFoundError("No blog posts found");
        }

        setPosts(featuredPosts);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [handleError]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {error.message
          ? (
            <ErrorAlert
              message={error.message}
              type={error.type}
              onClose={clearError}
            />
          )
          : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">
                  Solar Maintenance Tips & Updates
                </h2>
                <p className="text-xl text-gray-600">
                  Expert advice and insights to help you maintain your solar
                  investment and maximize its performance
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredPosts.slice(0, 3).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">{post.date}</div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.author.name}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <Link href="/blog">
                  <ClientButton
                    variant="outline"
                    size="lg"
                    className="group"
                  >
                    View All Articles
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </ClientButton>
                </Link>
              </motion.div>
            </>
          )}
      </div>
    </section>
  );
}
