"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { ShareButton } from "./ShareButton";

type PostCardProps = {
  post: {
    id: number;
    title: string;
    content?: string;
    description?: string;
    image: string;
    slug: string;
    published_at?: string;
    category: {
      id: number;
      name: string;
      color: string;
    };
  };
  fromPath?: string;
};

export function PostCard({ post, fromPath }: PostCardProps) {
  // Use description first, then content as fallback
  let displayText = "";

  if (post.description) {
    displayText = post.description;
  } else if (post.content) {
    // Extract first 200 chars from content as preview
    displayText = post.content.substring(0, 200);
  }

  // Format to a proper snippet with limited length and ellipsis
  const snippet =
    displayText.length > 350
      ? displayText.substring(0, 350) + "..."
      : displayText;

  // Determine the link to use (prefer internal routing)
  const viewLink = post.slug
    ? fromPath
      ? `/c/${post.slug}?from=${encodeURIComponent(fromPath)}`
      : `/c/${post.slug}`
    : fromPath
      ? `/c/${post.id}?from=${encodeURIComponent(fromPath)}`
      : `/c/${post.id}`;

  // Prevent click propagation for interactive elements
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="md:flex md:gap-6">
        {/* Image (left on desktop, top on mobile) */}
        {post.image && (
          <Link
            href={viewLink}
            className="block md:flex-shrink-0 md:w-72 lg:w-96"
          >
            <div className="relative w-full h-56 md:h-48 lg:h-56 rounded-xl overflow-hidden mb-4 md:mb-0 bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 24rem, (min-width: 768px) 18rem, 100vw"
                className="object-cover md:object-contain bg-muted md:bg-transparent transition-transform duration-500 group-hover:scale-[1.02] md:group-hover:scale-100"
              />
            </div>
          </Link>
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Category */}
              {post.category && (
                <span
                  className="text-xs font-medium px-2 py-1 rounded-lg"
                  style={{
                    backgroundColor: `${post.category.color}20`,
                    color: post.category.color,
                  }}
                >
                  {post.category.name || "Без категория"}
                </span>
              )}
            </div>
            {/* Share button */}
            <div onClick={handleClick}>
              <ShareButton url={viewLink} title={post.title} />
            </div>
          </div>

          {/* Post Title */}
          <Link href={viewLink} className="block group">
            <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
              {post.title}
            </h2>
          </Link>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-muted-foreground text-base leading-relaxed">
              {snippet}
            </p>
          </div>

          {/* Post Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.published_at || Date.now()).toLocaleDateString(
                    "bg-BG",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Link
                href={viewLink}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                Прочети повече
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
