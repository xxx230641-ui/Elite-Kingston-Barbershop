import test from 'node:test';
import assert from 'node:assert/strict';
import { SHOP_CONFIG } from '../data/shopConfig';
import {
  filterGallery,
  filterServices,
  getShopStatus,
  parseTimeToMinutes,
  validateHoursDraft,
} from './barbershop';

test('filterServices returns all 10 services for All Services and filters accurately by category', () => {
  assert.equal(SHOP_CONFIG.services.length, 10);
  assert.equal(filterServices(SHOP_CONFIG.services, 'All Services').length, 10);
  assert.equal(filterServices(SHOP_CONFIG.services, 'Haircuts & Fades').length, 4);
  assert.equal(filterServices(SHOP_CONFIG.services, 'Beard & Shave').length, 3);
  assert.equal(filterServices(SHOP_CONFIG.services, 'Treatments & Styling').length, 3);
});

test('no service invents pricing and all use Call us for current pricing', () => {
  for (const service of SHOP_CONFIG.services) {
    assert.equal(service.pricingNote, 'Call us for current pricing');
    assert.equal(/\$\d+/.test(service.description), false);
  }
});

test('filterGallery supports every requested category', () => {
  assert.equal(filterGallery(SHOP_CONFIG.gallery, 'All').length, SHOP_CONFIG.gallery.length);
  assert.ok(filterGallery(SHOP_CONFIG.gallery, 'Modern Haircuts').length >= 1);
  assert.ok(filterGallery(SHOP_CONFIG.gallery, 'Skin Fades').length >= 1);
  assert.ok(filterGallery(SHOP_CONFIG.gallery, 'Taper Fades').length >= 1);
  assert.ok(filterGallery(SHOP_CONFIG.gallery, 'Beard Styles').length >= 1);
  assert.ok(filterGallery(SHOP_CONFIG.gallery, 'Shop Interior').length >= 1);
});

test('parseTimeToMinutes converts 12-hour strings correctly', () => {
  assert.equal(parseTimeToMinutes('9:00 AM'), 9 * 60);
  assert.equal(parseTimeToMinutes('5:30 PM'), 17 * 60 + 30);
  assert.equal(parseTimeToMinutes('6:00 PM'), 18 * 60);
  assert.equal(parseTimeToMinutes('invalid'), null);
});

test('getShopStatus detects open weekday, Saturday half-hour close, and closed Sunday', () => {
  // Monday at 11:15 AM
  const mondayOpen = new Date(2026, 10, 16, 11, 15, 0);
  const monStatus = getShopStatus(SHOP_CONFIG.defaultHours, mondayOpen);
  assert.equal(monStatus.todayName, 'Monday');
  assert.equal(monStatus.isOpenNow, true);

  // Saturday at 5:45 PM (after 5:30 PM close)
  const saturdayAfter = new Date(2026, 10, 21, 17, 45, 0);
  const satStatus = getShopStatus(SHOP_CONFIG.defaultHours, saturdayAfter);
  assert.equal(satStatus.todayName, 'Saturday');
  assert.equal(satStatus.isOpenNow, false);

  // Sunday closed
  const sunday = new Date(2026, 10, 22, 12, 0, 0);
  const sunStatus = getShopStatus(SHOP_CONFIG.defaultHours, sunday);
  assert.equal(sunStatus.todayName, 'Sunday');
  assert.equal(sunStatus.isOpenNow, false);
  assert.equal(sunStatus.statusLabel, 'Closed Today');
});

test('validateHoursDraft catches empty open hours and normalizes closed days', () => {
  const invalidDraft = SHOP_CONFIG.defaultHours.map((entry) =>
    entry.day === 'Monday' ? { ...entry, isOpen: true, hours: '   ' } : entry
  );
  const invalidResult = validateHoursDraft(invalidDraft);
  assert.equal(invalidResult.valid, false);
  assert.match(invalidResult.error ?? '', /Monday/);

  const validDraft = SHOP_CONFIG.defaultHours.map((entry) =>
    entry.day === 'Sunday' ? { ...entry, isOpen: false, hours: '10:00 AM - 2:00 PM' } : entry
  );
  const validResult = validateHoursDraft(validDraft);
  assert.equal(validResult.valid, true);
  assert.equal(validResult.normalized.find((d) => d.day === 'Sunday')?.hours, 'Closed');
});
