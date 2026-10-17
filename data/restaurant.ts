/**
 * RESTAURANT DATA — The single source of truth for The Taj Multicuisine Restaurant, Hajipur.
 * Complete with authentic location, contacts, comprehensive digital menu, services and reviews.
 */

import type { PhotoAsset } from '@/lib/images';
import { foodPhoto } from '@/lib/images';

export type DietaryType = 'veg' | 'non-veg';

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  dietary: DietaryType;
  description: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  portion?: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  source: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Restaurant = {
  name: string;
  tagline: string;
  category: string;
  legalDescription: string;
  kicker: string;
  summary: string;
  rating: {
    score: number;
    totalReviews: number;
  };
  priceRange: string;
  averageCostForTwo: string;
  introduction: string[];
  cuisineHighlights: { label: string; description: string }[];
  signatureDishes: {
    name: string;
    detail: string;
    price: number;
    dietary: DietaryType;
    category: string;
  }[];
  menu: MenuItem[];
  reviews: Review[];
  faqs: FaqItem[];
  googleMaps: {
    listingUrl: string;
    directionsUrl: string;
    embedQuery: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappMessage: string;
    email: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  address: {
    line1: string;
    landmark: string;
    locality: string;
    city: string;
    district: string;
    region: string;
    postalCode: string;
    country: string;
    fullFormatted: string;
  };
  openingHours: {
    days: string;
    opens: string;
    closes: string;
    lastOrder: string;
  }[];
  heroImage: PhotoAsset;
  gallery: PhotoAsset[];
  amenities: { name: string; detail: string; icon: string }[];
};

const GOOGLE_MAPS_LISTING =
  'https://www.google.com/maps/place/THE%20TAJ%20MULTICUISINE%20RESTAURANT/data=!4m2!3m1!1s0x39ed5d4fbc25374d:0xe1f4ffcae966b18e';

const GOOGLE_MAPS_DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&destination=THE+TAJ+MULTICUISINE+RESTAURANT+Lower+Dakbunglow+Road+Hajipur+Bihar';

export const restaurant: Restaurant = {
  name: 'The Taj Multicuisine Restaurant',
  tagline: 'Fine Dining, Family Celebrations & Royal Flavours in Hajipur',
  category: 'Fine Dining & Multicuisine Restaurant',
  legalDescription:
    'Premier multicuisine restaurant and banquet venue in Hajipur, Bihar, serving Mughlai, North Indian, Tandoor and Indo-Chinese culinary specialties.',
  kicker: 'Royal hospitality on Lower Dakbunglow Road',
  summary:
    'Hajipur’s favourite destination for lavish family feasts, sizzling tandoori grills, aromatic dum biryanis, and grand celebrations.',
  rating: {
    score: 4.3,
    totalReviews: 540,
  },
  priceRange: '₹₹',
  averageCostForTwo: '₹700 – ₹900',
  introduction: [
    'Perched gracefully on the 2nd Floor above HDFC Bank on Lower Dakbunglow Road, The Taj Multicuisine Restaurant brings a refined dining experience to the heart of Hajipur. Created for celebratory family dinners, reunion lunches, and warm evenings, our hall is designed to make every meal feel special.',
    'Our culinary philosophy celebrates the rich heritage of North Indian gravies and royal Mughlai platters, complemented by wok-tossed Indo-Chinese delicacies and refreshing artisan mocktails. Our chefs craft every masala from scratch, slow-cooking curries to silky perfection and smoking fresh kebabs over glowing charcoal embers.',
    'Whether you are hosting a 50-guest birthday banquet, gathering four generations around one long table, or enjoying an intimate dinner with signature butter chicken and garlic naans, our warm hospitality and attentive service ensure a memorable occasion.',
  ],
  cuisineHighlights: [
    {
      label: 'Mughlai & Royal Dum Biryani',
      description: 'Slow-dum aromatics, melt-in-mouth kebabs, and rich saffron gravies prepared with authentic Awadhi spices.',
    },
    {
      label: 'North Indian Curries & Tandoor',
      description: 'Velvety Butter Chicken, Dal Makhani simmered overnight, and hot smoky naans freshly pulled from the clay oven.',
    },
    {
      label: 'Wok-Tossed Indo-Chinese',
      description: 'Crispy Honey Chilli Potato, Hakka Noodles, and spicy Schezwan specialties cooked on roaring woks.',
    },
    {
      label: 'Family Dining & Private Banquets',
      description: 'Generous table layouts, air-conditioned party suites, and personalized celebration hosting for birthdays and anniversaries.',
    },
  ],
  signatureDishes: [
    {
      name: 'Taj Special Dum Biryani',
      detail: 'Aromatic long-grain basmati layered with tender spiced meat, saffron-infused milk, and fried onions, accompanied by mint Burani raita.',
      price: 420,
      dietary: 'non-veg',
      category: 'Biryani',
    },
    {
      name: 'Murgh Makhani (Butter Chicken)',
      detail: 'Tandoor-charred chicken simmered in an indulgent, velvety tomato-butter gravy infused with dried fenugreek leaves (kasuri methi).',
      price: 360,
      dietary: 'non-veg',
      category: 'Curries',
    },
    {
      name: 'Paneer Tikka Shashlik',
      detail: 'Fresh malai cottage cheese cubes marinated in mustard oil, ajwain and spiced yogurt, charcoal-grilled with crunchy peppers.',
      price: 280,
      dietary: 'veg',
      category: 'Starters',
    },
    {
      name: 'Dal Makhani (Slow-Cooked 18 Hours)',
      detail: 'Whole black lentils and kidney beans slow-simmered overnight over low heat with fresh cream, homemade white butter, and subtle spices.',
      price: 240,
      dietary: 'veg',
      category: 'Curries',
    },
  ],
  menu: [
    // TANDOOR & STARTERS
    {
      id: 'st-1',
      name: 'Murgh Malai Tikka',
      category: 'Tandoor & Starters',
      price: 320,
      dietary: 'non-veg',
      description: 'Boneless chicken cubes steeped in creamy cashew nut paste, cheese, and cardamom, lightly grilled until melt-in-mouth.',
      isChefSpecial: true,
      isPopular: true,
      portion: '6 pieces',
    },
    {
      id: 'st-2',
      name: 'Taj Special Tandoori Platter',
      category: 'Tandoor & Starters',
      price: 480,
      dietary: 'non-veg',
      description: 'A grand chef selection featuring Malai Tikka, Chicken Tikka, Afghani Tangdi, and Mutton Seekh Kebab served with mint chutney and fresh onion salad.',
      isChefSpecial: true,
      isPopular: true,
      portion: 'Generous sharing platter',
    },
    {
      id: 'st-3',
      name: 'Afghani Tangdi Kebab',
      category: 'Tandoor & Starters',
      price: 340,
      dietary: 'non-veg',
      description: 'Chicken drumsticks marinated in rich cream, black pepper, and fragrant herbs, charcoal-roasted to golden tenderness.',
      portion: '4 pieces',
    },
    {
      id: 'st-4',
      name: 'Mutton Galouti Kebab',
      category: 'Tandoor & Starters',
      price: 390,
      dietary: 'non-veg',
      description: 'Royal Lucknow-style finely ground minced lamb kebabs that dissolve effortlessly on the palate.',
      isPopular: true,
      portion: '4 pieces',
    },
    {
      id: 'st-5',
      name: 'Paneer Tikka Shashlik',
      category: 'Tandoor & Starters',
      price: 280,
      dietary: 'veg',
      description: 'Succulent cubes of fresh cottage cheese, capsicum, and onions marinated in aromatic spices and char-grilled.',
      isPopular: true,
      portion: '6 pieces',
    },
    {
      id: 'st-6',
      name: 'Dahi Ke Kebab',
      category: 'Tandoor & Starters',
      price: 250,
      dietary: 'veg',
      description: 'Crispy outer shell stuffed with hung spiced yogurt, chopped coriander, and roasted spices.',
      isChefSpecial: true,
      portion: '6 pieces',
    },
    {
      id: 'st-7',
      name: 'Crispy Honey Chilli Potato',
      category: 'Tandoor & Starters',
      price: 210,
      dietary: 'veg',
      description: 'Crisp fried potato fingers tossed with toasted sesame seeds, spring onions, and a tangy honey-chilli glaze.',
      isPopular: true,
      portion: 'Full',
    },
    {
      id: 'st-8',
      name: 'Chilli Paneer Dry',
      category: 'Tandoor & Starters',
      price: 260,
      dietary: 'veg',
      description: 'Wok-tossed paneer cubes with crushed garlic, green chillies, onions, and dark soya sauce.',
      portion: 'Full',
    },
    {
      id: 'st-9',
      name: 'Dragon Chicken',
      category: 'Tandoor & Starters',
      price: 310,
      dietary: 'non-veg',
      description: 'Crispy fried chicken slivers tossed in spicy red chilli paste, cashews, and fiery Sichuan peppercorns.',
      portion: 'Full',
    },

    // MAIN COURSE - NORTH INDIAN & MUGHLAI
    {
      id: 'mc-1',
      name: 'Butter Chicken (Murgh Makhani)',
      category: 'Main Course Curries',
      price: 360,
      dietary: 'non-veg',
      description: 'Tender tandoor chicken pieces cooked in our signature velvety tomato, cashew, and butter gravy.',
      isChefSpecial: true,
      isPopular: true,
      portion: 'Full bowl',
    },
    {
      id: 'mc-2',
      name: 'Taj Royal Mutton Rogan Josh',
      category: 'Main Course Curries',
      price: 440,
      dietary: 'non-veg',
      description: 'Slow-cooked Kashmiri style lamb in a rich gravy infused with Kashmiri red chillies, fennel seeds, and mace.',
      isChefSpecial: true,
      isPopular: true,
      portion: '4 tender pieces',
    },
    {
      id: 'mc-3',
      name: 'Murgh Rara',
      category: 'Main Course Curries',
      price: 380,
      dietary: 'non-veg',
      description: 'Bone-in juicy chicken cooked alongside spicy minced chicken (keema) in a thick, fragrant brown gravy.',
      portion: 'Full bowl',
    },
    {
      id: 'mc-4',
      name: 'Dal Makhani',
      category: 'Main Course Curries',
      price: 240,
      dietary: 'veg',
      description: 'Traditional Punjabi black lentils simmered for 18 hours with desi makhan and cream. Rich and deeply comforting.',
      isPopular: true,
      portion: 'Full bowl',
    },
    {
      id: 'mc-5',
      name: 'Paneer Lababdar',
      category: 'Main Course Curries',
      price: 290,
      dietary: 'veg',
      description: 'Cottage cheese cubes bathed in a rich creamy onion-tomato gravy with grated paneer and freshly ground spices.',
      isPopular: true,
      portion: 'Full bowl',
    },
    {
      id: 'mc-6',
      name: 'Kadhai Paneer',
      category: 'Main Course Curries',
      price: 270,
      dietary: 'veg',
      description: 'Paneer, crunchy capsicum, and onions cooked in a spicy freshly pounded coriander and red chilli masala.',
      portion: 'Full bowl',
    },
    {
      id: 'mc-7',
      name: 'Yellow Dal Tadka Desi Ghee',
      category: 'Main Course Curries',
      price: 190,
      dietary: 'veg',
      description: 'Yellow arhar lentils cooked to perfection and tempered with sizzling cumin seeds, garlic, dried red chillies, and pure ghee.',
      portion: 'Full bowl',
    },
    {
      id: 'mc-8',
      name: 'Mushroom Do Pyaza',
      category: 'Main Course Curries',
      price: 260,
      dietary: 'veg',
      description: 'Fresh button mushrooms sautéed with double the onions in a semi-dry spiced masala sauce.',
      portion: 'Full bowl',
    },

    // ROYAL BIRYANI & RICE
    {
      id: 'br-1',
      name: 'Taj Dum Mutton Biryani',
      category: 'Royal Biryani & Rice',
      price: 420,
      dietary: 'non-veg',
      description: 'Aged long basmati rice layered with marinated tender goat meat, sealed with dough and slow-steamed. Served with Burani raita and salan.',
      isChefSpecial: true,
      isPopular: true,
      portion: 'Generous single / sharing',
    },
    {
      id: 'br-2',
      name: 'Hyderabadi Chicken Dum Biryani',
      category: 'Royal Biryani & Rice',
      price: 330,
      dietary: 'non-veg',
      description: 'Spiced chicken marinated overnight in curd and fresh mint, layered with fragrant saffron rice.',
      isPopular: true,
      portion: 'Generous serving',
    },
    {
      id: 'br-3',
      name: 'Awadhi Veg Dum Biryani',
      category: 'Royal Biryani & Rice',
      price: 250,
      dietary: 'veg',
      description: 'Seasonal vegetables, paneer cubes, and golden caramelized onions layered with fragrant basmati and kewra water.',
      portion: 'Generous serving',
    },
    {
      id: 'br-4',
      name: 'Jeera Rice / Peas Pulao',
      category: 'Royal Biryani & Rice',
      price: 160,
      dietary: 'veg',
      description: 'Fluffy basmati rice tempered with roasted royal cumin seeds and ghee.',
      portion: 'Bowl',
    },

    // INDO-CHINESE MAINS
    {
      id: 'ch-1',
      name: 'Veg Hakka Noodles',
      category: 'Indo-Chinese Wok',
      price: 190,
      dietary: 'veg',
      description: 'Stir-fried noodles with julienned cabbage, carrots, capsicum, and spring onions tossed in savory soy and sesame oil.',
      portion: 'Full plate',
    },
    {
      id: 'ch-2',
      name: 'Chicken Schezwan Fried Rice',
      category: 'Indo-Chinese Wok',
      price: 250,
      dietary: 'non-veg',
      description: 'Wok-tossed rice with shredded chicken, eggs, and house-made fiery Sichuan chilli sauce.',
      isPopular: true,
      portion: 'Full plate',
    },
    {
      id: 'ch-3',
      name: 'Chicken Manchurian Gravy',
      category: 'Indo-Chinese Wok',
      price: 290,
      dietary: 'non-veg',
      description: 'Juicy chicken meatballs simmered in a dark, glossy garlic and ginger Manchurian gravy.',
      portion: 'Full bowl',
    },

    // CLAY OVEN BREADS
    {
      id: 'brd-1',
      name: 'Butter Garlic Naan',
      category: 'Tandoori Breads',
      price: 80,
      dietary: 'veg',
      description: 'Refined flour bread topped with minced garlic and coriander, baked crisp in clay tandoor and brushed with butter.',
      isPopular: true,
    },
    {
      id: 'brd-2',
      name: 'Cheese Chilli Naan',
      category: 'Tandoori Breads',
      price: 110,
      dietary: 'veg',
      description: 'Stuffed with melted mozzarella and green chillies, freshly baked and served piping hot.',
      isChefSpecial: true,
    },
    {
      id: 'brd-3',
      name: 'Laccha Paratha (Desi Ghee)',
      category: 'Tandoori Breads',
      price: 65,
      dietary: 'veg',
      description: 'Multi-layered whole wheat tandoori paratha smeared with rich desi ghee.',
    },
    {
      id: 'brd-4',
      name: 'Tandoori Roti (Plain / Butter)',
      category: 'Tandoori Breads',
      price: 30,
      dietary: 'veg',
      description: 'Crisp whole wheat flatbread made straight on the tandoor walls.',
    },

    // BEVERAGES & MOCKTAILS
    {
      id: 'bv-1',
      name: 'Taj Signature Blue Curacao Mojito',
      category: 'Mocktails & Desserts',
      price: 140,
      dietary: 'veg',
      description: 'Electric blue cooler with crushed mint leaves, lime wedges, simple syrup, and sparkling soda.',
      isPopular: true,
    },
    {
      id: 'bv-2',
      name: 'Virgin Pina Colada',
      category: 'Mocktails & Desserts',
      price: 160,
      dietary: 'veg',
      description: 'Tropical blend of fresh pineapple juice, sweet coconut cream, and crushed ice.',
    },
    {
      id: 'bv-3',
      name: 'Cold Coffee with Vanilla Scoop',
      category: 'Mocktails & Desserts',
      price: 150,
      dietary: 'veg',
      description: 'Thick espresso brew blended with chilled milk and topped with creamy vanilla ice cream.',
    },
    {
      id: 'bv-4',
      name: 'Shahi Tukda with Rabri',
      category: 'Mocktails & Desserts',
      price: 160,
      dietary: 'veg',
      description: 'Crispy ghee-fried brioche triangles soaked in saffron sugar syrup, smothered in rich condensed rabri and slivered pistachios.',
      isChefSpecial: true,
      isPopular: true,
    },
    {
      id: 'bv-5',
      name: 'Sizzling Brownie with Ice Cream',
      category: 'Mocktails & Desserts',
      price: 190,
      dietary: 'veg',
      description: 'Warm dark chocolate walnut brownie served on a smoking hot sizzler plate with vanilla ice cream and molten fudge.',
      isPopular: true,
    },
    {
      id: 'bv-6',
      name: 'Gulab Jamun with Rabri',
      category: 'Mocktails & Desserts',
      price: 120,
      dietary: 'veg',
      description: 'Two warm, soft khoya dumplings soaked in rose-cardamom syrup and drizzled with thickened rabri.',
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Rajesh Kumar Verma',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'Best family restaurant in Hajipur! We celebrated my daughter’s birthday here with 25 family members. The Butter Chicken and Dum Biryani were outstanding, and the staff took care of every request promptly. The location above HDFC Bank on Lower Dakbunglow Road is very convenient.',
      source: 'Google Review',
    },
    {
      id: 'rev-2',
      author: 'Anjali Srivastava',
      rating: 5,
      date: '1 month ago',
      comment:
        'Aesthetic interior and very clean ambiance. Paneer Tikka and Dal Makhani are must-try items. Truly feels like a premium restaurant experience right here in Vaishali district.',
      source: 'Google Review',
    },
    {
      id: 'rev-3',
      author: 'Mohd. Farhan',
      rating: 5,
      date: 'Recent Diner',
      comment:
        'The Taj Special Platter and Mutton Rogan Josh are unmatched in taste. Soft garlic naans and prompt service. The mocktails were also wonderfully refreshing!',
      source: 'Verified Local Diner',
    },
    {
      id: 'rev-4',
      author: 'Vikas Sharma',
      rating: 4,
      date: '3 weeks ago',
      comment:
        'Great food quality and generous portions. Ample seating space for large family gatherings. Very polite hospitality.',
      source: 'Google Review',
    },
  ],
  faqs: [
    {
      question: 'Where is The Taj Multicuisine Restaurant located in Hajipur?',
      answer:
        'We are centrally situated on the 2nd Floor, Lower Dakbunglow Road, directly above HDFC Bank in Hajipur, Bihar (PIN 844101). It is easily accessible within 5 minutes from Hajipur Railway Station and Ramashis Chowk.',
    },
    {
      question: 'Do you offer table reservations and party bookings?',
      answer:
        'Yes! We accommodate table reservations for both intimate dinners and large family parties. You can book online right here, or ping us on WhatsApp / Call +91 90316 55358.',
    },
    {
      question: 'Are vegetarian and non-vegetarian foods prepared separately?',
      answer:
        'Yes. We maintain strict hygiene protocols and dedicated preparation stations for pure vegetarian and non-vegetarian dishes.',
    },
    {
      question: 'Do you have facilities for private parties, birthdays, or meetings?',
      answer:
        'Yes, our venue has a dedicated celebration hall section that can comfortably seat groups of up to 60-70 guests with customizable party buffet menus and sound setup.',
    },
    {
      question: 'What are the restaurant opening hours?',
      answer:
        'We are open 7 days a week from 11:00 AM to 10:30 PM continuously for lunch, evening snacks, mocktails, and dinner.',
    },
    {
      question: 'Do you provide takeaway and home delivery?',
      answer:
        'Yes, we provide hot and hygienic packaging for takeaway as well as direct home delivery across Hajipur town. Simply call or WhatsApp us on +91 90316 55358.',
    },
  ],
  googleMaps: {
    listingUrl: GOOGLE_MAPS_LISTING,
    directionsUrl: GOOGLE_MAPS_DIRECTIONS,
    embedQuery: 'THE+TAJ+MULTICUISINE+RESTAURANT+Lower+Dakbunglow+Road+Hajipur',
  },
  contact: {
    phone: '+919031655358',
    phoneFormatted: '+91 90316 55358',
    whatsapp: '+919031655358',
    whatsappMessage: 'Hello! I would like to reserve a table / enquire about dining at The Taj Multicuisine Restaurant Hajipur.',
    email: 'tajmulticuisinehajipur@gmail.com',
  },
  social: {
    instagram: 'https://instagram.com/the_taj_031',
    facebook: 'https://facebook.com/thetajmulticuisinehajipur',
  },
  address: {
    line1: '2nd Floor, Above HDFC Bank',
    landmark: 'Lower Dakbunglow Road',
    locality: 'Dakbunglow Chowk',
    city: 'Hajipur',
    district: 'Vaishali',
    region: 'Bihar',
    postalCode: '844101',
    country: 'India',
    fullFormatted: '2nd Floor, Above HDFC Bank, Lower Dakbunglow Road, Hajipur, Bihar 844101',
  },
  openingHours: [
    {
      days: 'Monday – Sunday',
      opens: '11:00 AM',
      closes: '10:30 PM',
      lastOrder: '10:00 PM',
    },
  ],
  heroImage: foodPhoto('diningHall'),
  gallery: [
    foodPhoto('mughlaiPlatter'),
    foodPhoto('biryani'),
    foodPhoto('northIndianCurry'),
    foodPhoto('tandooriChicken'),
    foodPhoto('mocktail'),
    foodPhoto('dessert'),
    foodPhoto('chineseDish'),
    foodPhoto('banquetHall'),
    foodPhoto('warmInterior'),
    foodPhoto('tableSetting'),
  ],
  amenities: [
    {
      name: 'Air Conditioned Dining',
      detail: 'Comfortable temperature-controlled dining rooms and party suites.',
      icon: 'Wind',
    },
    {
      name: 'Private Party Banquet',
      detail: 'Accommodating up to 70 guests for birthdays, anniversaries and kitty parties.',
      icon: 'PartyPopper',
    },
    {
      name: 'Central Hajipur Location',
      detail: 'Located right above HDFC Bank on Lower Dakbunglow Road with easy transport.',
      icon: 'MapPin',
    },
    {
      name: 'Pure Veg & Non-Veg Split',
      detail: 'Strict culinary segregation and highest standards of food safety.',
      icon: 'ShieldCheck',
    },
    {
      name: 'Takeaway & Delivery',
      detail: 'Piping hot fresh food delivered to your doorstep in Hajipur.',
      icon: 'Truck',
    },
    {
      name: 'High Speed Wi-Fi',
      detail: 'Complimentary high-speed internet access for all dining guests.',
      icon: 'Wifi',
    },
  ],
};

export type { PhotoAsset };