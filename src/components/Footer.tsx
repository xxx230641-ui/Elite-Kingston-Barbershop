import React from 'react';
import { OpeningHourEntry, SHOP_CONFIG } from '../data/shopConfig';
import { BrandMark } from './BrandMark';

interface FooterProps {
  hours: OpeningHourEntry[];
}

export const Footer: React.FC<FooterProps> = ({ hours }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8f9fb] text-[#111315]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <BrandMark className="w-9 h-9 text-[#111315] shrink-0" />
              <div>
                <p className="font-display text-lg font-semibold text-[#111315]">
                  {SHOP_CONFIG.brand.name}
                </p>
                <p className="text-xs text-[#64707d]">
                  {SHOP_CONFIG.brand.category}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#475569] leading-relaxed max-w-sm">
              Precision men&apos;s haircuts, clean fades, beard care, and hot towel shaves in Kingston, Ontario.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-wide text-[#64707d]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#home" className="text-[#475569] hover:text-[#111315] transition-colors">
                  Home
                </a>
              </li>
              {SHOP_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#475569] hover:text-[#111315] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#64707d]">
              Visit &amp; Contact
            </h3>
            <address className="mt-4 not-italic space-y-2.5 text-sm text-[#475569]">
              <p className="text-[#111315] font-medium">
                {SHOP_CONFIG.contact.addressLine1}
              </p>
              <p>{SHOP_CONFIG.contact.addressLine2}</p>
              <p>
                <a
                  href={SHOP_CONFIG.contact.phoneHref}
                  className="font-mono-tabular font-medium text-[#111315] hover:underline"
                >
                  {SHOP_CONFIG.contact.phoneDisplay}
                </a>
              </p>
              <p className="text-xs text-[#64707d]">
                {SHOP_CONFIG.contact.walkInNote}
              </p>
            </address>
          </div>

          {/* Hours Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#64707d]">
              Opening Hours
            </h3>
            <dl className="mt-4 space-y-1.5 text-xs text-[#475569]">
              {hours.map((entry) => (
                <div
                  key={entry.day}
                  className="flex items-center justify-between gap-3"
                >
                  <dt>{entry.day}</dt>
                  <dd className="font-mono-tabular text-[#111315]">
                    {entry.isOpen ? entry.hours : 'Closed'}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#d9dfe6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#64707d]">
          <p>
            © {currentYear} {SHOP_CONFIG.brand.name}. All rights reserved.
          </p>
          <p>{SHOP_CONFIG.contact.fullAddress}</p>
        </div>
      </div>
    </footer>
  );
};
