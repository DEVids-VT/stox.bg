'use client';

import { useEffect, useState, useCallback } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import { PostCard } from './PostCard';

export type Post = {
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

type InfiniteScrollLoaderProps = {
  initialPosts: Post[];
  categoryId?: number;
};

export function InfiniteScrollLoader({ initialPosts, categoryId }: InfiniteScrollLoaderProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [lastId, setLastId] = useState<number | null>(
    initialPosts.length > 0 ? initialPosts[initialPosts.length - 1].id : null
  );
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  
  const loadMorePosts = useCallback(async () => {
    if (loading || allLoaded || !lastId) return;
    
    setLoading(true);
    const supabase = createSupabaseClient();
    
    // Start building the query for posts
    let query = supabase
      .from('posts')
      .select(`id, title, short_content, description, image, slug, externallink, category, is_deep_research`)
      .eq('isdeleted', false)
      .lt('id', lastId) // Load posts with ID less than the last loaded post
      .order('id', { ascending: false })
      .limit(5);
      
    // Add category filter if provided
    if (categoryId !== undefined) {
      query = query.eq('category', categoryId);
    }
    
    // Execute the query
    const { data: postsData, error: postsError } = await query;
    
    if (postsError) {
      console.error('Error loading more posts:', postsError);
      setLoading(false);
      return;
    }
    
    if (!postsData || postsData.length === 0) {
      setAllLoaded(true);
      setLoading(false);
      return;
    }
    
    // Fetch categories for the new posts
    const categoriesMap = new Map();
    
    if (categoryId !== undefined) {
      // If filtering by category, we already know the category
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id, name, color')
        .eq('id', categoryId)
        .single();
        
      if (categoryData) {
        categoriesMap.set(categoryId, categoryData);
      }
    } else {
      // Get all unique category IDs from the posts
      const categoryIds = [...new Set(postsData.map(post => post.category).filter(Boolean))];
      
      if (categoryIds.length > 0) {
        // Fetch all categories at once
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('id, name, color')
          .in('id', categoryIds);
          
        if (categoriesData) {
          categoriesData.forEach(category => {
            categoriesMap.set(category.id, {
              id: category.id,
              name: category.name,
              color: category.color
            });
          });
        }
      }
    }
    
    // Transform the data to match the Post type
    const newPosts: Post[] = postsData.map(post => {
      // Get category data from the map using the category ID
      const categoryData = post.category && categoriesMap.has(post.category)
        ? categoriesMap.get(post.category)
        : { id: categoryId || 0, name: 'Без категория', color: '#e5e5e5' };
      
      return {
        id: post.id,
        title: post.title,
        short_content: post.short_content,
        description: post.description,
        image: post.image,
        slug: post.slug,
        externallink: post.externallink,
        is_deep_research: post.is_deep_research || false,
        category: categoryData
      };
    });
    
    setPosts(prev => [...prev, ...newPosts]);
    setLastId(newPosts[newPosts.length - 1].id);
    setLoading(false);
  }, [loading, allLoaded, lastId, categoryId]);
  
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom of the page
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && 
        !loading && 
        !allLoaded
      ) {
        loadMorePosts();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, allLoaded, loadMorePosts]);
  
  return (
    <div className="w-full">
      {/* Single column feed */}
      <div className="space-y-0">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center my-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
            <span className="text-sm">Зареждане на още публикации...</span>
          </div>
        </div>
      )}
      
      {/* End of content message */}
      {allLoaded && posts.length > initialPosts.length && (
        <div className="text-center text-muted-foreground my-10 p-6 bg-card border border-border rounded-2xl">
          <div className="text-lg font-medium mb-2">🎉 Това е всичко за сега!</div>
          <p className="text-sm">Всички публикации са заредени. Елате пак по-късно за нови анализи.</p>
        </div>
      )}
    </div>
  );
} 