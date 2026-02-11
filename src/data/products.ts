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
        luggagePrice: 200,
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
        luggagePrice: 200,
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
        luggagePrice: 200,
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
        price: '900 THB ~',
        thumbnail: '/images/tiger_park.jpg',
        detailImage: '/images/tiger_park.jpg',
        description: '빅부다 근처 찰롱 지역에 위치한 호랑이 공원입니다. 다양한 크기의 호랑이들과 가까이에서 교감하고 사진을 찍을 수 있는 특별한 경험을 제공합니다.',
        category: 'TICKET',
        badges: ['빅부다 근처', '인생샷 명소', '호랑이 교감'],
        highlights: ['다양한 크기의 호랑이 체험', '전문 조련사 동행', '빅부다 관광 연계 가능'],
        courses: [
            { name: 'New Born (1-2개월, Smallest)', priceAdult: '1,300 바트', priceChild: '1,300 바트', features: ['가장 작은 아기 호랑이', '전연령 가능 (160cm 미만만)'] },
            { name: 'Smallest (3-5개월)', priceAdult: '1,000 바트', priceChild: '1,000 바트', features: ['작은 호랑이', '전연령 가능 (160cm 미만만)'] },
            { name: 'Small (6-12개월)', priceAdult: '900 바트', priceChild: '900 바트', features: ['중소형 호랑이', '청소년/성인 추천'] },
            { name: 'Medium (13-18개월)', priceAdult: '900 바트', priceChild: '900 바트', features: ['중형 호랑이', '청소년/성인 추천'] },
            { name: 'Big (19-48개월)', priceAdult: '1,000 바트', priceChild: '1,000 바트', features: ['대형 호랑이', '만 18세 이상/160cm 이상 필수'] },
            { name: 'Giant (49개월+)', priceAdult: '1,300 바트', priceChild: '1,300 바트', features: ['초대형 호랑이', '만 18세 이상/160cm 이상 필수'] },
            { name: 'Package 2 (2가지 선택)', priceAdult: '1,700 바트', priceChild: '1,700 바트', features: ['Big/Smallest 중 1 + Medium/Small 중 1'] },
            { name: 'Package 3 (3가지 선택)', priceAdult: '2,500 바트', priceChild: '2,500 바트', features: ['Big + Smallest + Medium/Small 중 1'] },
            { name: 'Package 4 (4가지 선택)', priceAdult: '3,300 바트', priceChild: '3,300 바트', features: ['Big + Medium + Small + Smallest'] }
        ],
        inclusions: ['선택한 호랑이 체험', '전문 조련사', '보험'],
        exclusions: ['픽업/샌딩 (개별 이동)', '사진 촬영 기사 (별도 구매)', '음료/식사'],
        vehicleInfo: '개별 이동 필수 (픽업 불포함)\n위치: Chalong, Phuket (Near Big Buddha)\n운영시간: 09:00 - 18:00',
        pricePolicy: '만 15세 미만 & 160cm 미만: New Born, Smallest만 이용 가능\n만 18세 이상 & 160cm 이상: Giant, Big 이용 가능\n무료 입장: 24개월 미만 & 110cm 미만',
        cancellationPolicy: '방문 1일 전 무료 취소 가능',
        importantNotes: ['사진 촬영 시 플래시 사용 금지', '조련사의 지시를 반드시 따라주세요.', '임산부 및 노약자 체험 제한될 수 있음']
    },
    {
        id: 'phuket-fantasea',
        name: '푸켓 판타시 쇼 (Phuket FantaSea)',
        price: '1,800 THB ~',
        thumbnail: '/images/fantasea.jpg',
        detailImage: '/images/fantasea.jpg',
        description: '푸켓 최대 규모의 문화 테마국! 웅장한 무대와 수십 마리의 코끼리가 출연하는 환상적인 쇼를 즐겨보세요. 화려한 뷔페 디너도 선택 가능합니다.',
        category: 'HIT',
        badges: ['최대 규모 쇼', '코끼리 출연', '화/금/일 운영'],
        highlights: ['웅장한 스케일의 코끼리 공연', '다양한 볼거리의 테마파크', '세계 최대 규모 뷔페 식당'],
        courses: [
            {
                name: '쇼 관람 (일반석)',
                priceAdult: '1,350 바트',
                priceChild: '1,350 바트',
                features: ['쇼 관람권', '일반석', '테마파크 입장']
            },
            {
                name: '쇼 + 디너 (일반석)',
                priceAdult: '1,550 바트',
                priceChild: '1,400 바트',
                features: ['쇼 관람권', '인터내셔널 뷔페', '일반석']
            },
            {
                name: '쇼 관람 (골드석)',
                priceAdult: '1,600 바트',
                priceChild: '1,600 바트',
                features: ['쇼 관람권', '골드석(중앙)', '테마파크 입장']
            },
            {
                name: '쇼 + 디너 (골드석)',
                priceAdult: '1,800 바트',
                priceChild: '1,650 바트',
                features: ['쇼 관람권', '인터내셔널 뷔페', '골드석(중앙)']
            },
            {
                name: '쇼 + 씨푸드 디너 (일반석)',
                priceAdult: '2,600 바트',
                priceChild: '2,450 바트',
                features: ['쇼 관람권', '씨푸드 뷔페 업그레이드', '일반석']
            },
            {
                name: '쇼 + 씨푸드 디너 (골드석)',
                priceAdult: '2,850 바트',
                priceChild: '2,700 바트',
                features: ['쇼 관람권', '씨푸드 뷔페 업그레이드', '골드석(중앙)']
            }
        ],
        pickupOptions: [
            { name: '왕복 픽업 서비스 (조인 밴)', price: 350 }
        ],
        inclusions: ['선택한 쇼/디너 티켓', '테마파크 입장료'],
        exclusions: ['개인 경비', '매너팁', '이동 서비스 (옵션 구매)'],
        vehicleInfo: '픽업 서비스 신청 시 호텔 로비 픽업\n운영일: 화, 금, 일\n게이트 오픈: 17:30 / 쇼 시작: 21:00\n디너 식사: 18:00 - 21:00',
        pricePolicy: '성인/아동 구분 없음 (좌석 점유 시 동일 요금)\n만 4세 미만 & 키 100cm 미만 무료 (좌석 없음)\n키 101cm ~ 140cm 아동 요금 적용 (디너 이용 시)',
        cancellationPolicy: '공연 당일 환불 불가',
        importantNotes: ['공연장 내 촬영 금지 (휴대폰 보관 필수)', '화/금/일 주 3회 운영', '좌석은 당일 현장에서 배정됩니다.']
    },
    {
        id: 'siam-niramit',
        name: '시암 니라밋 공연 (Siam Niramit)',
        price: '1,500 THB ~',
        thumbnail: '/images/siam-niramit.jpg',
        detailImage: '/images/siam-niramit.jpg',
        description: '기네스북에 등재된 세계 최대 규모의 무대! 태국의 역사와 문화를 웅장한 스케일로 풀어낸 대서사시를 경험하세요.',
        category: 'HIT',
        badges: ['기네스북 무대', '화요일 휴무', '태국 역사 테마'],
        highlights: ['100명 이상의 출연진과 500여 벌의 의상', '실제 강이 흐르는 무대 연출', '다양한 전통 마을 체험'],
        courses: [
            {
                name: '실버석 (Show Only)',
                priceAdult: '1,530 바트',
                priceChild: '1,360 바트',
                features: ['쇼 관람권', '실버석(사이드)', '사전거리 공연 관람']
            },
            {
                name: '실버석 + 디너 뷔페',
                priceAdult: '1,870 바트',
                priceChild: '1,530 바트',
                features: ['쇼 관람권', '실버석', '인터내셔널 뷔페']
            },
            {
                name: '골드석 (Show Only)',
                priceAdult: '1,700 바트',
                priceChild: '1,530 바트',
                features: ['쇼 관람권', '골드석(중앙 사이드)', '좋은 시야']
            },
            {
                name: '골드석 + 디너 뷔페',
                priceAdult: '2,040 바트',
                priceChild: '1,700 바트',
                features: ['쇼 관람권', '골드석', '인터내셔널 뷔페']
            },
            {
                name: '플래티넘석 (Show Only)',
                priceAdult: '1,870 바트',
                priceChild: '1,700 바트',
                features: ['쇼 관람권', '플래티넘석(중앙)', '최고의 시야']
            },
            {
                name: '플래티넘석 + 디너 뷔페',
                priceAdult: '2,210 바트',
                priceChild: '1,870 바트',
                features: ['쇼 관람권', '플래티넘석', '인터내셔널 뷔페']
            }
        ],
        pickupOptions: [
            { name: '왕복 픽업 서비스', price: 350 }
        ],
        luggagePrice: 100,
        inclusions: ['선택한 좌석 쇼 관람권', '테마파크 입장 및 사전 공연', '디너 포함 시 뷔페 식사'],
        exclusions: ['개인 경비', '매너팁', '전통 의상 대여 (250바트)', '이동 서비스 (옵션 구매)'],
        vehicleInfo: '픽업 서비스 신청 시 호텔 로비 픽업\n운영일: 수, 목, 금, 토, 일, 월 (화요일 휴무)\n게이트 오픈: 17:30 / 쇼 시작: 20:30',
        pricePolicy: '성인: 키 141cm 이상\n아동: 만 4세~11세 & 키 100cm~140cm\n유아: 만 4세 미만 & 키 100cm 미만 무료 (좌석 없음)',
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
    }
];
