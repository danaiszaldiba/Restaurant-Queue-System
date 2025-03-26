export interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  partySize: number;
  joinedAt: Date;
  status: 'waiting' | 'seated' | 'cancelled';
  estimatedWaitTime?: number;
  tableAssigned?: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  logo?: string;
}