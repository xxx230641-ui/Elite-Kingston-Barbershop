/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { VisitContactSection } from './components/VisitContactSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { OpeningHourEntry, SHOP_CONFIG } from './data/shopConfig';

const HOURS_STORAGE_KEY = 'elite_kingston_opening_hours_v1';

function loadStoredHours(): OpeningHourEntry[] {
  try {
    const raw = window.localStorage.getItem(HOURS_STORAGE_KEY);
    if (!raw) return SHOP_CONFIG.defaultHours;
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.length === 7) {
      return parsed as OpeningHourEntry[];
    }
  } catch {
    // Fallback to default hours if storage is unavailable
  }
  return SHOP_CONFIG.defaultHours;
}

export default function App() {
  const [hours, setHours] = useState<OpeningHourEntry[]>(() =>
    loadStoredHours()
  );
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const handleSaveHours = (updated: OpeningHourEntry[]) => {
    setHours(updated);
    try {
      window.localStorage.setItem(HOURS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Non-fatal if storage quota is restricted
    }
  };

  const handleResetHours = () => {
    setHours(SHOP_CONFIG.defaultHours);
    try {
      window.localStorage.removeItem(HOURS_STORAGE_KEY);
    } catch {
      // Non-fatal
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111315]">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Header />

      <main className="flex-1">
        <HeroSection hours={hours} />
        <ServicesSection />
        <GallerySection />
        <WhyChooseSection />
        <VisitContactSection
          hours={hours}
          onSaveHours={handleSaveHours}
          onResetHours={handleResetHours}
        />
      </main>

      <Footer hours={hours} />
    </div>
  );
}
