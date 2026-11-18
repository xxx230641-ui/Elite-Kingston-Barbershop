import React from 'react';
import { Phone } from 'lucide-react';
import { SHOP_CONFIG } from '../data/shopConfig';

export const WhyChooseSection: React.FC = () => {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="bg-[#f8f9fb] border-b border-[#e2e7ed] py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Editorial Question Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="text-xs font-medium tracking-wide text-[#64707d]">
              {SHOP_CONFIG.whyChooseSection.eyebrow}
            </p>
            <h2
              id="why-us-heading"
              className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111315] leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {SHOP_CONFIG.whyChooseSection.question}
            </h2>
            <p className="mt-5 text-base text-[#475569] leading-relaxed">
              {SHOP_CONFIG.whyChooseSection.subheading}
            </p>

            <div className="mt-8 pt-6 border-t border-[#d9dfe6] flex flex-wrap items-center gap-4">
              <a
                href="#visit"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium bg-[#111315] text-white hover:bg-[#272c32] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                Visit 172 Division St
              </a>
              <a
                href={SHOP_CONFIG.contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium border border-[#cbd5e1] bg-white text-[#111315] hover:bg-[#f1f5f9] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#475569]" aria-hidden="true" />
                <span>{SHOP_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* 5 Pillars Editorial List */}
          <div className="lg:col-span-7 bg-white border border-[#d9dfe6] divide-y divide-[#e2e7ed]">
            {SHOP_CONFIG.whyChooseSection.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
              >
                <span className="font-mono-tabular text-sm font-medium text-[#64707d] shrink-0 pt-0.5">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#111315]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#475569] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
