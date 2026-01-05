// Domain types for the application

export interface NavLinkType {
  name: string;
  href: string;
}

export interface FeatureType {
  id: string;
  icon: string;
  title: string;
}

export interface CasinoType {
  id: string;
  city: string;
  brand: 'winpot' | 'capri' | 'diamonds' | 'veneto';
  schedule: {
    weekdays: string;
    weekend?: string;
  };
  address: string;
  imageUrl: string;
  isOpen24h?: boolean;
  externalLink: string;
  googleMapsUrl: string;
}

export interface BrandFilter {
  id: string;
  label: string;
  count: number;
  color?: string;
}

export interface BrandType {
  id: string;
  name: string;
  colorClass: string;
  bgColorClass: string;
  borderColorClass: string;
}

export interface StatType {
  value: string;
  label: string;
}

export interface ContactInfoType {
  phone: string;
  email: string;
  address: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  subject: string;
  message: string;
  acceptPrivacy: boolean;
}
