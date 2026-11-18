import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { GalleryCategory, SHOP_CONFIG } from '../data/shopConfig';
import { filterGallery } from '../utils/barbershop';
import { MediaImage } from './MediaImage';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Modern Haircuts',
  'Skin Fades',
  'Taper Fades',
  'Beard Styles',
  'Shop Interior',
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () => filterGallery(SHOP_CONFIG.gallery, activeCategory),
    [activeCategory]
  );

  const activeItem =
    selectedIndex !== null && visibleItems[selectedIndex]
      ? visibleItems[selectedIndex]
      : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, visibleItems.length]);

  const handleSelectCategory = (category: GalleryCategory) => {
    setActiveCategory(category);
    setSelectedIndex(null);
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-white border-b border-[#e2e7ed] py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-10 border-b border-[#e2e7ed]">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-wide text-[#64707d]">
              {SHOP_CONFIG.gallerySection.eyebrow}
            </p>
            <h2
              id="gallery-heading"
              className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111315]"
              style={{ textWrap: 'balance' }}
            >
              {SHOP_CONFIG.gallerySection.heading}
            </h2>
            <p className="mt-4 text-base text-[#475569] leading-relaxed">
              {SHOP_CONFIG.gallerySection.subheading}
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter gallery by style category"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#f4f6f8] border border-[#d9dfe6] self-start xl:self-end shrink-0"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  aria-pressed={isActive}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315] ${
                    isActive
                      ? 'bg-white text-[#111315] shadow-xs'
                      : 'text-[#475569] hover:text-[#111315]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Gallery Grid */}
        <div
          data-testid="gallery-grid"
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleItems.map((item, index) => {
            const isFeatured =
              item.aspect === 'landscape' &&
              activeCategory === 'All' &&
              index === 0;

            return (
              <div
                key={item.id}
                className={`group border border-[#d9dfe6] bg-[#f8f9fb] overflow-hidden flex flex-col ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`View ${item.title} in full size`}
                  className="relative w-full text-left overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]"
                >
                  <div
                    className={`w-full overflow-hidden bg-[#eef1f5] ${
                      isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <MediaImage
                      src={item.image}
                      alt={item.imageAlt}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 border border-[#d9dfe6] flex items-center justify-center text-[#111315] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </button>

                <div className="p-5 bg-white border-t border-[#e2e7ed] flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#64707d]">{item.category}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-[#111315]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#475569]">{item.caption}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Dialog */}
      {activeItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white border border-[#d9dfe6] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e2e7ed]">
              <div>
                <p className="text-xs text-[#64707d]">{activeItem.category}</p>
                <h3 className="font-display text-lg font-semibold text-[#111315]">
                  {activeItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close gallery preview"
                className="w-10 h-10 inline-flex items-center justify-center border border-[#d9dfe6] text-[#111315] hover:bg-[#f4f6f8] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#f4f6f8] max-h-[70vh] overflow-hidden flex items-center justify-center">
              <MediaImage
                src={activeItem.image}
                alt={activeItem.imageAlt}
                fallbackTitle={activeItem.title}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            <div className="px-5 py-4 border-t border-[#e2e7ed] flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-[#475569]">{activeItem.caption}</p>
              {visibleItems.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex - 1 + visibleItems.length) %
                          visibleItems.length
                      )
                    }
                    aria-label="Previous gallery photo"
                    className="w-10 h-10 inline-flex items-center justify-center border border-[#d9dfe6] text-[#111315] hover:bg-[#f4f6f8] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono-tabular text-xs text-[#64707d] px-2">
                    {selectedIndex + 1} / {visibleItems.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((selectedIndex + 1) % visibleItems.length)
                    }
                    aria-label="Next gallery photo"
                    className="w-10 h-10 inline-flex items-center justify-center border border-[#d9dfe6] text-[#111315] hover:bg-[#f4f6f8] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
