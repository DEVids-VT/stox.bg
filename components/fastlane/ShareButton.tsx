'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ShareButtonProps = {
  url: string;
  title: string;
};

export function ShareButton({ url, title }: ShareButtonProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Ensure we have the full URL (for client-side sharing)
  const getFullUrl = () => {
    if (typeof window === 'undefined') return url;
    return url.startsWith('http') ? url : `${window.location.origin}${url}`;
  };
  
  // Share handlers
  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getFullUrl())}`, '_blank');
  };
  
  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getFullUrl())}`, '_blank');
  };
  
  const handleLinkedinShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getFullUrl())}`, '_blank');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(getFullUrl());
    alert('Линкът е копиран!');
  };
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setShowShareOptions(!showShareOptions)}
        aria-label="Сподели"
      >
        <Share2 className="h-4 w-4 mr-1" />
        Сподели
      </Button>
      
      {showShareOptions && (
        <div className="absolute z-10 mt-2 left-0 bg-card border border-border rounded-md shadow-md p-2 flex flex-col gap-2">
          <div className="flex justify-between items-center border-b border-border pb-1 mb-1">
            <span className="text-xs font-medium">Сподели</span>
            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setShowShareOptions(false)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="justify-start" onClick={handleFacebookShare}>
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          
          <Button variant="ghost" size="sm" className="justify-start" onClick={handleTwitterShare}>
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          
          <Button variant="ghost" size="sm" className="justify-start" onClick={handleLinkedinShare}>
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
          
          <Button variant="ghost" size="sm" className="justify-start" onClick={handleCopyLink}>
            <Link2 className="h-4 w-4 mr-2" />
            Копирай линк
          </Button>
        </div>
      )}
    </div>
  );
} 