import {
  BarbershopService,
  DayOfWeek,
  GalleryCategory,
  GalleryItem,
  OpeningHourEntry,
  ServiceCategory,
} from '../data/shopConfig';

const JS_DAY_TO_NAME: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function filterServices(
  services: BarbershopService[],
  category: ServiceCategory
): BarbershopService[] {
  if (category === 'All Services') {
    return services;
  }
  return services.filter((service) => service.category === category);
}

export function filterGallery(
  items: GalleryItem[],
  category: GalleryCategory
): GalleryItem[] {
  if (category === 'All') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

/**
 * Parses a time expression like "9:00 AM" or "5:30 PM" into minutes since midnight.
 */
export function parseTimeToMinutes(raw: string): number | null {
  const match = raw.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
    return null;
  }
  if (period === 'AM') {
    if (hours === 12) hours = 0;
  } else if (period === 'PM') {
    if (hours !== 12) hours += 12;
  }
  return hours * 60 + minutes;
}

/**
 * Evaluates whether the shop is currently open based on the provided schedule and local date.
 */
export function getShopStatus(
  schedule: OpeningHourEntry[],
  now: Date = new Date()
): {
  todayName: DayOfWeek;
  todayHours: string;
  isOpenNow: boolean;
  statusLabel: string;
} {
  const todayName = JS_DAY_TO_NAME[now.getDay()];
  const entry = schedule.find((item) => item.day === todayName);

  if (!entry || !entry.isOpen || entry.hours.trim().toLowerCase() === 'closed') {
    return {
      todayName,
      todayHours: entry?.hours || 'Closed',
      isOpenNow: false,
      statusLabel: 'Closed Today',
    };
  }

  const parts = entry.hours.split(/[–-]/).map((s) => s.trim());
  if (parts.length !== 2) {
    return {
      todayName,
      todayHours: entry.hours,
      isOpenNow: true,
      statusLabel: `Open Today · ${entry.hours}`,
    };
  }

  const openMinutes = parseTimeToMinutes(parts[0]);
  const closeMinutes = parseTimeToMinutes(parts[1]);

  if (openMinutes === null || closeMinutes === null) {
    return {
      todayName,
      todayHours: entry.hours,
      isOpenNow: true,
      statusLabel: `Open Today · ${entry.hours}`,
    };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isOpenNow = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    todayName,
    todayHours: entry.hours,
    isOpenNow,
    statusLabel: isOpenNow
      ? `Open Now · Closes ${parts[1]}`
      : currentMinutes < openMinutes
        ? `Opens at ${parts[0]}`
        : `Closed · Opens ${parts[0]} next open day`,
  };
}

/**
 * Validates and normalizes owner-edited hours before saving.
 */
export function validateHoursDraft(
  draft: OpeningHourEntry[]
): { valid: boolean; error?: string; normalized: OpeningHourEntry[] } {
  const normalized: OpeningHourEntry[] = [];

  for (const entry of draft) {
    const trimmed = entry.hours.trim();
    if (entry.isOpen) {
      if (!trimmed || trimmed.toLowerCase() === 'closed') {
        return {
          valid: false,
          error: `Please enter opening hours for ${entry.day} or mark it Closed.`,
          normalized: draft,
        };
      }
      normalized.push({ ...entry, hours: trimmed });
    } else {
      normalized.push({ ...entry, isOpen: false, hours: 'Closed' });
    }
  }

  return { valid: true, normalized };
}
