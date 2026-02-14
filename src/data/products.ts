export interface Product {
    id: string;
    name: string;
    price: string;
    thumbnail: string;
    detailImage: string;
    description: string;
    category?: 'SIMILAN' | 'TICKET' | 'TOUR' | 'SPA' | 'HIT' | 'SHOW' | string;
    highlights?: string[];
    courses?: {
        name: string;
        priceAdult: string;
        priceChild: string;
        features?: string[];
        description?: string;
        caution?: string;
    }[];
    pickupOptions?: {
        name: string;
        price: number;
    }[];
    inclusions?: string[];
    exclusions?: string[];
    vehicleInfo?: string;
    pricePolicy?: string;
    cancellationPolicy?: string;
    importantNotes?: string[];
    badges?: string[];
    luggagePrice?: number;
    provider?: string;
    onSiteFees?: {
        entranceAdult: number;
        entranceChild: number;
        guideTip: number;
    };
    pickupZones?: {
        zones: string[];
        priceCar: number;
        priceVan: number;
    }[];
    carrierFeePerUnit?: number;
    hasCarrierOption?: boolean;
    options?: {
        id?: string;
        name: string;
        price: number;
        type?: 'DINNER' | 'UPGRADE' | 'ACTIVITY' | 'SERVICE';
    }[];
    maxOptionSelection?: number;
    caution?: string;
    dinnerPricing?: {
        adult: number;
        child: number;
    };
    details?: string;
    notices?: string;
}

export const MAIN_PRODUCTS: Product[] = [
    {
        id: 'p_siam_niramit',
        name: '시암 니라밋 쇼 (Siam Niramit)',
        price: '1,530 THB ~',
        thumbnail: '/images/siam_niramit_new.jpg',
        detailImage: '/images/siam_niramit_new.jpg',
        description: '태국 최대 스케일의 뮤지컬 쇼! 기네스북 등재 무대에서 펼쳐지는 압도적인 퍼포먼스를 만나보세요.',
        category: 'SHOW',
        badges: ['기네스북 무대', '화요일 휴관'],
        courses: [
            { name: '실버석 (Silver)', priceAdult: '1,530 바트', priceChild: '1,400 바트' },
            { name: '골드석 (Gold)', priceAdult: '1,700 바트', priceChild: '1,500 바트' },
            { name: '플래티넘석 (Platinum)', priceAdult: '1,870 바트', priceChild: '1,650 바트' }
        ],
        options: [
            { id: 'dinner_adult', name: '디너 뷔페 추가 (성인)', price: 340, type: 'DINNER' },
            { id: 'dinner_child', name: '디너 뷔페 추가 (아동)', price: 170, type: 'DINNER' }
        ],
        notices: '⚠️ 안내 사항:\n1. 매주 화요일은 정기 휴관일입니다.\n2. 무료 가방 보관 서비스(Luggage Storage)를 제공합니다.\n3. 공연 중 사진 촬영은 엄격히 금지됩니다.',
        cancellationPolicy: '투어 1일 전 전액 환불 가능, 당일 취소 시 환불 불가',
        luggagePrice: 100
    },
    {
        id: 'p_simon_cabaret',
        name: '사이먼 카바레 쇼 (Simon Cabaret)',
        price: '800 THB ~',
        thumbnail: '/images/simon_cabaret.png',
        detailImage: '/images/simon_cabaret.png',
        description: '푸켓의 전설적인 트랜스젠더 쇼. 화려한 의상과 전 세계를 아우르는 테마 공연을 즐겨보세요.',
        category: 'SHOW',
        courses: [
            { name: 'VIP석 (성인)', priceAdult: '1,000 바트', priceChild: '1,000 바트' },
            { name: 'VIP석 (아동)', priceAdult: '800 바트', priceChild: '800 바트' },
            { name: '일반석 (성인)', priceAdult: '800 바트', priceChild: '800 바트' },
            { name: '일반석 (아동)', priceAdult: '600 바트', priceChild: '600 바트' }
        ],
        notices: '⚠️ 안내 사항:\n1. 가방 및 귀중품 무료 보관함 이용이 가능합니다.\n2. 공연 후 배우들과의 사진 촬영은 소정의 팁이 발생합니다.\n3. 파통 지역 남단에 위치해 있어 개별 이동이 편리합니다.',
        cancellationPolicy: '공연 24시간 전 무료 취소 가능, 이후 취소 불가',
        luggagePrice: 0
    },
    {
        id: 'p_wakeup_show',
        name: '빠통 웨이크업 쇼 (Wake Up)',
        price: '900 THB',
        thumbnail: '/images/wakeup_show.jpg',
        detailImage: '/images/wakeup_show.jpg',
        description: '파통에서 가장 핫한 성인 전용 쇼! 화려하고 파격적인 퍼포먼스가 기다리고 있습니다.',
        category: 'SHOW',
        badges: ['성인 전용', '음료 1개 포함'],
        courses: [
            { name: '1인 입장권 (음료 포함)', priceAdult: '900 바트', priceChild: '900 바트' }
        ],
        notices: '⚠️ 성인 전용 상품입니다. 만 19세 미만은 보호자 동반 시에도 입장이 불가합니다. 입장 시 여권 확인이 있을 수 있습니다.',
        cancellationPolicy: '예약 확정 후 환불 불가 (No-Refund)'
    },
    {
        id: 'p_carnival_magic',
        name: '카니발 매직 (Carnival Magic)',
        price: '1,800 THB ~',
        thumbnail: '/images/carnival_magic.jpg',
        detailImage: '/images/carnival_magic.jpg',
        description: '세계 최초의 태국 문화 테마파크! 수천만 개의 LED가 수놓는 야경을 경험하세요.',
        category: 'SHOW',
        badges: ['월/수/토 운영', '빛의 축제'],
        courses: [
            { name: '쇼 온니 (Show Only)', priceAdult: '1,800 바트', priceChild: '1,800 바트' },
            { name: '쇼 + 디너 (Show + Dinner)', priceAdult: '2,000 바트', priceChild: '1,900 바트' }
        ],
        options: [
            { id: 'royal_seat', name: '로얄석 업그레이드 (Royal Seat)', price: 500, type: 'UPGRADE' }
        ],
        notices: '⚠️ 운영 요일: 월, 수, 토요일만 운영합니다.\n메인 공연장 내부에서는 휴대폰 및 카메라 사용이 금지됩니다.',
        cancellationPolicy: '투어 2일 전 100% 환불 가능, 이후 환불 불가'
    },
    {
        id: 'phuket-fantasea',
        name: '푸켓 판타씨 쇼 (FantaSea)',
        price: '1,350 THB ~',
        thumbnail: '/images/fantasea.jpg',
        detailImage: '/images/fantasea.jpg',
        description: '수십 마리의 코끼리와 배우들이 출연하는 웅장한 신화 투어 쇼!',
        category: 'SHOW',
        badges: ['화/금/일 운영', '코끼리 공연'],
        courses: [
            { name: '일반석 (Regular)', priceAdult: '1,350 바트', priceChild: '1,350 바트' },
            { name: '골드석 (Gold Seat)', priceAdult: '1,600 바트', priceChild: '1,600 바트' }
        ],
        options: [
            { id: 'dinner_buffet', name: '디너 뷔페 추가 (Dinner)', price: 400, type: 'DINNER' }
        ],
        notices: '⚠️ 운영 요일: 화, 금, 일요일 운영합니다.\n카말라 지역에 위치하며 픽업 셔틀 유료 이용 가능합니다.',
        cancellationPolicy: '당일 취소 시 100% 위약금 발생'
    },
    {
        id: 'p_circus',
        name: '푸켓 서커스 쇼 (Circus)',
        price: '810 THB ~',
        thumbnail: '/images/circus_show.jpg',
        detailImage: '/images/circus_show.jpg',
        description: '공중 곡예와 환상적인 퍼포먼스! 아이들과 함께 즐기기 좋은 최고의 가족 쇼.',
        category: 'SHOW',
        badges: ['화요일 휴무', '박진감'],
        courses: [
            { name: '실버석 (Silver)', priceAdult: '810 바트', priceChild: '810 바트' },
            { name: '골드석 (Gold)', priceAdult: '900 바트', priceChild: '900 바트' },
            { name: '플래티넘석 (Platinum)', priceAdult: '1,080 바트', priceChild: '1,080 바트' }
        ],
        notices: '⚠️ 매주 화요일은 휴무입니다.\n공연 30분 전까지 도착을 권장합니다.',
        cancellationPolicy: '투어 1일 전까지 무료 취소 가능',
        luggagePrice: 100
    },
    {
        id: 'tiger-park',
        name: '타이거 파크 (Tiger Park)',
        price: '900 THB ~',
        thumbnail: '/images/tiger-park.jpg',
        detailImage: '/images/tiger-park.jpg',
        description: "호랑이와 직접 교감하며 사진을 남길 수 있는 푸켓 대표 체험장입니다.",
        category: 'TOUR',
        courses: [
            { name: 'Newborn Tiger (1-2개월)', priceAdult: '1,300 바트', priceChild: '1,300 바트' },
            { name: 'Big Tiger (성년)', priceAdult: '1,000 바트', priceChild: '1,000 바트' },
            { name: 'Small Tiger (6-12개월)', priceAdult: '900 바트', priceChild: '900 바트' }
        ],
        options: [
            { id: 'pkg_2', name: '패키지 2번 (선택 2개)', price: 1600 },
            { id: 'pkg_3', name: '패키지 3번 (선택 3개)', price: 2400 },
            { id: 'pkg_4', name: '패키지 4번 (All 인원)', price: 3200 }
        ],
        notices: "⚠️ 픽업 서비스 불포함 상품입니다. 임산부 및 신장 160cm 미만 고객은 체험이 제한될 수 있습니다.",
        cancellationPolicy: '방문 24시간 전 무료 취소 가능',
        luggagePrice: 0
    },
    {
        id: 'p_lion_land',
        name: '라이온 랜드 (Lion Land)',
        price: '810 THB ~',
        thumbnail: '/images/lion_land.jpg',
        detailImage: '/images/lion_land.jpg',
        description: '푸켓의 유일한 사자 체험장. 귀여운 베이비 사자부터 위엄 있는 성체 사자까지 만나보세요.',
        category: 'TOUR',
        courses: [
            { name: '베이비 라이언 (Baby Lion)', priceAdult: '1,170 바트', priceChild: '1,170 바트' },
            { name: '스몰 라이언 (Small Lion)', priceAdult: '810 바트', priceChild: '810 바트' }
        ],
        options: [
            { id: 'combo_1', name: '콤보 1번 패키지', price: 1500 },
            { id: 'combo_2', name: '콤보 2번 패키지', price: 2200 },
            { id: 'combo_3', name: '콤보 3번 패키지', price: 2800 }
        ],
        notices: "⚠️ 찰롱 지역에 위치하고 있으며 개별 이동 상품입니다. 조련사의 지시에 반드시 따라주세요.",
        cancellationPolicy: '방문 24시간 전 전액 환불 가능'
    },
    {
        id: 'p_hello_studio',
        name: '헬로 푸켓 스튜디오 (Hello Phuket)',
        price: '300 THB ~',
        thumbnail: '/images/hello_studio.jpg',
        detailImage: '/images/hello_studio.jpg',
        description: "태국 전통 의상을 입고 인생샷을 남겨보세요. 전문 메이크업 서비스도 가능합니다.",
        category: 'TICKET',
        courses: [
            { name: '전통 의상 대여 (성인)', priceAdult: '500 바트', priceChild: '500 바트' },
            { name: '전통 의상 대여 (아동)', priceAdult: '300 바트', priceChild: '300 바트' }
        ],
        options: [
            { id: 'makeup', name: "전문 메이크업 추가", price: 1500, type: 'SERVICE' },
            { id: 'photo', name: "전문 사진 촬영 (1시간)", price: 2000, type: 'SERVICE' }
        ],
        notices: '푸켓 타운 인근에 위치해 있습니다. 촬영에 필요한 소품은 현장에서 대여 가능합니다.'
    },
    {
        id: 'p_banana',
        name: '바나나비치 반일 투어 (럭셔리 요트)',
        price: '1,475 THB ~',
        thumbnail: '/images/banana_beach.jpg',
        detailImage: '/images/banana_beach.jpg',
        description: '프라이빗 비치에서 즐기는 럭셔리 휴양. 취향에 맞는 다양한 코스를 선택하세요.',
        category: 'HIT',
        courses: [
            { name: '프리미엄 코스', priceAdult: '2,475 바트', priceChild: '2,175 바트', features: ['스노클링 1회', '점심 뷔페', '액티비티 1종 포함'] },
            { name: '스노클링 코스', priceAdult: '1,925 바트', priceChild: '1,725 바트', features: ['스노클링 2회', '점심 뷔페'] },
            { name: '에브리데이 코스 (오후)', priceAdult: '1,475 바트', priceChild: '1,275 바트', features: ['씨카약 체험', '가벼운 식사'] }
        ],
        options: [
            { id: 'private_yacht', name: '단독 요트 렌트 (최대 10인)', price: 17000, type: 'SERVICE' },
            { id: 'parasailing', name: '파라세일링 추가', price: 1200, type: 'ACTIVITY' },
            { id: 'scuba', name: '스쿠버 다이빙 추가', price: 2100, type: 'ACTIVITY' }
        ],
        notices: '⚠️ 임산부 탑승 절대 불가.\n캐리어 지참 시 개당 300바트 추가 요금이 발생합니다.',
        luggagePrice: 300,
        cancellationPolicy: '3일 전 50% 환불, 2일 전~당일 환불 불가'
    },
    {
        id: 'p_citytour',
        name: '푸켓 단독 시티투어 (우리끼리)',
        price: '1,700 THB ~',
        thumbnail: '/images/citytour.jpg',
        detailImage: '/images/citytour.jpg',
        description: "가고 싶은 곳 어디든 자유롭게! 우리 가족, 연인끼리 프라이빗하게 즐기세요.",
        category: 'TOUR',
        courses: [
            { name: '5시간 시티투어 (세단)', priceAdult: '1,700 바트', priceChild: '1,700 바트' },
            { name: '5시간 시티투어 (봉고차)', priceAdult: '1,900 바트', priceChild: '1,900 바트' },
            { name: '10시간 시티투어 (세단)', priceAdult: '2,500 바트', priceChild: '2,500 바트' },
            { name: '10시간 시티투어 (봉고차)', priceAdult: '2,700 바트', priceChild: '2,700 바트' }
        ],
        notices: "✅ 기사 매너팁(100-300B) 별도.\n지역별(안다만 외곽 등) 추가 요금이 발생할 수 있습니다.\n공항 샌딩 가능 (시간 내)",
        luggagePrice: 0
    },
    {
        id: 'p_airport_transfer',
        name: '푸켓 공항 픽업/샌딩 서비스',
        price: '800 THB ~',
        thumbnail: '/images/airport_transfer.jpg',
        detailImage: '/images/airport_transfer.jpg',
        description: '공항과 호텔 간의 가장 편안하고 안전한 이동 수단입니다.',
        category: 'TOUR',
        courses: [
            { name: '푸켓 공항 ↔ 호텔 (세단)', priceAdult: '800 바트', priceChild: '800 바트' },
            { name: '푸켓 공항 ↔ 호텔 (봉고차)', priceAdult: '900 바트', priceChild: '900 바트' },
            { name: '푸켓 공항 ↔ 카오락 (세단)', priceAdult: '2,000 바트', priceChild: '2,000 바트' },
            { name: '푸켓 공항 ↔ 카오락 (봉고차)', priceAdult: '2,500 바트', priceChild: '2,500 바트' }
        ],
        luggagePrice: 0
    }
];

export const bananaBeachTours = [
    {
        id: 'banana-premium',
        name: '바나나비치 프리미엄',
        prices: { adult: 2475, child: 2175 },
        description: '액티비티 포함 풀패키지'
    }
];
