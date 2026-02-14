import { Spot, Partner } from '../types';

export const MOCK_SPOTS: Spot[] = [
    {
        id: 's1',
        name: '왓찰롱 사원',
        category: 'ACT',
        area: 'Central',
        lat: 7.8481,
        lng: 98.3364,
        open: '08:00',
        close: '17:00',
        duration: 40,
        price: 0,
        voucher: false,
        luxury_level: 4,
        images: ['https://images.unsplash.com/photo-1590001158193-79013ac0468e']
    },
    {
        id: 's2',
        name: '쓰리몽키즈 레스토랑',
        category: 'REST',
        area: 'Central',
        lat: 7.8710,
        lng: 98.3610,
        open: '10:00',
        close: '23:00',
        duration: 90,
        price: 1500,
        voucher: true,
        luxury_level: 5,
        images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de']
    }
];

export const MOCK_PARTNERS: Partner[] = [
    {
        id: 'p1',
        name: '오아시스 스파 (카타)',
        category: 'SPA',
        area: 'West-Beach',
        lat: 7.8210,
        lng: 98.2980,
        open: '10:00',
        close: '22:00',
        duration: 120,
        price: 3000,
        voucher: true,
        luxury_level: 5,
        images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874'],
        commission_rate: 0.15,
        voucher_stock: 50
    }
];
export interface Driver {
    id: string;
    name: string;
    photoUrl: string;
    vehicleType: string;
    vehicleNumber: string;
    phoneNumber: string;
    lineLink?: string; // Driver's personal or company LINE link
    status: 'ASSIGNED' | 'EN_ROUTE' | 'ARRIVED';
    location: { lat: number, lng: number };
}

export const MOCK_DRIVER: Driver = {
    id: 'd1',
    name: 'Mr. Somchai',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    vehicleType: 'Toyota Commuter (VIP Van)',
    vehicleNumber: '33-1234',
    phoneNumber: '+66123456789',
    lineLink: 'https://line.me/ti/p/20KIvNskSv',
    status: 'ASSIGNED',
    location: { lat: 7.8804, lng: 98.3923 }
};
