'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
}

const FALLBACK_IMAGE = '/images/slider/traditional5.jpg';

const OptimizedImage = ({
  src,
  alt,
  priority = false,
  fallbackSrc = FALLBACK_IMAGE,
  className = '',
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    console.warn(`Failed to load image: ${src}, using fallback`);
    setIsLoading(false);
    setError(true);
  };
  
  return (
    <div className="relative overflow-hidden w-full h-full">
      {isLoading && !priority && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ backgroundColor: '#f3f4f6' }}
        />
      )}
      
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        priority={priority}
        className={`
          transition-opacity duration-500 ease-in-out
          ${isLoading && !priority ? 'opacity-0' : 'opacity-100'}
          ${className}
        `}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;