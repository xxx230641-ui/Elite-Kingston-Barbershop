export type ServiceCategory =
  | 'All Services'
  | 'Haircuts & Fades'
  | 'Beard & Shave'
  | 'Treatments & Styling';

export type GalleryCategory =
  | 'All'
  | 'Modern Haircuts'
  | 'Skin Fades'
  | 'Taper Fades'
  | 'Beard Styles'
  | 'Shop Interior';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface OpeningHourEntry {
  day: DayOfWeek;
  isOpen: boolean;
  hours: string;
}

export interface BarbershopService {
  id: string;
  number: string;
  name: string;
  category: Exclude<ServiceCategory, 'All Services'>;
  description: string;
  pricingNote: string;
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  caption: string;
  image: string;
  imageAlt: string;
  aspect: 'landscape' | 'portrait';
}

export interface ValuePillar {
  number: string;
  title: string;
  description: string;
}

/**
 * Centralized shop configuration.
 * All copy, services, gallery media, and default hours can be updated here
 * without touching component layout code.
 */
export const SHOP_CONFIG = {
  brand: {
    name: 'Elite Kingston Barbershop',
    shortMark: 'EKB',
    category: "Premium Men's Barbershop",
    city: 'Kingston, Ontario',
  },
  contact: {
    addressLine1: '172 Division St',
    addressLine2: 'Kingston, ON K7L 3M8, Canada',
    fullAddress: '172 Division St, Kingston, ON K7L 3M8, Canada',
    phoneDisplay: '+1 613-545-7715',
    phoneHref: 'tel:+16135457715',
    smsHref: 'sms:+16135457715',
    googleMapsShareUrl: 'https://maps.app.goo.gl/k6GGQiSpEJjcp3Br8',
    coordinates: {
      lat: 44.2331773,
      lng: -76.4932603,
    },
    walkInNote: 'Walk-ins welcome every open day',
  },
  hero: {
    kicker: '172 Division St · Kingston, Ontario',
    headline: 'YOUR STYLE. YOUR IDENTITY. YOUR BARBER.',
    description:
      'Experience precision grooming at Elite Kingston Barbershop. From clean fades to detailed beard care, we help you look sharp and feel confident.',
    primaryCta: 'Book Your Visit',
    secondaryCta: 'Call Now',
    image: '/src/assets/images/hero_barber_craft_1795015671117.jpg',
    imageAlt:
      'Master barber performing a precision fade haircut inside Elite Kingston Barbershop',
  },
  servicesSection: {
    eyebrow: 'Grooming Menu',
    heading: 'Tailored cuts, sharp fades, and classic care.',
    subheading:
      'Every appointment or walk-in begins with a direct consultation so your cut matches your hair texture, head shape, and routine. Call us for current pricing on any service.',
    pricingCallout: 'Call us for current pricing',
  },
  services: [
    {
      id: 'mens-haircut',
      number: '01',
      name: "Men's Haircut",
      category: 'Haircuts & Fades',
      description:
        'A tailored scissor and clipper cut built around your natural growth pattern, finished with a clean neckline and balanced proportions.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_mens_haircut_1795015672790.jpg',
      imageAlt: "Classic tailored men's scissor haircut at Elite Kingston Barbershop",
    },
    {
      id: 'skin-fade',
      number: '02',
      name: 'Skin Fade',
      category: 'Haircuts & Fades',
      description:
        'Seamless zero-to-length gradient blending with foil detailing and razor-sharp perimeter work for a crisp, modern silhouette.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_skin_fade_1795015672386.jpg',
      imageAlt: 'High-contrast precision skin fade haircut with clean temple lineup',
    },
    {
      id: 'taper-fade',
      number: '03',
      name: 'Taper Fade',
      category: 'Haircuts & Fades',
      description:
        'Subtle, graduated tapering around the temples and nape that keeps clean edges while preserving fuller weight through the sides.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_taper_fade_1795015672073.jpg',
      imageAlt: 'Low taper fade with clean sideburn and hairline detailing',
    },
    {
      id: 'haircut-beard-trim',
      number: '04',
      name: 'Haircut & Beard Trim',
      category: 'Haircuts & Fades',
      description:
        'Complete top-to-jawline grooming combining your signature haircut or fade with symmetrical beard shaping and blended sideburns.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_haircut_beard_1795015673567.jpg',
      imageAlt: 'Sharp tapered haircut paired with a sculpted full beard trim',
    },
    {
      id: 'beard-care',
      number: '05',
      name: 'Beard Care',
      category: 'Beard & Shave',
      description:
        'Precision beard sculpting, cheek and neck line detailing, and conditioning oils designed to keep coarse facial hair soft and well-defined.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_beard_care_1795015674053.jpg',
      imageAlt: 'Barber detailing and shaping a client beard with straight razor and comb',
    },
    {
      id: 'hot-towel-shave',
      number: '06',
      name: 'Hot Towel Shave',
      category: 'Beard & Shave',
      description:
        'A restorative traditional shave using steamed towels, rich warm lather, and calm straight-razor passes for an effortless, irritation-free finish.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_hot_towel_shave_1795015673612.jpg',
      imageAlt: 'Steamed white towel and silver shaving brush prepared for a hot towel shave',
    },
    {
      id: 'head-shave',
      number: '07',
      name: 'Head Shave',
      category: 'Beard & Shave',
      description:
        'Close, even scalp shave paired with warm lather and soothing post-shave hydration for a clean, smooth, polished result.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_head_shave_1795015675234.jpg',
      imageAlt: 'Barber performing a smooth straight-razor head shave with warm lather',
    },
    {
      id: 'hair-wash',
      number: '08',
      name: 'Hair Wash',
      category: 'Treatments & Styling',
      description:
        'Refreshing cleanse and invigorating scalp massage using salon-grade formulas to remove buildup and reset hair before or after your cut.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_hair_wash_1795015675217.jpg',
      imageAlt: 'Relaxing hair wash and scalp rinse at a modern black ceramic basin',
    },
    {
      id: 'facial-steam',
      number: '09',
      name: 'Facial & Steam',
      category: 'Treatments & Styling',
      description:
        'Gentle warm-mist steam and deep facial cleansing that opens pores, relieves tension, and leaves skin balanced and refreshed.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_facial_steam_1795015678129.jpg',
      imageAlt: 'Warm facial steam and refreshing mist treatment in a reclining barber chair',
    },
    {
      id: 'hair-straightening-curling',
      number: '10',
      name: 'Hair Straightening & Curling',
      category: 'Treatments & Styling',
      description:
        'Controlled texture transformation—whether sleek straightening or defined curls—styled with heat protection for lasting shape and movement.',
      pricingNote: 'Call us for current pricing',
      image: '/src/assets/images/service_straightening_curling_1795015678618.jpg',
      imageAlt: 'Barber styling and shaping textured hair in front of a silver-framed mirror',
    },
  ] as BarbershopService[],
  gallerySection: {
    eyebrow: 'Lookbook & Studio',
    heading: 'Precision craft across every chair.',
    subheading:
      'Browse haircut finishes, seamless fades, sculpted beard lines, and the bright, minimalist interior on Division Street.',
  },
  gallery: [
    {
      id: 'gal-interior',
      title: '172 Division St Studio Interior',
      category: 'Shop Interior',
      caption: 'Bright architectural floorplan with silver-framed mirrors and black leather chairs.',
      image: '/src/assets/images/gallery_shop_interior_clean_1795015702441.jpg',
      imageAlt: 'Bright modern interior of a white and silver luxury barbershop',
      aspect: 'landscape',
    },
    {
      id: 'gal-skin-fade',
      title: 'Razor-Clean High Skin Fade',
      category: 'Skin Fades',
      caption: 'Zero-gap foil transition with crisp temple geometry.',
      image: '/src/assets/images/service_skin_fade_1795015672386.jpg',
      imageAlt: 'Precision skin fade haircut side profile',
      aspect: 'portrait',
    },
    {
      id: 'gal-modern-cut',
      title: 'Tailored Side-Part Scissor Cut',
      category: 'Modern Haircuts',
      caption: 'Natural crown volume paired with a clean tapered back.',
      image: '/src/assets/images/service_mens_haircut_1795015672790.jpg',
      imageAlt: 'Classic tailored men haircut with clean side part',
      aspect: 'portrait',
    },
    {
      id: 'gal-taper-fade',
      title: 'Low Temple Taper Fade',
      category: 'Taper Fades',
      caption: 'Graduated sideburn and nape blend with textured top.',
      image: '/src/assets/images/service_taper_fade_1795015672073.jpg',
      imageAlt: 'Low taper fade haircut around temple and neckline',
      aspect: 'portrait',
    },
    {
      id: 'gal-beard-style',
      title: 'Sculpted Full Beard & Lineup',
      category: 'Beard Styles',
      caption: 'Balanced jawline density blended seamlessly into the side fade.',
      image: '/src/assets/images/service_haircut_beard_1795015673567.jpg',
      imageAlt: 'Clean tapered haircut paired with a sculpted beard',
      aspect: 'portrait',
    },
    {
      id: 'gal-razor-beard',
      title: 'Straight-Razor Beard Detailing',
      category: 'Beard Styles',
      caption: 'Sharp cheek lines and conditioned finish with precision comb work.',
      image: '/src/assets/images/service_beard_care_1795015674053.jpg',
      imageAlt: 'Barber detailing a beard with a straight razor',
      aspect: 'portrait',
    },
    {
      id: 'gal-chair-craft',
      title: 'Precision Chairside Craft',
      category: 'Modern Haircuts',
      caption: 'Focused clipper-over-comb blending under natural front window light.',
      image: '/src/assets/images/hero_barber_craft_1795015671117.jpg',
      imageAlt: 'Barber cutting and fading hair in natural daylight',
      aspect: 'landscape',
    },
    {
      id: 'gal-styling-finish',
      title: 'Textured Styling & Finish',
      category: 'Modern Haircuts',
      caption: 'Mirror-checked symmetry and controlled natural hold.',
      image: '/src/assets/images/service_straightening_curling_1795015678618.jpg',
      imageAlt: 'Barber finishing styled hair in front of a silver mirror',
      aspect: 'portrait',
    },
  ] as GalleryItem[],
  whyChooseSection: {
    eyebrow: 'Why Elite Kingston',
    question: 'Ready for a barbershop in Kingston where every detail is taken seriously?',
    subheading:
      'No rushed chairs and no guesswork—just disciplined technique, respectful service, and a clean studio minutes from downtown Kingston.',
    pillars: [
      {
        number: '01',
        title: 'Master Barbers',
        description:
          'Experienced barbers trained in classic scissor work, modern skin fades, and traditional straight-razor detailing across all hair types.',
      },
      {
        number: '02',
        title: 'Sharp, Clean Fades',
        description:
          'Seamless gradients, balanced crown structure, and crisp perimeter lineups that grow out cleanly week after week.',
      },
      {
        number: '03',
        title: 'Welcoming Atmosphere',
        description:
          'A bright, calm, and friendly Division Street space where every client—regulars and first-time visitors alike—feels comfortable.',
      },
      {
        number: '04',
        title: 'Quality Grooming',
        description:
          'Sanitized tools, hot steamed towels, and attentive finishing touches from the consultation to the final mirror check.',
      },
      {
        number: '05',
        title: 'Walk-Ins Welcome',
        description:
          'Stop by 172 Division St whenever your schedule opens up, or call ahead at +1 613-545-7715 to check chair availability.',
      },
    ] as ValuePillar[],
  },
  defaultHours: [
    { day: 'Monday', isOpen: true, hours: '9:00 AM – 6:00 PM' },
    { day: 'Tuesday', isOpen: true, hours: '9:00 AM – 6:00 PM' },
    { day: 'Wednesday', isOpen: true, hours: '9:00 AM – 6:00 PM' },
    { day: 'Thursday', isOpen: true, hours: '9:00 AM – 6:00 PM' },
    { day: 'Friday', isOpen: true, hours: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', isOpen: true, hours: '10:00 AM – 5:30 PM' },
    { day: 'Sunday', isOpen: false, hours: 'Closed' },
  ] as OpeningHourEntry[],
  visitSection: {
    eyebrow: 'Visit & Contact',
    heading: 'Drop in on Division Street or call ahead.',
    subheading:
      'Conveniently located in Kingston, Ontario. Walk-ins are always welcome during business hours—reach out by phone or text before you head over.',
  },
  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Visit', href: '#visit' },
  ],
};
