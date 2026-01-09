import { PropertyType } from './types';

export const MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Modern Waterfront Villa',
    price: 1250000,
    location: 'Miami, FL',
    type: PropertyType.MANSION,
    beds: 5,
    baths: 4,
    sqft: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    tags: ['New', 'Waterfront'],
    description: 'Breathtaking ocean views with a private dock and infinity pool.',
    coordinates: { x: 30, y: 40 }
  },
  {
    id: '2',
    title: 'Downtown Luxury Loft',
    price: 850000,
    location: 'Austin, TX',
    type: PropertyType.APARTMENT,
    beds: 2,
    baths: 2,
    sqft: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    tags: ['Industrial', 'View'],
    description: 'High ceilings, exposed brick, and floor-to-ceiling windows in the heart of downtown.',
    coordinates: { x: 50, y: 60 }
  },
  {
    id: '3',
    title: 'Suburban Family Home',
    price: 540000,
    location: 'Charlotte, NC',
    type: PropertyType.HOUSE,
    beds: 4,
    baths: 3,
    sqft: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    tags: ['Family', 'Quiet'],
    description: 'Spacious backyard with a finished basement and modern kitchen upgrades.',
    coordinates: { x: 70, y: 20 }
  },
  {
    id: '4',
    title: 'Chic Urban Condo',
    price: 420000,
    location: 'Chicago, IL',
    type: PropertyType.CONDO,
    beds: 1,
    baths: 1,
    sqft: 950,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    tags: ['Central', 'Gym'],
    description: 'Modern bachelor pad with smart home features and 24/7 concierge.',
    coordinates: { x: 45, y: 35 }
  },
  {
    id: '5',
    title: 'Mountain View Retreat',
    price: 1950000,
    location: 'Aspen, CO',
    type: PropertyType.HOUSE,
    beds: 6,
    baths: 5,
    sqft: 5500,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    tags: ['Luxury', 'Mountain'],
    description: 'A masterpiece of contemporary architecture nestled in the Rockies.',
    coordinates: { x: 20, y: 80 }
  },
  {
    id: '6',
    title: 'Riverside Townhouse',
    price: 680000,
    location: 'Portland, OR',
    type: PropertyType.TOWNHOUSE,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1448630360428-65ff24c95de2?auto=format&fit=crop&q=80&w=800',
    tags: ['Riverside', 'Solar'],
    description: 'Sustainable living with multi-level decks overlooking the Willamette.',
    coordinates: { x: 15, y: 30 }
  }
];
