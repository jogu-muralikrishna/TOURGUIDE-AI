export interface Vehicle {
  id: string;
  name: string;
  category: 'Car' | 'Train' | 'Bus';
  price: number;
  reachTime: string;
  image: string;
  sage: Sage;
  history?: string[];
  specs?: string;
  driverName?: string;
  driverContact?: string;
  driverImage?: string;
  driverRating?: number;
}

export interface RouteData {
  from: string;
  to: string;
}

export interface Sage {
  name: string;
  avatar: string;
  rating: number;
  caretakerScore: number;
  description: string;
}

export interface Pitstop {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  price: number;
  image: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: string;
  visibility: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  isAvailable: boolean;
  image: string;
  price: number;
  contact?: string;
  rating?: number;
}

export interface UserData {
  name: string;
  contact: string;
  email: string;
  specialRequests: string;
}
