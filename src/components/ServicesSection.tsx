import React, { useMemo, useState } from 'react';
import { Phone } from 'lucide-react';
import { ServiceCategory, SHOP_CONFIG } from '../data/shopConfig';
import { filterServices } from '../utils/barbershop';
import { MediaImage } from './MediaImage';

const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All Services',
  'Haircuts & Fades',
  'Beard & Shave',
  'Treatments & Styling',
];

export const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory>('All Services');

  const visibleServices = useMemo(
    () => filterServices(SHOP_CONFIG.services, selectedCategory),
    [selectedCategory]
  );

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#f8f9fb] border-b border-[#e2e7ed] py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-10 border-b border-[#d9dfe6]">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-wide text-[#64707d]">
              {SHOP_CONFIG.servicesSection.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111315]"
              style={{ textWrap: 'balance' }}
            >
              {SHOP_CONFIG.servicesSection.heading}
            </h2>
            <p className="mt-4 text-base text-[#475569] leading-relaxed">
              {SHOP_CONFIG.servicesSection.subheading}
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter grooming services by category"
            className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-[#eaeef3] border border-[#d9dfe6] self-start xl:self-end shrink-0"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315] ${
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

        {/* Services Count & Note */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#64707d]">
          <span className="font-mono-tabular">
            Showing {visibleServices.length} of {SHOP_CONFIG.services.length} services
          </span>
          <span>Walk-ins welcome · Call {SHOP_CONFIG.contact.phoneDisplay} for current rates</span>
        </div>

        {/* Services Grid */}
        <div
          data-testid="services-grid"
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className="group bg-white border border-[#d9dfe6] flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#eef1f5] border-b border-[#e2e7ed]">
                <MediaImage
                  src={service.image}
                  alt={service.imageAlt}
                  fallbackTitle={service.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#64707d]">
                    <span className="font-mono-tabular font-medium text-[#475569]">
                      {service.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{service.category}</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-semibold text-[#111315]">
                    {service.name}
                  </h3>

                  <p className="mt-3 text-sm text-[#475569] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#eef1f5] flex items-center justify-between gap-3">
                  <a
                    href={SHOP_CONFIG.contact.phoneHref}
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#111315] hover:text-[#475569] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#64707d]" aria-hidden="true" />
                    <span>{service.pricingNote}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
