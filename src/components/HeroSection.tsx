import React from 'react';
import { ArrowDownRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { OpeningHourEntry, SHOP_CONFIG } from '../data/shopConfig';
import { getShopStatus } from '../utils/barbershop';
import { MediaImage } from './MediaImage';

interface HeroSectionProps {
  hours: OpeningHourEntry[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hours }) => {
  const status = getShopStatus(hours);

  return (
    <section
      id="home"
      className="relative bg-white border-b border-[#e2e7ed]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Editorial Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#64707d] mb-5">
                {SHOP_CONFIG.hero.kicker}
              </p>

              <h1
                className="font-display font-semibold tracking-tight text-[#111315] leading-[1.08]"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                  textWrap: 'balance',
                }}
              >
                {SHOP_CONFIG.hero.headline}
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
                {SHOP_CONFIG.hero.description}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#e2e7ed]">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#visit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium bg-[#111315] text-white hover:bg-[#272c32] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]"
                >
                  <span>{SHOP_CONFIG.hero.primaryCta}</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={SHOP_CONFIG.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium border border-[#cbd5e1] bg-[#f8fafc] text-[#111315] hover:border-[#94a3b8] hover:bg-[#f1f5f9] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]"
                >
                  <Phone className="w-4 h-4 text-[#475569]" aria-hidden="true" />
                  <span>{SHOP_CONFIG.hero.secondaryCta}</span>
                </a>
              </div>
              <p className="mt-4 text-xs text-[#64707d]">
                {SHOP_CONFIG.contact.walkInNote} · {SHOP_CONFIG.contact.phoneDisplay}
              </p>
            </div>
          </motion.div>

          {/* Hero Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] border border-[#d9dfe6] bg-[#f4f6f8] overflow-hidden">
              <MediaImage
                src={SHOP_CONFIG.hero.image}
                alt={SHOP_CONFIG.hero.imageAlt}
                loading="eager"
                fallbackTitle={SHOP_CONFIG.brand.name}
                className="w-full h-full object-cover object-center lg:h-full"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/95">
                <span className="font-medium">{SHOP_CONFIG.brand.category}</span>
                <span className="font-mono-tabular text-white/85">Kingston, ON</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Quick Visit Strip Below Hero Split */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#e2e7ed] bg-[#f8f9fb] divide-y sm:divide-y-0 sm:divide-x divide-[#e2e7ed]">
          <div className="p-5">
            <p className="text-xs font-medium text-[#64707d]">Location</p>
            <p className="mt-1.5 text-sm font-semibold text-[#111315]">
              {SHOP_CONFIG.contact.addressLine1}
            </p>
            <p className="text-xs text-[#64707d] mt-0.5">Kingston, ON K7L 3M8</p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-[#64707d]">Phone &amp; Text</p>
            <a
              href={SHOP_CONFIG.contact.phoneHref}
              className="mt-1.5 inline-block font-mono-tabular text-sm font-semibold text-[#111315] hover:underline"
            >
              {SHOP_CONFIG.contact.phoneDisplay}
            </a>
            <p className="text-xs text-[#64707d] mt-0.5">Call for pricing &amp; availability</p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-[#64707d]">Today ({status.todayName})</p>
            <p className="mt-1.5 font-mono-tabular text-sm font-semibold text-[#111315]">
              {status.todayHours}
            </p>
            <p className="text-xs text-[#64707d] mt-0.5">{status.statusLabel}</p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-[#64707d]">Visit Policy</p>
            <p className="mt-1.5 text-sm font-semibold text-[#111315]">Walk-Ins Welcome</p>
            <a
              href={SHOP_CONFIG.contact.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#475569] underline underline-offset-2 hover:text-[#111315] mt-0.5 inline-block"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
