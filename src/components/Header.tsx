import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SHOP_CONFIG } from '../data/shopConfig';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e7ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#111315] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111315]"
        >
          {SHOP_CONFIG.brand.name}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]"
        >
          {SHOP_CONFIG.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#111315] transition-colors duration-150 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#111315] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111315]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#visit"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-[#111315] text-white hover:bg-[#272c32] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]"
          >
            {SHOP_CONFIG.hero.primaryCta}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[#d9dfe6] text-[#111315] hover:bg-[#f4f6f8] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#e2e7ed] bg-white px-4 py-4 space-y-1"
        >
          {SHOP_CONFIG.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="block py-3 px-2 text-base font-medium text-[#111315] border-b border-[#f1f4f7] hover:bg-[#f8fafc]"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a
              href="#visit"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center py-3 px-4 text-sm font-medium bg-[#111315] text-white"
            >
              {SHOP_CONFIG.hero.primaryCta}
            </a>
            <a
              href={SHOP_CONFIG.contact.phoneHref}
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center py-3 px-4 text-sm font-medium border border-[#cbd5e1] text-[#111315]"
            >
              Call {SHOP_CONFIG.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
