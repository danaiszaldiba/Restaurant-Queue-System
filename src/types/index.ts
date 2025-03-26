export interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  partySize: number;
  joinedAt: Date;
  status: 'waiting' | 'seated' | 'cancelled';
  estimatedWaitTime?: number;
  tableAssigned?: string;
  tableCode?: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  logo?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  image: string;
  spicyLevel?: 1 | 2 | 3;
  isVegetarian?: boolean;
  isSpecial?: boolean;
}