import React, { useState } from 'react';
import {
  Check,
  Clock,
  Edit3,
  ExternalLink,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
} from 'lucide-react';
import { OpeningHourEntry, SHOP_CONFIG } from '../data/shopConfig';
import { getShopStatus, validateHoursDraft } from '../utils/barbershop';
import { ShopMap } from './ShopMap';

interface VisitContactSectionProps {
  hours: OpeningHourEntry[];
  onSaveHours: (updated: OpeningHourEntry[]) => void;
  onResetHours: () => void;
}

export const VisitContactSection: React.FC<VisitContactSectionProps> = ({
  hours,
  onSaveHours,
  onResetHours,
}) => {
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [draftHours, setDraftHours] = useState<OpeningHourEntry[]>(hours);
  const [hoursError, setHoursError] = useState<string | null>(null);
  const [hoursSavedNotice, setHoursSavedNotice] = useState(false);

  const status = getShopStatus(hours);

  const startEditing = () => {
    setDraftHours(hours.map((item) => ({ ...item })));
    setHoursError(null);
    setHoursSavedNotice(false);
    setIsEditingHours(true);
  };

  const cancelEditing = () => {
    setIsEditingHours(false);
    setHoursError(null);
  };

  const handleToggleDayOpen = (index: number) => {
    setDraftHours((prev) =>
      prev.map((entry, idx) =>
        idx === index
          ? {
              ...entry,
              isOpen: !entry.isOpen,
              hours:
                !entry.isOpen && entry.hours === 'Closed'
                  ? '9:00 AM – 6:00 PM'
                  : entry.isOpen
                    ? 'Closed'
                    : entry.hours,
            }
          : entry
      )
    );
  };

  const handleHoursTextChange = (index: number, value: string) => {
    setDraftHours((prev) =>
      prev.map((entry, idx) =>
        idx === index ? { ...entry, hours: value } : entry
      )
    );
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateHoursDraft(draftHours);
    if (!validation.valid) {
      setHoursError(validation.error || 'Please review the opening hours.');
      return;
    }
    onSaveHours(validation.normalized);
    setIsEditingHours(false);
    setHoursError(null);
    setHoursSavedNotice(true);
  };

  const handleReset = () => {
    onResetHours();
    setDraftHours(SHOP_CONFIG.defaultHours.map((item) => ({ ...item })));
    setIsEditingHours(false);
    setHoursError(null);
    setHoursSavedNotice(true);
  };

  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="bg-white border-b border-[#e2e7ed] py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-2xl pb-10 border-b border-[#e2e7ed]">
          <p className="text-xs font-medium tracking-wide text-[#64707d]">
            {SHOP_CONFIG.visitSection.eyebrow}
          </p>
          <h2
            id="visit-heading"
            className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111315]"
            style={{ textWrap: 'balance' }}
          >
            {SHOP_CONFIG.visitSection.heading}
          </h2>
          <p className="mt-4 text-base text-[#475569] leading-relaxed">
            {SHOP_CONFIG.visitSection.subheading}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Info, Actions & Editable Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Business Identity & Direct Actions Card */}
            <div className="border border-[#d9dfe6] bg-[#f8f9fb] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#111315]">
                    {SHOP_CONFIG.brand.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#64707d]">
                    {SHOP_CONFIG.brand.category} · {SHOP_CONFIG.contact.walkInNote}
                  </p>
                </div>
              </div>

              <dl className="mt-6 space-y-4 border-t border-[#e2e7ed] pt-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 text-[#64707d] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="sr-only">Address</dt>
                    <dd className="font-medium text-[#111315]">
                      {SHOP_CONFIG.contact.fullAddress}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    className="w-4 h-4 text-[#64707d] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="sr-only">Phone</dt>
                    <dd>
                      <a
                        href={SHOP_CONFIG.contact.phoneHref}
                        className="font-mono-tabular font-semibold text-[#111315] hover:underline"
                      >
                        {SHOP_CONFIG.contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Walk-Ins Welcome Highlight */}
              <div className="mt-6 p-4 bg-white border border-[#d9dfe6]">
                <p className="text-sm font-semibold text-[#111315]">
                  Walk-Ins Are Always Welcome
                </p>
                <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                  Stop by our Division Street shop anytime during business hours, or call or text ahead to check current chair availability and pricing.
                </p>
              </div>

              {/* Action Buttons: Call, Text, Directions */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={SHOP_CONFIG.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#111315] text-white hover:bg-[#272c32] transition-colors duration-150 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Call Now</span>
                </a>

                <a
                  href={SHOP_CONFIG.contact.smsHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#cbd5e1] bg-white text-[#111315] hover:bg-[#f1f5f9] transition-colors duration-150 whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-[#475569]" aria-hidden="true" />
                  <span>Send Text Message</span>
                </a>

                <a
                  href={SHOP_CONFIG.contact.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#cbd5e1] bg-white text-[#111315] hover:bg-[#f1f5f9] transition-colors duration-150 whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4 text-[#475569]" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Card (Editable by Owner) */}
            <div className="border border-[#d9dfe6] bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e2e7ed]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#64707d]" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold text-[#111315]">
                    Opening Hours
                  </h3>
                </div>

                {!isEditingHours && (
                  <button
                    type="button"
                    onClick={startEditing}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#d9dfe6] text-[#475569] hover:text-[#111315] hover:border-[#94a3b8] transition-colors duration-150 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Edit Hours</span>
                  </button>
                )}
              </div>

              <p className="mt-3 text-xs text-[#64707d]">
                Current status ({status.todayName}):{' '}
                <span className="font-medium text-[#111315]">
                  {status.statusLabel}
                </span>
              </p>

              {hoursSavedNotice && !isEditingHours && (
                <p
                  role="status"
                  className="mt-3 text-xs font-medium text-[#111315] bg-[#f4f6f8] border border-[#d9dfe6] px-3 py-2"
                >
                  Opening hours updated for this browser.
                </p>
              )}

              {!isEditingHours ? (
                <dl className="mt-4 divide-y divide-[#eef1f5] text-sm">
                  {hours.map((entry) => {
                    const isToday = entry.day === status.todayName;
                    return (
                      <div
                        key={entry.day}
                        className={`py-2.5 flex items-center justify-between gap-4 ${
                          isToday ? 'font-semibold text-[#111315]' : 'text-[#475569]'
                        }`}
                      >
                        <dt>
                          {entry.day}
                          {isToday && (
                            <span className="ml-2 text-xs font-normal text-[#64707d]">
                              (Today)
                            </span>
                          )}
                        </dt>
                        <dd className="font-mono-tabular text-right">
                          {entry.isOpen ? entry.hours : 'Closed'}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              ) : (
                <form onSubmit={handleSave} className="mt-4 space-y-3">
                  <p className="text-xs text-[#475569]">
                    Confirm or adjust store hours below. Changes save directly in your browser.
                  </p>

                  {hoursError && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-3 py-2"
                    >
                      {hoursError}
                    </p>
                  )}

                  <div className="divide-y divide-[#eef1f5]">
                    {draftHours.map((entry, idx) => (
                      <div
                        key={entry.day}
                        className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="flex items-center justify-between sm:justify-start gap-3">
                          <label
                            htmlFor={`hours-input-${entry.day}`}
                            className="text-sm font-medium text-[#111315] w-24"
                          >
                            {entry.day}
                          </label>
                          <button
                            type="button"
                            onClick={() => handleToggleDayOpen(idx)}
                            aria-pressed={entry.isOpen}
                            className={`px-2.5 py-1 text-xs font-medium border cursor-pointer ${
                              entry.isOpen
                                ? 'bg-[#111315] text-white border-[#111315]'
                                : 'bg-[#f4f6f8] text-[#475569] border-[#d9dfe6]'
                            }`}
                          >
                            {entry.isOpen ? 'Open' : 'Closed'}
                          </button>
                        </div>

                        <input
                          id={`hours-input-${entry.day}`}
                          type="text"
                          value={entry.isOpen ? entry.hours : 'Closed'}
                          disabled={!entry.isOpen}
                          onChange={(e) =>
                            handleHoursTextChange(idx, e.target.value)
                          }
                          aria-label={`${entry.day} hours`}
                          className="w-full sm:w-44 px-2.5 py-1.5 text-xs font-mono-tabular border border-[#cbd5e1] bg-white text-[#111315] disabled:bg-[#f4f6f8] disabled:text-[#64707d] focus:outline-2 focus:outline-[#111315]"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#111315] text-white hover:bg-[#272c32] cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Save Hours</span>
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="px-4 py-2 text-xs font-medium border border-[#cbd5e1] text-[#111315] hover:bg-[#f4f6f8] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="ml-auto inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#64707d] hover:text-[#111315] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Reset Default</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Google Map */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <ShopMap />
            <div className="mt-3 p-4 border border-[#e2e7ed] bg-[#f8f9fb] flex flex-wrap items-center justify-between gap-3 text-xs text-[#475569]">
              <span>
                Located at <strong className="font-semibold text-[#111315]">172 Division St, Kingston</strong> near Princess St &amp; Queen&apos;s University.
              </span>
              <a
                href={SHOP_CONFIG.contact.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#111315] underline underline-offset-2 hover:text-[#475569] whitespace-nowrap"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
