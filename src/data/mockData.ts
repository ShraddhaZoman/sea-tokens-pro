export interface Plantation {
  id: string;
  userId: string;
  userName: string;
  species: string;
  gps: { lat: number; lng: number };
  area: number;
  imageUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  verificationScore?: number;
  submittedAt: string;
  co2Sequestration?: number;
}

export interface Credit {
  id: string;
  plantationId: string;
  tokensMinted: number;
  txHash: string;
  revenue: number;
  mintedAt: string;
}

export interface MarketplaceListing {
  id: string;
  buyer: string;
  creditsPurchased: number;
  discountRate: number;
  vestingSchedule: string;
  escrowStatus: 'pending' | 'locked' | 'released';
  purchasedAt: string;
}

export const mockPlantations: Plantation[] = [
  {
    id: 'p1',
    userId: '2',
    userName: 'Rajesh Kumar',
    species: 'Mangrove (Rhizophora)',
    gps: { lat: 19.0760, lng: 72.8777 },
    area: 2.5,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    status: 'verified',
    verificationScore: 0.94,
    submittedAt: '2024-01-15T10:30:00Z',
    co2Sequestration: 3.75,
  },
  {
    id: 'p2',
    userId: '3',
    userName: 'Priya Singh',
    species: 'Avicennia Marina',
    gps: { lat: 21.1702, lng: 72.8311 },
    area: 1.8,
    imageUrl: 'https://images.unsplash.com/photo-1518623001395-125242310d0c?w=800',
    status: 'pending',
    submittedAt: '2024-01-20T14:20:00Z',
  },
  {
    id: 'p3',
    userId: '2',
    userName: 'Rajesh Kumar',
    species: 'Sonneratia',
    gps: { lat: 22.5726, lng: 88.3639 },
    area: 3.2,
    imageUrl: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800',
    status: 'verified',
    verificationScore: 0.91,
    submittedAt: '2024-01-10T09:15:00Z',
    co2Sequestration: 4.8,
  },
  {
    id: 'p4',
    userId: '3',
    userName: 'Priya Singh',
    species: 'Bruguiera',
    gps: { lat: 11.9416, lng: 79.8083 },
    area: 2.0,
    imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
    status: 'rejected',
    submittedAt: '2024-01-18T11:45:00Z',
  },
  {
    id: 'p5',
    userId: '2',
    userName: 'Rajesh Kumar',
    species: 'Ceriops',
    gps: { lat: 15.2993, lng: 74.1240 },
    area: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
    status: 'verified',
    verificationScore: 0.96,
    submittedAt: '2024-01-05T08:00:00Z',
    co2Sequestration: 6.75,
  },
];

export const mockCredits: Credit[] = [
  {
    id: 'c1',
    plantationId: 'p1',
    tokensMinted: 375,
    txHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    revenue: 3750,
    mintedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 'c2',
    plantationId: 'p3',
    tokensMinted: 480,
    txHash: '0xa3c2eb7b11a91385f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7',
    revenue: 4800,
    mintedAt: '2024-01-11T12:30:00Z',
  },
  {
    id: 'c3',
    plantationId: 'p5',
    tokensMinted: 675,
    txHash: '0xb8d4fac3e1d68b42a6f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ea',
    revenue: 6750,
    mintedAt: '2024-01-06T14:15:00Z',
  },
];

export const mockMarketplace: MarketplaceListing[] = [
  {
    id: 'm1',
    buyer: 'Green Corp Industries',
    creditsPurchased: 500,
    discountRate: 15,
    vestingSchedule: '12 months',
    escrowStatus: 'locked',
    purchasedAt: '2024-01-22T10:00:00Z',
  },
  {
    id: 'm2',
    buyer: 'EcoTech Solutions',
    creditsPurchased: 300,
    discountRate: 20,
    vestingSchedule: '18 months',
    escrowStatus: 'pending',
    purchasedAt: '2024-01-23T15:30:00Z',
  },
  {
    id: 'm3',
    buyer: 'Sustainable Energy Ltd',
    creditsPurchased: 750,
    discountRate: 10,
    vestingSchedule: '24 months',
    escrowStatus: 'locked',
    purchasedAt: '2024-01-21T09:00:00Z',
  },
];
