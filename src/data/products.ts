export interface Product {
    id: string;
    name: string;
    price: string;
    thumbnail: string;
    detailImage: string;
    description: string;
    category?: 'SIMILAN' | 'TICKET' | 'TOUR' | string;
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
        name: string;
        price: number;
    }[];
    maxOptionSelection?: number;
    caution?: string;
    dinnerPricing?: {
        adult: number;
        child: number;
    };
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
                priceAdult: '2,500 바트',
                priceChild: '2,200 바트',
                features: ['스노클링 1회', '점심 뷔페', '액티비티 1종 선택 (파라세일링/바나나보트 등)'],
                description: '푸켓의 숨겨진 보석, 바나나비치를 완벽하게 즐기는 풀패키지입니다. 럭셔리한 카타마란 요트 탑승과 프리미엄 라운지 이용, 그리고 모든 해양 액티비티를 여유롭게 즐길 수 있는 최고의 선택입니다.',
                caution: '임산부, 심혈관 질환자, 65세 이상 노약자는 안전을 위해 참여가 제한될 수 있습니다. 수영복을 미리 착용하고 오시면 편리합니다.'
            },
            {
                name: '스노클링 코스',
                priceAdult: '2,000 바트',
                priceChild: '1,800 바트',
                features: ['스노클링 2회', '점심 뷔페'],
                description: '바다 속 열대어와 산호초를 가장 가까이에서 만나는 코스입니다. 맑은 시야를 자랑하는 포인트에서 스노클링을 즐기며 푸켓 바다의 아름다움을 만끽하세요. 가성비와 알찬 구성을 모두 잡았습니다.',
                caution: '바다생물에게 먹이를 주거나 산호를 밟는 행위는 금지되어 있습니다. 개인 수건과 선크림을 지참해 주세요.'
            },
            {
                name: '에브리데이 코스 (오후 반일)',
                priceAdult: '1,500 바트',
                priceChild: '1,300 바트',
                features: ['가벼운 식사', '씨카약 체험', '비치 타월 불포함'],
                description: '늦잠을 자고 싶은 분들을 위한 오후 전용 힐링 코스입니다. 시원한 바닷바람을 맞으며 해변에서 자유시간을 갖고, 아름다운 일몰 전까지 여유롭게 휴양을 즐기기에 안성맞춤입니다.',
                caution: '오후 투어 특성상 픽업 시간이 정확해야 하니 호텔 로비에 10분 전 대기 부탁드립니다.'
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
        ],
        provider: 'GODIVE',
        luggagePrice: 100,
        onSiteFees: {
            entranceAdult: 100,
            entranceChild: 50,
            guideTip: 50
        },
        pickupZones: [
            { zones: ['Patong', 'Kata', 'Karon', 'Kalim', 'Kamala', '파통', '까타', '카론', '칼림', '까말라'], priceCar: 0, priceVan: 0 },
            { zones: ['Solitude', 'Noku', 'Seabed', '솔리튜드', '노쿠', '씨베드'], priceCar: 600, priceVan: 1000 },
            { zones: ['Laguna', 'Bangtao', 'Surin', 'Rawai', 'Nai Harn', 'Panwa', 'Phuket Town', '라구나', '방타오', '수린', '라와이', '나이한', '판와', '푸켓타운'], priceCar: 1000, priceVan: 1400 },
            { zones: ['Airport', 'Mai Khao', 'Nai Yang', 'Naithon', '공항', '마이카오', '나이양', '나이톤'], priceCar: 1200, priceVan: 1500 }
        ]
    },
    {
        id: 'p1',
        name: '라차섬 투어 (Racha Island Tour)',
        price: '1,200 THB ~',
        thumbnail: '/images/racha_island.jpg',
        detailImage: '/images/racha_island.jpg',
        description: '에메랄드 빛 바다와 백사장이 펼쳐진 라차섬(Racha Yai)으로 떠나는 힐링 투어입니다. 스노클링 포인트가 환상적이에요.',
        highlights: [
            '맑고 투명한 바다에서의 스노클링',
            '여유로운 자유 시간',
            '맛있는 현지식 점심 식사'
        ],
        courses: [
            {
                name: '스탠다드 투어',
                priceAdult: '1,200 바트',
                priceChild: '900 바트',
                features: ['스노클링', '점심 식사', '기본 픽업 포함']
            }
        ],
        inclusions: ['호텔 왕복 픽업', '스피드보트', '점심 식사', '스노클링 장비', '보험'],
        exclusions: ['개인 경비', '매너팁'],
        vehicleInfo: '주요 지역 무료 픽업 (빠통/카타/카론 등)\n외곽 지역 추가 요금 발생',
        pricePolicy: '성인: 만 12세 이상 / 아동: 만 4-11세',
        cancellationPolicy: '투어 2일 전 전액 환불 가능',
        importantNotes: ['멀미약을 준비하시면 좋습니다.'],
        provider: 'GODIVE',
        luggagePrice: 100
    },
    {
        id: 'p_simon',
        name: '사이먼 캬바레 쇼 (Simon Cabaret)',
        price: '800 THB',
        thumbnail: '/images/simon_cabaret.png',
        detailImage: '/images/simon_cabaret.png',
        description: '푸켓 3대 쇼 중 하나로 꼽히는 화려한 트랜스젠더 쇼! 웅장한 무대와 화려한 의상, 다채로운 퍼포먼스를 즐겨보세요.',
        highlights: [
            '화려한 의상과 무대 연출',
            '다국적 테마의 옴니버스 공연',
            '공연 후 출연진과 사진 촬영 가능 (유료)'
        ],
        courses: [
            {
                name: 'VIP 좌석',
                priceAdult: '1,000 바트',
                priceChild: '1,000 바트', // 쇼는 대개 동일
                features: ['1층 중앙 뷰', '편안한 좌석']
            },
            {
                name: '일반석 (Regular)',
                priceAdult: '800 바트',
                priceChild: '800 바트',
                features: ['2층 또는 사이드 좌석']
            }
        ],
        inclusions: ['공연 관람 티켓'],
        exclusions: ['호텔 픽업 (개별 이동)', '매너팁', '출연진과 사진 촬영 팁'],
        vehicleInfo: '개별 이동 상품입니다. (빠통 비치 남쪽 위치)',
        pricePolicy: '만 4세 이상/신장 100cm 이상 동일 요금',
        cancellationPolicy: '공연 당일 취소/환불 불가',
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
        luggagePrice: 300,
        provider: 'SEASTAR',
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
        luggagePrice: 300,
        provider: 'SAWANU',
        highlights: ['8번섬 가장 먼저 도착', '최신형 카타마란', '대형 요트'],
        courses: [
            {
                name: '카타마란',
                priceAdult: '3,500 바트',
                priceChild: '3,100 바트',
                features: ['2층 구조 (최상)', '편안한 좌석', '흔들림 적음']
            }
        ],
        inclusions: ['프리미엄 조/중/석식', '스노클링 장비', '오리발(렌탈 300B)', '비치타올'],
        exclusions: ['오리발 대여료', '개인 경비', '매너팁'],
        vehicleInfo: '빠통 05:30 / 공항 06:30 / 카오락 07:00 픽업\n부두 도착 16:30\n*카오락 왕복 시 1인 300바트 할인',
        pricePolicy: '성인: 만 12세 이상 / 아동: 만 4-11세',
        cancellationPolicy: '투어 2일 전 100% 환불 가능',
        importantNotes: ['만 2세 ~ 74세 보험 적용', '푸켓 픽업 -> 카오락 드랍 불가', '임산부 탑승 불가'],
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
        luggagePrice: 300,
        provider: 'ONCE',
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
        luggagePrice: 300,
        provider: 'LOVE_ANDAMAN',
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
        provider: 'WOW_ANDAMAN',
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
    },
    {
        id: 'p_tiger_park',
        name: '타이거 파크 빅부다 푸켓 (Tiger Park)',
        price: '1,600 THB ~',
        thumbnail: '/images/tiger_park.jpg',
        detailImage: '/images/tiger_park.jpg',
        description: '원하는 크기의 호랑이 2종류를 선택하여 교감하는 패키지입니다. 빅부다 근처 찰롱 지역에 위치해 있습니다.',
        category: 'TICKET',
        badges: ['2가지 선택', '빅부다 근처', '인생샷 명소'],
        highlights: ['다양한 크기의 호랑이 체험', '전문 조련사 동행', '빅부다 관광 연계 가능'],
        courses: [
            {
                name: '2가지 선택 패키지 (1인)',
                priceAdult: '1,600 바트',
                priceChild: '1,600 바트',
                features: ['원하는 호랑이 2종류 선택', '모든 연령/신장 가능']
            }
        ],
        options: [
            { name: "Big Tiger (19-48개월/160cm↑)", price: 0 },
            { name: "Medium Tiger (13-18개월)", price: 0 },
            { name: "Small Tiger (6-12개월)", price: 0 },
            { name: "Smallest Tiger (3-5개월)", price: 0 },
            { name: "New Born (1-2개월/160cm↓)", price: 0 }
        ],
        maxOptionSelection: 2,
        inclusions: ['선택한 호랑이 2종류 체험', '전문 조련사', '보험'],
        exclusions: ['픽업/샌딩 (개별 이동)', '사진 촬영 기사 (별도 구매)', '음료/식사'],
        vehicleInfo: '개별 이동 필수 (픽업 불포함)\n위치: Chalong, Phuket (Near Big Buddha)\n운영시간: 09:00 - 18:00',
        pricePolicy: '만 15세 미만 & 160cm 미만: New Born, Smallest만 이용 가능\n만 18세 이상 & 160cm 이상: Giant, Big 이용 가능\n규정에 맞게 2가지를 선택해주세요.',
        cancellationPolicy: '방문 1일 전 무료 취소 가능',
        importantNotes: ['사진 촬영 시 플래시 사용 금지', '조련사의 지시를 반드시 따라주세요.', '임산부 및 노약자 체험 제한될 수 있음'],
        provider: 'TIGERPARK',
        luggagePrice: 0
    },
    {
        id: 'phuket-fantasea',
        name: '푸켓 환타시 쇼 (Phuket FantaSea)',
        price: '1,800 THB ~',
        thumbnail: '/images/fantasea.jpg',
        detailImage: '/images/fantasea.jpg',
        description: '태국의 신화와 전통을 최첨단 조명과 화려한 퍼포먼스로 재현한 푸켓 최고의 쇼입니다. 수십 마리의 코끼리가 등장하는 웅장한 무대를 만나보세요.',
        category: 'HIT',
        badges: ['최대 규모 쇼', '코끼리 출연', '화/금/일 운영'],
        highlights: ['웅장한 스케일의 코끼리 공연', '다양한 볼거리의 테마파크', '세계 최대 규모 뷔페 식당'],
        courses: [
            {
                name: '쇼 관람 (일반석)',
                priceAdult: '1,800 바트',
                priceChild: '1,800 바트',
                features: ['쇼 관람권', '일반석', '테마파크 입장']
            },
            {
                name: '쇼 + 디너 (일반석)',
                priceAdult: '2,200 바트',
                priceChild: '2,000 바트',
                features: ['쇼 관람권', '인터내셔널 뷔페', '일반석']
            }
        ],
        options: [
            { name: '골드석 업그레이드 (인당)', price: 350 }
        ],
        caution: '공연장 내 사진 촬영은 엄격히 금지되어 있으며, 입구에서 카메라를 보관해야 합니다.',
        pickupOptions: [
            { name: '왕복 픽업 서비스 (조인 밴)', price: 350 }
        ],
        inclusions: ['선택한 쇼/디너 티켓', '테마파크 입장료'],
        exclusions: ['개인 경비', '매너팁', '이동 서비스 (옵션 구매)'],
        vehicleInfo: '픽업 서비스 신청 시 호텔 로비 픽업\n운영일: 화, 금, 일\n개장 18:00 / 공연 21:00 ~ 22:10\n디너 식사: 18:00 - 21:00',
        pricePolicy: '성인/아동 구분 없음 (좌석 점유 시 동일 요금)\n만 4세 미만 & 키 100cm 미만 무료 (좌석 없음)\n키 101cm ~ 140cm 아동 요금 적용 (디너 이용 시)',
        cancellationPolicy: '공연 당일 환불 불가',
        importantNotes: ['공연장 내 촬영 금지 (휴대폰 보관 필수)', '화/금/일 주 3회 운영', '좌석은 당일 현장에서 배정됩니다.']
    },
    {
        id: 'siam-niramit',
        name: '시암 니라밋 쇼 (Siam Niramit)',
        price: '1,350 THB ~',
        thumbnail: '/images/siam_niramit_new.jpg',
        detailImage: '/images/siam_niramit_new.jpg',
        description: '태국 최대 규모의 무대 장치와 실제 강물이 흐르는 압도적인 스케일의 문화 공연입니다.',
        category: 'HIT',
        badges: ['기네스북 무대', '화요일 휴무', '태국 역사 테마'],
        highlights: ['100명 이상의 출연진과 500여 벌의 의상', '실제 강이 흐르는 무대 연출', '다양한 전통 마을 체험'],
        courses: [
            {
                name: '실버석 (Silver Seat)',
                priceAdult: '1,350 바트',
                priceChild: '1,350 바트',
                features: ['쇼 관람권', '실버석', '사전 거리 공연 관람']
            },
            {
                name: '골드석 (Gold Seat)',
                priceAdult: '1,550 바트',
                priceChild: '1,550 바트',
                features: ['쇼 관람권', '골드석(중앙)', '사전 거리 공연 관람']
            },
            {
                name: '플래티넘석 (Platinum Seat)',
                priceAdult: '1,700 바트',
                priceChild: '1,700 바트',
                features: ['쇼 관람권', '플래티넘석(중앙 정면)', '사전 거리 공연 관람']
            }
        ],
        dinnerPricing: { adult: 350, child: 200 },
        caution: '공연 시작 전 전통 마을 체험을 위해 오후 7시까지 도착을 권장합니다.',
        pickupOptions: [
            { name: '왕복 픽업 서비스', price: 350 }
        ],
        luggagePrice: 100,
        inclusions: ['선택한 좌석 쇼 관람권', '테마파크 입장 및 사전 공연', '디너 포함 시 뷔페 식사'],
        exclusions: ['개인 경비', '매너팁', '전통 의상 대여 (250바트)', '이동 서비스 (옵션 구매)'],
        vehicleInfo: '픽업 서비스 신청 시 호텔 로비 픽업\n운영일: 수, 목, 금, 토, 일, 월 (화요일 휴무)\n게이트 오픈: 17:30 / 쇼 시작: 20:30',
        pricePolicy: '성인: 키 141cm 이상\n아동: 만 4세~11세 & 키 100cm~140cm\n유아: 만 4세 미만 & 키 100cm 미만 무료 (좌석 없음)\n디너 뷔페 추가 시 성인 +350 / 아동 +200',
        cancellationPolicy: '공연 당일 환불 불가',
        importantNotes: ['공연장 내 촬영 금지 (카메라 보관)', '디너 시간: 18:00 - 20:00', '쇼 시작 30분 전 입장 권장']
    },
    {
        id: 'p_hanuman_world',
        name: '하누만 월드 짚라인 투어 (Hanuman World)',
        price: '1,325 THB ~',
        thumbnail: '/images/hanuman_world.jpg',
        detailImage: '/images/hanuman_world.jpg',
        description: '푸켓의 열대우림을 날아다니는 짜릿한 경험! 최신 안전 장비와 함께 즐기는 다이내믹한 짚라인 어드벤처입니다. 다양한 코스와 롤러 짚라인을 즐겨보세요.',
        category: 'TOUR',
        badges: ['액티비티', '스릴 만점', '숲속 힐링'],
        highlights: ['다양한 난이도의 짚라인 코스', '스릴 넘치는 롤러 짚라인', '숲속 스카이워크 산책'],
        courses: [
            {
                name: '결합 패키지 A (32플랫폼+롤러+스카이워크+식사)',
                priceAdult: '2,917 바트',
                priceChild: '2,917 바트',
                features: ['짚라인 32플랫폼', '롤러 짚라인', '스카이워크', '점심 식사']
            },
            {
                name: '결합 패키지 B (18플랫폼+롤러+스카이워크+식사)',
                priceAdult: '2,543 바트',
                priceChild: '2,543 바트',
                features: ['짚라인 18플랫폼', '롤러 짚라인', '스카이워크', '점심 식사']
            },
            {
                name: '결합 패키지 C (10플랫폼+롤러+스카이워크+식사)',
                priceAdult: '2,168 바트',
                priceChild: '2,168 바트',
                features: ['짚라인 10플랫폼', '롤러 짚라인', '스카이워크', '점심 식사']
            },
            {
                name: '짚라인 32 플랫폼 (World A)',
                priceAdult: '2,475 바트',
                priceChild: '2,475 바트',
                features: ['최상급 풀코스', '식사 포함', '약 2시간 소요']
            },
            {
                name: '짚라인 18 플랫폼 (World B)',
                priceAdult: '1,850 바트',
                priceChild: '1,850 바트',
                features: ['인기 코스', '적당한 난이도', '약 1시간 30분 소요']
            },
            {
                name: '짚라인 10 플랫폼 (World C)',
                priceAdult: '1,325 바트',
                priceChild: '1,325 바트',
                features: ['체험 코스', '가볍게 즐기기', '약 1시간 소요']
            }
        ],
        inclusions: ['선택한 코스 체험', '안전 장비 및 가이드', '왕복 픽업 (무료 구역)', '보험'],
        exclusions: ['개인 경비', '매너팁', '추가 픽업 비용 (유료 구역)'],
        vehicleInfo: '무료 픽업: 빠통, 카론, 카타, 칼림, 카말라, 수린, 방타오, 라와이, 찰롱, 푸켓타운\n유료 픽업: 아오포, 라얀, 나이톤, 마이카오 등 (1인 500바트/2인 이상 인당 300바트)',
        pricePolicy: '체험 가능 연령: 만 4세 ~ 60세\n몸무게 제한: 120kg 이하\n롤러 짚라인: 40kg ~ 100kg 탑승 가능',
        cancellationPolicy: '투어 1일 전 무료 취소 가능',
        importantNotes: [
            '운동화 착용 필수 (슬리퍼/샌들 불가)',
            '운영 시간: 08:00 / 10:00 / 13:00 / 15:00',
            '건강 상태에 따라 탑승이 제한될 수 있습니다.'
        ],
        provider: 'HANUMAN',
        luggagePrice: 0 // No luggage info provided, assume 0 or handle manually
    },
    {
        id: "pp-khai",
        name: "피피섬 + 카이섬 투어",
        price: "1,600 THB ~",
        thumbnail: "/images/phiphi-turtle.jpg",
        detailImage: "/images/phiphi-turtle.jpg",
        description: "피피섬과 카이섬을 하루에 돌아보는 알찬 일정! 스피드보트로 빠르게 이동하여 맑은 바다에서 스노클링을 즐겨보세요.",
        category: "HIT",
        badges: ["인기 투어", "피피+카이", "스피드보트"],
        highlights: ["카이섬의 맑은 바다", "피피섬 점심 식사", "스노클링 2회 포인트"],
        courses: [
            {
                name: "스피드보트 (성인/아동)",
                priceAdult: "1,600 바트",
                priceChild: "1,400 바트",
                features: ["기본 스피드보트", "점심 식사 포함"]
            },
            {
                name: "카타마란 (성인/아동)",
                priceAdult: "2,400 바트",
                priceChild: "2,000 바트",
                features: ["안정적인 카타마란 보트", "넓은 공간"]
            }
        ],
        vehicleInfo: "빠통, 카론, 카타 무료 / 그 외 지역 유료(100~200바트)\n스피드보트 (카타마란 선택 시 2,400바트)\n08:00 호텔 픽업 → 09:30 카이섬 출발 → 12:00 피피섬 중식 → 17:30 호텔 귀환",
        inclusions: ["왕복 차량", "보트", "영어 가이드", "국립공원 입장료", "점심식사", "스노클링 장비"],
        exclusions: ["개인 경비", "매너팁"],
        importantNotes: ["스노클링 장비 분실 시 비용 청구될 수 있습니다.", "임산부는 투어 참여가 제한됩니다."],
        carrierFeePerUnit: 300,
        hasCarrierOption: true
    },
    {
        id: "pp-khai-maithon",
        name: "피피섬 + 카이 + 마이톤섬 투어 (카타마란)",
        price: "2,300 THB ~",
        thumbnail: "/images/phiphi-turtle.jpg",
        detailImage: "/images/phiphi-turtle.jpg",
        description: "럭셔리 카타마란을 타고 피피, 카이, 마이톤 3개 섬을 모두 즐기는 프리미엄 투어입니다. 워터 슬라이드와 투명 카약도 이용 가능합니다.",
        category: "HIT",
        badges: ["3개 섬 투어", "카타마란", "워터슬라이드"],
        highlights: ["마이톤섬 스노클링", "피레 라군 감상", "워터 슬라이드 & 투명 카약"],
        courses: [
            {
                name: "카타마란 (성인/아동)",
                priceAdult: "2,300 바트",
                priceChild: "2,000 바트",
                features: ["워터 슬라이드, 투명 카약, 패들 보트 포함", "카타마란 이용"]
            }
        ],
        vehicleInfo: "카타마란 보트 (워터 슬라이드 포함)\n08:00 호텔 픽업 → 12:00 피피섬 중식 → 14:30 피레 라군 → 17:00 마이톤섬 스노클링 → 18:30 귀환",
        inclusions: ["투명 카약", "패들 보트", "2층형 카타마란 이용", "국립공원 입장료 포함", "왕복 픽업", "점심 식사"],
        exclusions: ["개인 경비", "매너팁"],
        importantNotes: ["날씨에 따라 마이톤섬 방문이 어려울 수 있습니다.", "수영복은 미리 착용하고 오세요."],
        carrierFeePerUnit: 300,
        hasCarrierOption: true
    },
    {
        id: "pp-bamboo",
        name: "피피섬 + 뱀부섬 투어",
        price: "2,400 THB ~",
        thumbnail: "/images/phiphi-turtle.jpg",
        detailImage: "/images/phiphi-turtle.jpg",
        description: "에메랄드빛 바다로 유명한 뱀부섬과 피피섬을 함께! 인생 인생샷을 남길 수 있는 최고의 코스입니다.",
        category: "HIT",
        badges: ["뱀부섬 포함", "인생샷 명소", "스피드보트"],
        highlights: ["뱀부섬의 백사장", "피피섬 관광", "스노클링 체험"],
        courses: [
            {
                name: "스피드보트 (성인/아동)",
                priceAdult: "2,400 바트",
                priceChild: "2,000 바트",
                features: ["빠른 이동", "뱀부섬 입장료 포함"]
            },
            {
                name: "카타마란 (성인/아동)",
                priceAdult: "2,700 바트",
                priceChild: "2,300 바트",
                features: ["여유로운 이동", "넓은 좌석"]
            }
        ],
        vehicleInfo: "스피드보트 (카타마란 선택 시 2,700바트)\n07:30 호텔 픽업 → 09:30 피피섬 출발 → 13:30 피피섬 중식 → 14:40 뱀부섬 자유시간 → 17:30 귀환",
        inclusions: ["뱀부섬 국립공원 입장료 포함", "스노클링 장비 제공", "점심 식사", "왕복 픽업"],
        exclusions: ["개인 경비", "매너팁"],
        importantNotes: ["국립공원 입장권은 투어비에 포함되어 있습니다.", "현지 사정에 따라 일정이 변경될 수 있습니다."],
        carrierFeePerUnit: 300,
        hasCarrierOption: true
    },
    {
        id: "racha-banana-beach",
        name: "라차섬 + 바나나비치 투어",
        price: "2,000 THB ~",
        thumbnail: "/images/1000037627.jpg",
        detailImage: "/images/1000037627.jpg",
        description: "라차섬의 에메랄드빛 바다와 바나나비치의 프라이빗한 휴식을 동시에 즐기세요. 스노클링 장비와 점심 식사가 포함되어 있습니다.",
        category: "HIT",
        badges: ["인기 투어", "라차+바나나", "한국인 전용"],
        highlights: ["라차섬 스노클링", "바나나비치 휴양", "돌고래 출몰 지역"],
        courses: [
            {
                name: "기본 투어 (성인/아동)",
                priceAdult: "2,000 바트",
                priceChild: "1,800 바트",
                features: ["라차섬 스노클링", "바나나비치 자유시간", "점심 뷔페", "전용 요트"]
            }
        ],
        options: [
            { name: "체험 다이빙 (1회)", price: 1500 },
            { name: "씨워커 (Sea Walker)", price: 1200 },
            { name: "파라세일링", price: 800 },
            { name: "바나나보트", price: 600 }
        ],
        vehicleInfo: "빠통, 카론, 카타 무료 픽업\n그 외 지역 추가 요금 발생 (100~300바트)\n08:00 호텔 픽업 -> 09:00 찰롱 부두 출발 -> 16:30 부두 도착",
        inclusions: ["왕복 픽업", "스노클링 장비", "현지인 가이드", "점심 식사", "상해 보험"],
        exclusions: ["개인 경비", "매너 팁", "주류 및 음료"],
        carrierFeePerUnit: 300,
        hasCarrierOption: true,
        importantNotes: ["임산부는 투어 참여가 제한됩니다.", "바나나비치에서는 비치체어 무료 제공"]
    },
];

export const bananaBeachTours = [
    {
        id: 'banana-premium',
        name: '바나나비치 프리미엄 코스',
        time: '09:00 - 17:00 (전일정)',
        prices: { adult: 2500, child: 2200 },
        description: '푸켓의 숨겨진 보석, 바나나비치를 완벽하게 즐기는 풀패키지입니다. 럭셔리한 카타마란 요트 탑승과 프리미엄 라운지 이용, 그리고 모든 해양 액티비티를 여유롭게 즐길 수 있는 최고의 선택입니다.',
        caution: '임산부, 심혈관 질환자, 65세 이상 노약자는 안전을 위해 참여가 제한될 수 있습니다. 수영복을 미리 착용하고 오시면 편리합니다.'
    },
    {
        id: 'banana-snorkeling',
        name: '바나나비치 스노클링 코스',
        time: '10:00 - 16:00',
        prices: { adult: 2000, child: 1800 },
        description: '바다 속 열대어와 산호초를 가장 가까이에서 만나는 코스입니다. 맑은 시야를 자랑하는 포인트에서 스노클링을 즐기며 푸켓 바다의 아름다움을 만끽하세요. 가성비와 알찬 구성을 모두 잡았습니다.',
        caution: '바다생물에게 먹이를 주거나 산호를 밟는 행위는 금지되어 있습니다. 개인 수건과 선크림을 지참해 주세요.'
    },
    {
        id: 'banana-everyday',
        name: '바나나비치 에브리데이 코스 (오후 반일)',
        time: '13:00 - 17:00',
        prices: { adult: 1500, child: 1300 },
        description: '늦잠을 자고 싶은 분들을 위한 오후 전용 힐링 코스입니다. 시원한 바닷바람을 맞으며 해변에서 자유시간을 갖고, 아름다운 일몰 전까지 여유롭게 휴양을 즐기기에 안성맞춤입니다.',
        caution: '오후 투어 특성상 픽업 시간이 정확해야 하니 호텔 로비에 10분 전 대기 부탁드립니다.'
    }
];
