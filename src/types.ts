export type SpotCategory = 'SPA' | 'CAFE' | 'REST' | 'SHOP' | 'ACT' | 'HOTEL';

export interface User {
  name: string;
  party: number;
  hotel: string;
  flight_no: string;
  flight_time: Date;
}

export interface Spot {
  id: string;
  name: string;
  category: SpotCategory;
  area: string;
  lat: number;
  lng: number;
  open: string; // "HH:mm"
  close: string; // "HH:mm"
  duration: number; // minutes
  price: number;
  voucher: boolean;
  luxury_level: number; // 1-5
  images: string[];
  googleMapUrl?: string; // 구글 맵 바로가기 링크 추가
}

export interface Partner extends Spot {
  commission_rate: number;
  voucher_stock: number;
}

export interface ItineraryItem {
  spot: Spot;
  arrival_time: Date;
  duration: number;
  departure_time: Date;
}

export interface Itinerary {
  id: string;
  user_id: string;
  start_location: string;
  items: ItineraryItem[];
  total_price: number;
  total_duration: number;
  status: 'Draft' | 'Confirmed';
}
