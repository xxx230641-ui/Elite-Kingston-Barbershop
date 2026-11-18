import React, { useState } from 'react';
import { Scissors } from 'lucide-react';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'eager',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`silver-sheen flex flex-col items-center justify-center p-6 text-center text-[#64707d] ${className}`}
        role="img"
        aria-label={alt}
      >
        <Scissors className="w-7 h-7 mb-2 text-[#9aa4b0]" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide text-[#475569]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
