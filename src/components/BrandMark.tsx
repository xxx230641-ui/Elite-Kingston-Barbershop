import React from 'react';

interface BrandMarkProps {
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="1"
        stroke="#9AA4B0"
        strokeWidth="1"
      />
      <path
        d="M21 20L43 44M43 20L21 44"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="20" cy="45" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="44" cy="45" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M32 13V23"
        stroke="#9AA4B0"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
};
