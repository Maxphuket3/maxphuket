export interface ProductCourse {
    name: string;
    priceAdult: string;
    priceChild: string;
    features: string[];
}

export interface PickupOption {
    area: string;
    price: number;
}

export interface Product {
    id: string;
    name: string;
    price: string;
    thumbnail: string;
    detailImage: string;
    category?: string;

    // Detailed Info
    description: string;
    highlights: string[];
    inclusions: string[];
    exclusions: string[];
    vehicleInfo: string;
    pricePolicy: string;
    cancellationPolicy: string;

    // Optional Course List
    courses?: ProductCourse[];
    pickupOptions?: PickupOption[]; // Added for variable pickup costs (e.g., Simon Cabaret)
    importantNotes?: string[];

    // New fields for Comparison System
    badges?: string[];
    luggagePrice?: number;
}

export const MAIN_PRODUCTS: Product[] = [
    {
        id: 'p_banana',
        name: '바나나비치 반일 투어 (오전/오후)',
        price: '1,475 THB ~',
        thumbnail: '/images/banana_beach.jpg',
        detailImage: '/images/banana_beach.jpg',
        description: '푸켓의 숨겨진 보석, 바나나 비치에서 즐기는 반일(오전/오후) 투어입니다. 맑은 바다에서의 스노클링과 다양한 해양 액티비티를 취향에 맞는 코스로 즐겨보세요.',
        highlights: [
            '짧은 이동 시간 (스피드보트 15분)',
            '프라이빗한 전용 비치 시설 이용',
            '다양한 해양 스포츠 선택 가능',
            '인생샷을 위한 투명 카약 & 그네'
        ],
        courses: [
            {
                name: '프리미엄 코스',
                priceAdult: '2,475 바트',
                priceChild: '1,925 바트',
                features: ['스노클링 1회', '점심 뷔페', '액티비티 1종 선택 (파라세일링/바나나보트 등)']
            },
            {
                name: '스노클링 코스',
                priceAdult: '1,925 바트',
                priceChild: '1,675 바트',
                features: ['스노클링 2회', '점심 뷔페']
            },
            {
                name: '에브리데이 코스',
                priceAdult: '1,475 바트',
                priceChild: '1,250 바트',
                features: ['가벼운 식사', '씨카약 체험', '비치 타월 불포함']
            }
        ],
        inclusions: [
            '호텔 왕복 픽업/드롭 (무료 구역)',
            '왕복 스피드보트 및 입장료',
            '현지 가이드 (영어)',
            '여행자 보험',
            '스노클링 장비 및 구명조끼'
        ],
        exclusions: [
            '개인 경비 및 매너팁',
            '선택 액티비티 추가 비용',
            '오리발 대여 (별도 문의)',
            '수하물 보관료'
        ],
        vehicleInfo: '무료 픽업: 빠통, 까론, 까따, 푸켓 타운, 방타오, 라구나\n유료 픽업: 나이양, 마이카오, 공항 근처 (단독 차량 2,500바트/대)',
        pricePolicy: '수하물(캐리어) 소지 시 개당 300바트 추가 요금이 발생합니다.\n아동 기준: 만 4세 ~ 11세 / 만 3세 이하 무료',
        cancellationPolicy: '3일 전 50% 환불\n2일 전 30% 환불\n1일 전 및 당일 환불 불가',
        importantNotes: [
            '수영복은 미리 옷 안에 착용하고 오시는 것을 권장합니다.',
            '아쿠아 슈즈, 선글라스, 자외선 차단제, 여벌 옷을 준비해 주세요.',
            '기상 악화 시 투어가 취소될 수 있으며 이 경우 전액 환불됩니다.'
        ]
    },
    {
        id: 'p1',
        name: '럭셔리 피피섬 스피드보트 투어',
        price: '2,500 THB',
        thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
        detailImage: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
        description: '푸켓에서 가장 아름다운 피피섬을 프라이빗하고 럭셔리하게 즐기는 프리미엄 투어입니다. 붐비는 시간을 피해 여유로운 스노클링과 휴식을 만끽하세요.',
        highlights: [
            '최신형 스피드보트로 빠르고 쾌적한 이동',
            '마야 베이, 필레 라군 등 핵심 포인트 방문',
            '프리미엄 점심 뷔페 및 무제한 음료 제공',
            '한국어 가능한 전문 가이드 동행'
        ],
        inclusions: [
            '호텔 왕복 픽업 서비스 (주요 지역)',
            '스피드보트 왕복 및 보험',
            '스노클링 장비 (마스크, 오리발)',
            '점심 식사 (인터내셔널 뷔페)',
            '계절 과일 및 음료',
            '국립공원 입장료'
        ],
        exclusions: [
            '개인 경비 및 매너팁',
            '비치 체어 대여료',
            '일부 외곽 지역 픽업 추가 비용'
        ],
        vehicleInfo: '도요타 콤뮤터 (12인승) 또는 동급 밴으로 호텔 로비에서 픽업합니다.',
        pricePolicy: '성인/아동 동일 요금 (3세 미만 무료)',
        cancellationPolicy: '투어 24시간 전까지 100% 환불 가능, 당일 취소 불가'
    },
    {
        id: 'p2',
        name: '라차 & 산호섬 올데이 투어',
        price: '1,800 THB',
        thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        detailImage: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80',
        description: '에메랄드 빛 바다와 하얀 모래사장, 완벽한 휴양을 위한 라차섬과 산호섬 투어. 스노클링 초보자에게도 최적의 장소입니다.',
        highlights: [
            '맑고 투명한 라차섬에서의 스노클링',
            '산호섬 해변에서의 자유 시간',
            '해양 스포츠 옵션 가능 (패러세일링, 씨워킹 등)'
        ],
        inclusions: [
            '왕복 스피드보트',
            '호텔 픽업/샌딩',
            '중식 (현지식)',
            '스노클링 장비',
            '생수 및 과일'
        ],
        exclusions: [
            '해양 스포츠 별도 비용',
            '매너팁'
        ],
        vehicleInfo: '지역에 따라 썽태우 또는 밴으로 픽업 진행됩니다.',
        pricePolicy: '아동(만 3-11세) 1,200 THB',
        cancellationPolicy: '투어 전일 18:00까지 무료 취소 가능'
    },
    {
        id: 'p3',
        name: '팡아만 제임스본드섬 선셋 투어',
        price: '2,800 THB',
        thumbnail: 'https://images.unsplash.com/photo-1528181304800-2f5402924df7?auto=format&fit=crop&w=800&q=80',
        detailImage: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80',
        description: '석양과 함께 즐기는 팡아만의 신비로운 절경. 제임스본드섬을 배경으로 인생샷을 남기고 로맨틱한 선셋 디너를 즐기세요.',
        highlights: [
            '대형 크루즈로 편안한 이동',
            '씨카누 체험 포함',
            '선상 선셋 디너 제공'
        ],
        inclusions: [
            '왕복 크루즈',
            '호텔 픽업',
            '선상 디너',
            '씨카누 체험',
            '국립공원 입장료'
        ],
        exclusions: [
            '주류 및 별도 음료',
            '팁'
        ],
        vehicleInfo: '미니버스 픽업',
        pricePolicy: '성인/아동 동일',
        cancellationPolicy: '출발 2일 전까지 취소 가능'
    },
    {
        id: 'p4',
        name: '마이카오 비치 공항 선셋 스냅',
        price: '1,500 THB',
        thumbnail: 'https://images.unsplash.com/photo-1527685276677-789d7b420793?auto=format&fit=crop&w=800&q=80',
        detailImage: 'https://images.unsplash.com/photo-1527685276677-789d7b420793?auto=format&fit=crop&w=1200&q=80',
        description: '비행기와 함께 찍는 특별한 인생샷. 전문 작가가 동행하여 최고의 순간을 담아드립니다.',
        highlights: [
            '전문 포토그래퍼 동행',
            '원본 100장 이상, 보정본 20장 제공',
            '일몰 시간대 촬영'
        ],
        inclusions: [
            '전문 촬영 작가',
            '차량 이동 (빠통 기준)'
        ],
        exclusions: [
            '의상 대여',
            '개인 경비'
        ],
        vehicleInfo: '승용차 이동',
        pricePolicy: '팀당 요금 (최대 4인)',
        cancellationPolicy: '촬영 3일 전 취소 시 100% 환불'
    },
    {
        id: 'p5',
        name: '올드타운 가이드 워킹 투어',
        price: '900 THB',
        thumbnail: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80',
        detailImage: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
        description: '푸켓의 역사와 문화를 깊이 있게 체험하는 워킹 투어. 현지 가이드와 함께 숨겨진 명소와 맛집을 탐방합니다.',
        highlights: [
            '시노-포르투기스 건축 양식 설명',
            '현지 로컬 간식 시식',
            '인생샷 명소 안내'
        ],
        inclusions: [
            '전문 가이드',
            '간식 및 음료'
        ],
        exclusions: [
            '교통비 (미팅 장소 집결)',
            '개인 쇼핑'
        ],
        vehicleInfo: '도보 투어',
        pricePolicy: '1인 기준 요금',
        cancellationPolicy: '투어 전일 취소 가능'
    },
    {
        id: 'p_simon',
        name: '사이먼 카바레 쇼 (빠통)',
        price: '800 THB ~',
        thumbnail: '/images/simon_cabaret.png',
        detailImage: '/images/simon_cabaret.png',
        description: '푸켓 3대 트랜스젠더 쇼 중 하나인 사이먼 카바레 쇼! 화려한 의상과 무대, 1991년부터 이어진 전통 있는 공연을 즐겨보세요.',
        highlights: [
            '푸켓 최초의 카바레 쇼 (1991년 오픈)',
            '화려한 무대 장치와 의상',
            '세계 각국의 문화 공연',
            '공연 후 출연진과 기념 촬영 가능'
        ],
        courses: [
            {
                name: 'VIP석 (1층)',
                priceAdult: '1,000 바트',
                priceChild: '800 바트',
                features: ['1층 전 좌석', '생생한 관람 시야']
            },
            {
                name: '일반석 (2층)',
                priceAdult: '800 바트',
                priceChild: '600 바트',
                features: ['2층 전 좌석', '전체적인 무대 조망']
            }
        ],
        pickupOptions: [
            { area: '빠통, 칼림', price: 50 },
            { area: '카론, 트리트랑, 칼리마', price: 80 },
            { area: '까따, 나카레이', price: 100 },
            { area: '까말라', price: 130 },
            { area: '방타오, 라구나, 수린', price: 200 }
        ],
        inclusions: [
            '사이먼 카바레 쇼 입장권',
            '선택한 좌석 관람'
        ],
        exclusions: [
            '호텔 픽업/드롭 (옵션 선택 시 유료)',
            '공연 후 배우 팁 (기념 촬영 시)',
            '음료 및 스낵'
        ],
        vehicleInfo: '지역별 유료 픽업 서비스가 제공됩니다. (편도/1인 기준)\n푸켓 타운, 찰롱, 라와이 등 외곽 지역은 단독 차량 문의 바랍니다.',
        pricePolicy: '성인: 만 12세 이상\n아동: 만 4세~11세 (키 140cm 미만)\n유아: 만 3세 이하 (좌석 미점유 시 무료)',
        cancellationPolicy: '예약 확정 후 변경 및 환불 불가 상품입니다.',
        importantNotes: [
            '공연 시간: 1부 18:00 / 2부 19:30 / 3부 21:00',
            '공연 시작 20분 전까지 도착해주세요.',
            '공연 중 사진/영상 촬영은 금지되어 있습니다.',
            '외부 음식물 반입이 불가합니다.'
        ]
    },
    {
        id: 'p_similan_seastar',
        name: '시밀란 씨스타 (Seastar)',
        price: '2,800 THB ~',
        thumbnail: '/images/seastar_andaman.jpg',
        detailImage: '/images/seastar_andaman.jpg',
        description: '시밀란 투어의 절대 강자! 뷰포인트를 마지막에 방문하여 인파를 피하고, 전용 부두와 쾌적한 서비스를 제공합니다.',
        category: 'SIMILAN',
        badges: ['뷰포인트 마지막', '오리발 무료', '전연령 보험(74세)'],
        luggagePrice: 200,
        highlights: ['전용 부두 출발', '4번섬 점심', '가장 대중적인 투어'],
        courses: [
            {
                name: '스피드보트',
                priceAdult: '2,800 바트',
                priceChild: '2,100 바트',
                features: ['빠른 이동', '가성비 추천']
            },
            {
                name: '카타마란',
                priceAdult: '3,100 바트',
                priceChild: '2,400 바트',
                features: ['2층 구조 (상)', '안정적인 운행']
            }
        ],
        inclusions: ['호텔 왕복 픽업', '조/중/석식 제공', '스노클링 장비', '오리발', '비치타올 (무료)'],
        exclusions: ['개인 경비', '매너팁'],
        vehicleInfo: '빠통 06:00 / 공항 06:30 / 카오락 07:00 픽업\n부두 도착 17:00\n*카오락 왕복 시 1인 100바트 할인',
        pricePolicy: '성인: 만 12세 이상 / 아동: 만 3-11세',
        cancellationPolicy: '투어 2일 전 100% 환불 가능',
        importantNotes: ['만 2세 ~ 74세 보험 적용', '임산부 탑승 불가', '여권 사본 지참 필수']
    },
    {
        id: 'p_similan_sawanu',
        name: '시밀란 사와누 (Sawanu)',
        price: '3,500 THB ~',
        thumbnail: '/images/sawanu_travel.jpg',
        detailImage: '/images/sawanu_travel.jpg',
        description: '최상급 2층 카타마란으로 즐기는 럭셔리 투어. 8번섬 뷰포인트를 가장 먼저 방문하여 인생샷을 남기세요.',
        category: 'SIMILAN',
        badges: ['뷰포인트 1순위', '2층 카타마란 최상', '푸켓/카오락 교차 불가'],
        luggagePrice: 200,
        highlights: ['8번섬 가장 먼저 도착', '최신형 카타마란', '대형 요트'],
        courses: [
            {
                name: '카타마란',
                priceAdult: '3,500 바트',
                priceChild: '3,100 바트',
                features: ['2층 구조 (최상)', '편안한 좌석', '흔들림 적음']
            }
        ],
        inclusions: ['프리미엄 조/중/석식', '스노클링 장비', '오리발(렌탈 200B)', '비치타올'],
        exclusions: ['오리발 대여료', '개인 경비', '매너팁'],
        vehicleInfo: '빠통 05:30 / 공항 06:30 / 카오락 07:00 픽업\n부두 도착 16:30\n*카오락 왕복 시 1인 200바트 할인',
        pricePolicy: '성인: 만 12세 이상 / 아동: 만 4-11세',
        cancellationPolicy: '투어 2일 전 100% 환불 가능',
        importantNotes: ['만 2세 ~ 74세 보험 적용', '푸켓 픽업 -> 카오락 드랍 불가', '임산부 탑승 불가']
    },
    {
        id: 'p_similan_once',
        name: '시밀란 원스 (Once)',
        price: '3,000 THB ~',
        thumbnail: '/images/once_travel.jpg',
        detailImage: '/images/once_travel.jpg',
        description: '아침잠이 많다면 원스! 비교적 늦은 7시 출발로 여유롭게, 2층 카타마란으로 편안하게 즐기세요.',
        category: 'SIMILAN',
        badges: ['늦은 출발(07:00)', '뷰포인트 1순위', '2층 카타마란'],
        luggagePrice: 200,
        highlights: ['상대적으로 여유로운 일정', '사진 촬영에 진심', '4번섬 점심'],
        courses: [
            {
                name: '카타마란',
                priceAdult: '3,000 바트',
                priceChild: '2,500 바트',
                features: ['2층 구조 (최상)', '여유로운 출발']
            }
        ],
        inclusions: ['호텔 왕복 픽업', '식사 및 음료', '스노클링 장비', '오리발', '비치타올'],
        exclusions: ['개인 경비', '매너팁'],
        vehicleInfo: '빠통 07:00 / 공항 08:30 / 카오락 08:30 픽업\n부두 도착 18:00\n*카오락 왕복 시 1인 100바트 할인',
        pricePolicy: '성인: 만 12세 이상 / 아동: 만 4-11세',
        cancellationPolicy: '투어 2일 전 100% 환불 가능',
        importantNotes: ['만 2세 ~ 70세 이용 가능', '70세 이상 예약 불가', '임산부 탑승 불가']
    },
    {
        id: 'p_similan_love',
        name: '시밀란 러브안다만 (Love)',
        price: '3,300 THB ~',
        thumbnail: '/images/love_andaman.jpg',
        detailImage: '/images/love_andaman.jpg',
        description: '풀파티 분위기의 젊은 감성! 트렌디한 굿즈와 전용 라운지, 뷰포인트를 1순위로 방문하는 힙한 투어.',
        category: 'SIMILAN',
        badges: ['뷰포인트 1순위', '풀파티 분위기', '젊은 감성'],
        luggagePrice: 200,
        highlights: ['트렌디한 굿즈 / 라운지', '4번섬 점심', '1층형 대형 카타마란'],
        courses: [
            {
                name: '스피드/카타',
                priceAdult: '3,300 바트',
                priceChild: '2,600 바트',
                features: ['1층 구조 (상)', '넓은 공간']
            }
        ],
        inclusions: ['호텔 왕복 픽업', '전용 라운지 이용', '식사 및 간식', '스노클링 장비', '오리발(보증금)', '비치타올'],
        exclusions: ['개인 경비', '매너팁'],
        vehicleInfo: '빠통 06:00 / 공항 06:30 / 카오락 07:00 픽업\n부두 도착 17:00\n*카오락 왕복 할인: 스피드 300바트 / 카타 100바트',
        pricePolicy: '성인: 만 12세 이상 / 아동: 만 4-11세',
        cancellationPolicy: '투어 2일 전 100% 환불 가능',
        importantNotes: ['만 2세 ~ 60세 이용 가능 (엄격)', '60세 초과 탑승 불가', '임산부 탑승 불가']
    },
    {
        id: 'p_similan_wow',
        name: '시밀란 와우안다만 (Wow)',
        price: '3,000 THB ~',
        thumbnail: '/images/wow_andaman.jpg',
        detailImage: '/images/wow_andaman.jpg',
        description: '유일하게 8번섬에서 점심을! 뷰포인트는 중간에 방문하며, 스피드보트와 카타마란 모두 최신형입니다.',
        category: 'SIMILAN',
        badges: ['8번섬 점심 식사', '주6일 운항(일 휴무)', '스피드/카타 보유'],
        luggagePrice: 300,
        highlights: ['유일한 8번섬 점심', '중간 코스 뷰포인트', '활기찬 분위기'],
        courses: [
            {
                name: '스피드보트',
                priceAdult: '3,000 바트',
                priceChild: '2,300 바트',
                features: ['최신 장비', '에너지 넘치는 분위기']
            },
            {
                name: '카타마란',
                priceAdult: '3,500 바트',
                priceChild: '2,500 바트',
                features: ['2층 구조 (최상)', '여유로운 공간']
            }
        ],
        inclusions: ['호텔 왕복 픽업', '식사 및 음료', '스노클링 장비', '오리발', '비치타올'],
        exclusions: ['개인 경비', '매너팁'],
        vehicleInfo: '빠통 06:00 / 공항 06:30 / 카오락 07:00 픽업\n부두 도착 17:00\n*카오락 왕복 시 성인 500바트 / 아동 300바트 할인',
        pricePolicy: '성인: 만 12세 이상 / 아동: 만 4-11세',
        cancellationPolicy: '투어 2일 전 100% 환불 가능',
        importantNotes: ['만 4세 ~ 70세 보험 적용', '일요일 운항 안 함', '임산부 탑승 불가']
    }
];
