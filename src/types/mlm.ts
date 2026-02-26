export type UserRole = 'admin' | 'distributor' | 'customer';

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  referral_id: string; // Unique ID for this user
  referrer_id: string | null; // Who referred this user
  subscription_status: 'pending' | 'active' | 'expired';
  title: string; // Silver, Gold, etc.
  created_at: string;
}

export interface Commission {
  id: string;
  user_id: string;
  from_user_id: string;
  amount: number;
  level: number;
  type: 'referral' | 'repurchase';
  status: 'pending' | 'paid';
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  retail_price: number;
  distributor_price: number;
  image_url: string;
  stock: number;
  category: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'unpaid' | 'paid';
  created_at: string;
}

export interface Wallet {
  user_id: string;
  balance: number;
  total_earned: number;
  withdrawable_amount: number;
}