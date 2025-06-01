'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink, Zap, Stars } from 'lucide-react';
import { ShareButton } from './ShareButton';

type PostCardProps = {
  post: {
    id: number;
    title: string;
    short_content: string | object;
    description?: string;
    image: string;
    slug: string;
    externallink?: string;
    is_deep_research?: boolean;
    category: {
      id: number;
      name: string;
      color: string;
    };
  };
};

export function PostCard({ post }: PostCardProps) {
  // Use the description field if available, otherwise fallback to short_content
  let displayText = post.description || '';
  
  // If no description, try to extract from short_content
  if (!displayText && post.short_content) {
    try {
      if (typeof post.short_content === 'string') {
        displayText = post.short_content;
      } else if (typeof post.short_content === 'object') {
        // If it's a JSON object with blocks, try to extract text content
        if (Array.isArray(post.short_content)) {
          displayText = post.short_content
            .map((block: { text?: string; content?: string }) => block.text || block.content || '')
            .join('\n\n');
        } else {
          displayText = JSON.stringify(post.short_content);
        }
      }
    } catch (e) {
      console.error('Error parsing short content:', e);
      displayText = '';
    }
  }
  
  // Format to a proper snippet with limited length and ellipsis
  const snippet = displayText.length > 350 
    ? displayText.substring(0, 350) + '...' 
    : displayText;
  
  // Determine the link to use (prefer internal routing)
  const viewLink = post.slug ? `/c/${post.slug}` : `/c/${post.id}`;
  const isExternalLink = !!post.externallink;
  
  // Prevent click propagation for interactive elements
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* AI Analysis Badges */}
          <div className="flex gap-2">
            {post.is_deep_research ? (
              <div className="relative">
                <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Stars className="h-3 w-3" />
                  DEEP RESEARCH
                </div>
              </div>
            ) : (
              <div className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Zap className="h-3 w-3" />
                AI-ANALYZED
              </div>
            )}
          </div>
          
          {/* Category */}
          {post.category && (
            <Link 
              href={`/categories/${post.category.id}`}
              onClick={handleClick}
              className="text-xs font-medium px-2 py-1 rounded-lg hover:scale-105 transition-transform" 
              style={{ backgroundColor: `${post.category.color}20`, color: post.category.color }}
            >
              {post.category.name || 'Без категория'}
            </Link>
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
      
      {/* Post Image */}
      {post.image && (
        <Link href={viewLink} className="block group">
          <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4 bg-muted">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </Link>
      )}
      
      {/* Post Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date().toLocaleDateString('bg-BG', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
          
          {isExternalLink && (
            <div className="flex items-center gap-1 text-primary">
              <ExternalLink className="h-4 w-4" />
              <span>Външен източник</span>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Link 
            href={viewLink}
            className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            Прочети повече
          </Link>
          
          {isExternalLink && (
            <Link 
              href={post.externallink!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
            >
              Оригинал
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 