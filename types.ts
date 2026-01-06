
export enum PropertyType {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  CONDO = 'Condo',
  TOWNHOUSE = 'Townhouse',
  MANSION = 'Mansion'
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  tags: string[];
  description: string;
  coordinates: { x: number; y: number }; // Simulated map coords
}

export interface Filters {
  location: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
}
