export interface Hotel {
    id: string;
    nameKo: string;
    nameEn: string;
    grade: number; // Star rating
    features: string;
    lat: number;
    lng: number;
}

export const PHUKET_HOTELS: Hotel[] = [
    // 5-Star Luxury
    { id: 'h1', nameKo: '[수린] 더 수린 푸켓', nameEn: 'The Surin Phuket', grade: 5, features: '프라이빗 판시 비치, 럭셔리 코테지', lat: 7.9818, lng: 98.2759 },
    { id: 'h2', nameKo: '[카타] 카타 록스', nameEn: 'Kata Rocks', grade: 5, features: '인피니티 풀, 최고의 일몰 뷰', lat: 7.8286, lng: 98.2934 },
    { id: 'h3', nameKo: '[카말라] 선윙 카말라 비치', nameEn: 'Sunwing Kamala Beach', grade: 5, features: '가족 친화적, 넓은 수영장', lat: 7.9620, lng: 98.2752 },
    { id: 'h4', nameKo: '[나이톤] 풀만 푸켓 아카디아', nameEn: 'Pullman Phuket Arcadia', grade: 5, features: '절벽 위 오션뷰, 조용한 휴양', lat: 8.1121, lng: 98.2917 },
    { id: 'h5', nameKo: '[수린] 아웃리거 수린 비치 영', nameEn: 'Outrigger Surin Beach', grade: 5, features: '세련된 디자인, 비치 접근성', lat: 7.9734, lng: 98.2815 },
    { id: 'h6', nameKo: '[라와이] 셀리나 푸켓 라와이', nameEn: 'Selina Phuket Rawai', grade: 5, features: '트렌디한 분위기, 코워킹 스페이스', lat: 7.7942, lng: 98.3283 },
    { id: 'h7', nameKo: '[코야오] 식스센스 야오노이', nameEn: 'Six Senses Yao Noi', grade: 5, features: '프라이빗 아일랜드 리조트, 자연 친화적', lat: 8.0772, lng: 98.6186 },
    { id: 'h8', nameKo: '[야무] 코모 포인트 야무', nameEn: 'COMO Point Yamu', grade: 5, features: '파노라마 오션뷰, 웰니스 리트리트', lat: 7.9870, lng: 98.4219 },
    { id: 'h9', nameKo: '[카말라] 키말라', nameEn: 'Keemala', grade: 5, features: '풀 빌라, 독특한 건축 디자인', lat: 7.9754, lng: 98.2831 },
    { id: 'h10', nameKo: '[빠통] 로즈우드 푸켓', nameEn: 'Rosewood Phuket', grade: 5, features: '초호화 리조트, 프라이빗 비치', lat: 7.8763, lng: 98.2796 },
    { id: 'h11', nameKo: '[나이한] 더 나이한', nameEn: 'The Nai Harn', grade: 5, features: '나이한 비치 전망, 클래식 럭셔리', lat: 7.7763, lng: 98.3058 },
    { id: 'h12', nameKo: '[빠통] 푸켓 메리어트 멀린 비치', nameEn: 'Phuket Marriott Merlin Beach', grade: 5, features: '프라이빗 비치, 대형 리조트', lat: 7.8732, lng: 98.2743 },
    { id: 'h13', nameKo: '[카말라] 파레사 리조트', nameEn: 'Paresa Resort', grade: 5, features: '절벽 위 풀빌라, 천국의 뷰', lat: 7.9576, lng: 98.2694 },
    { id: 'h14', nameKo: '[카론] 만다라바 리조트', nameEn: 'Mandarava Resort', grade: 5, features: '열대 정원 속 힐링, 여러 개의 수영장', lat: 7.8505, lng: 98.2952 },
    { id: 'h15', nameKo: '[카론] 아비스타 그란데 엠갤러리', nameEn: 'Avista Grande Karon MGallery', grade: 5, features: '모던 럭셔리, 카론 비치 인접', lat: 7.8466, lng: 98.2892 },
    { id: 'h16', nameKo: '[카론] 르 메르디앙 푸켓', nameEn: 'Le Meridien Phuket', grade: 5, features: '전용 비치 보유, 대형 수영장', lat: 7.8692, lng: 98.2792 },
    { id: 'h17', nameKo: '[빠통] 아마리 푸켓', nameEn: 'Amari Phuket', grade: 5, features: '빠통 끝자락의 조용함, 오션뷰', lat: 7.8812, lng: 98.2890 },
    { id: 'h18', nameKo: '[빠통] 아비스타 하이드어웨이', nameEn: 'Avista Hideaway Patong', grade: 5, features: '산 속의 럭셔리, 조용한 휴양', lat: 7.8770, lng: 98.2800 },
    { id: 'h19', nameKo: '[빠통] 그랜드 머큐어 빠통', nameEn: 'Grand Mercure Phuket Patong', grade: 5, features: '빠통 중심, 세련된 객실', lat: 7.8943, lng: 98.2996 },
    { id: 'h20', nameKo: '[마이카오] 살라 푸켓', nameEn: 'Sala Phuket Mai Khao', grade: 5, features: '프라이빗 풀빌라, 로맨틱 분위기', lat: 8.1130, lng: 98.3070 },
    { id: 'h21', nameKo: '[나이양] 더 슬레이트', nameEn: 'The Slate', grade: 5, features: '독특한 인더스트리얼 디자인, 넓은 부지', lat: 8.0934, lng: 98.2903 },
    { id: 'h22', nameKo: '[카론] 힐튼 푸켓 아카디아', nameEn: 'Hilton Phuket Arcadia', grade: 5, features: '광활한 부지, 다양한 부대시설', lat: 7.8398, lng: 98.2951 },
    { id: 'h23', nameKo: '[카타노이] 더 쇼어 앳 카타타니', nameEn: 'The Shore at Katathani', grade: 5, features: '성인 전용 풀빌라, 로맨틱 허니문', lat: 7.8186, lng: 98.2965 },
    { id: 'h24', nameKo: '[방타오] 반얀트리 푸켓', nameEn: 'Banyan Tree Phuket', grade: 5, features: '태국 전통 양식, 최고급 풀빌라', lat: 7.9947, lng: 98.3090 },
    { id: 'h25', nameKo: '[마이카오] 르네상스 푸켓', nameEn: 'Renaissance Phuket', grade: 5, features: '감각적인 디자인, 프라이빗 풀빌라', lat: 8.0991, lng: 98.3069 },
    { id: 'h26', nameKo: '[방타오] 앙사나 라구나', nameEn: 'Angsana Laguna', grade: 5, features: '거대한 수영장, 가족 여행 추천', lat: 7.9972, lng: 98.2990 },
    { id: 'h27', nameKo: '[트리사라] 트리사라', nameEn: 'Trisara', grade: 5, features: '최상위 럭셔리, 프라이빗 오션뷰', lat: 8.0350, lng: 98.2750 },

    // 4-Star Premium & 3-Star popular
    { id: 'h28', nameKo: '[빠통] 다이아몬드 클리프', nameEn: 'Diamond Cliff Resort', grade: 4, features: '전통적인 태국 스타일, 오션뷰', lat: 7.9029, lng: 98.2905 },
    { id: 'h29', nameKo: '[빠통] 홀리데이 인 리조트', nameEn: 'Holiday Inn Resort Patong', grade: 4, features: '키즈 클럽 우수, 가족 여행', lat: 7.8868, lng: 98.2920 },
    { id: 'h30', nameKo: '[빠통] 노보텔 빈티지', nameEn: 'Novotel Phuket Vintage', grade: 4, features: '대형 수영장, 중심가 접근성', lat: 7.8925, lng: 98.2985 },
    { id: 'h31', nameKo: '[빠통] 더 키 리조트', nameEn: 'The Kee Resort', grade: 4, features: '현대적인 디자인, 방라로드 인접', lat: 7.8931, lng: 98.2959 },
    { id: 'h32', nameKo: '[빠통] 칼리마 리조트', nameEn: 'Kalima Resort', grade: 4, features: '인피니티 풀, 멋진 야경', lat: 7.9157, lng: 98.2882 },
    { id: 'h33', nameKo: '[카론] 비욘드 리조트', nameEn: 'Beyond Resort Karon', grade: 4, features: '성인 전용, 해변 바로 앞', lat: 7.8340, lng: 98.2950 },
    { id: 'h34', nameKo: '[카론] 노보텔 카론', nameEn: 'Novotel Phuket Karon', grade: 4, features: '가족 친화적, 키즈풀', lat: 7.8510, lng: 98.2940 },
    { id: 'h35', nameKo: '[카론] 모벤픽 카론', nameEn: 'Movenpick Karon', grade: 4, features: '열대 정원, 프라이빗 빌라', lat: 7.8481, lng: 98.2951 },
    { id: 'h36', nameKo: '[푸켓타운] 블루 몽키 허브', nameEn: 'Blu Monkey Hub', grade: 4, features: '트렌디한 디자인, 가성비 갑', lat: 7.8864, lng: 98.3857 },
    { id: 'h37', nameKo: '[푸켓타운] 펄 호텔', nameEn: 'Pearl Hotel', grade: 3, features: '오랜 전통, 시내 중심', lat: 7.8837, lng: 98.3905 },
    { id: 'h38', nameKo: '[푸켓타운] 베드라인 호텔', nameEn: 'Bedline Hotel', grade: 3, features: '깔끔한 신축, 수영장 보유', lat: 7.8900, lng: 98.3800 },
    { id: 'h39', nameKo: '[시레이] 더 타이드 비치프론트', nameEn: 'The Tide Beachfront', grade: 4, features: '한적한 바다, 조용한 휴식', lat: 7.8760, lng: 98.4230 },
    { id: 'h40', nameKo: '[푸켓타운] 마이몬 리조트', nameEn: 'Mai Morn Resort', grade: 4, features: '가든 뷰, 넓은 객실', lat: 7.8500, lng: 98.3600 },
    { id: 'h41', nameKo: '[빠통] 그레이스랜드 리조트', nameEn: 'Phuket Graceland Resort & Spa', grade: 4, features: '대형 수영장, 키즈 친화적', lat: 7.9023, lng: 98.2917 }
];
