export type CategoryId =
    | 'VIEW' | 'KIDS' | 'OLDTOWN' | 'SPA' | 'RESTAURANT'
    | 'SHOW' | 'EXTREME' | 'CAFE' | 'BEACHCLUB' | 'NIGHTMARKET'
    | 'MALL' | 'KOREAN' | 'MARINA';

export interface RecommendedPlace {
    id: string;
    name: string;
    category: CategoryId;
    googleMapsUrl: string;
    lat: number;
    lng: number;
    description?: string;
}

export const CATEGORY_TABS: { id: CategoryId, label: string, icon: string }[] = [
    { id: 'VIEW', label: '뷰를 즐길만한 곳', icon: '⛰️' },
    { id: 'KIDS', label: '아이들이 좋아하는 장소', icon: '👦' },
    { id: 'OLDTOWN', label: '올드타운 포인트', icon: '🏮' },
    { id: 'SPA', label: '평점 좋은 스파장', icon: '💆' },
    { id: 'RESTAURANT', label: '푸켓의 맛집', icon: '🍜' },
    { id: 'SHOW', label: '푸켓 공연', icon: '🎭' },
    { id: 'EXTREME', label: '익스트림', icon: '🏄' },
    { id: 'CAFE', label: '이쁜 카페, 레스토랑', icon: '☕' },
    { id: 'BEACHCLUB', label: '비치클럽', icon: '🏖️' },
    { id: 'NIGHTMARKET', label: '푸켓 야시장', icon: '🌙' },
    { id: 'MALL', label: '대형마트 & 백화점', icon: '🛍️' },
    { id: 'KOREAN', label: '한식당', icon: '🍱' },
    { id: 'MARINA', label: '푸켓 마리나', icon: '⛵' },
];

export const RECOMMENDED_PLACES: RecommendedPlace[] = [
    // [ 뷰를 즐길만한 곳 ]
    { id: 'v1', name: '카오랑뷰', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/h9kgYFAyhn8DF4R7A', lat: 7.8933, lng: 98.3799 },
    { id: 'v2', name: '프롬텝', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/sCXYRWnZW1fRg9Z58', lat: 7.7599, lng: 98.3044 },
    { id: 'v3', name: '헤븐 선셋 레스토랑', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/fwu7JCxmnaLyLGzt6', lat: 7.8200, lng: 98.2980 },
    { id: 'v4', name: '트리베이 선셋 클럽', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/nc4wKKHpvFHVS8XCA', lat: 7.8150, lng: 98.2950 },
    { id: 'v5', name: 'SUNDECK 뷰 카페', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/EPLUgTRHfSSJ8mKEA', lat: 7.8180, lng: 98.3000 },
    { id: 'v6', name: '카론뷰 전망대', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/aTsEN598JyuXiZsX8', lat: 7.8200, lng: 98.3015 },
    { id: 'v7', name: '사멧낭치 호리즌 레스토랑', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/biVGzjrWgmoL6bVD9', lat: 8.2380, lng: 98.4480 },
    { id: 'v8', name: '마이카오 플라이 뷰잉', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/Ktp6eyzw7i3piGJw5', lat: 8.1250, lng: 98.3000 },
    { id: 'v9', name: '윈드밀 뷰포인트', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/WykmzhXeiYcFVcEw9', lat: 7.7688, lng: 98.2911 },
    { id: 'v10', name: '야누이비치', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/hoaYh5hiGMsAYKSB7', lat: 7.7670, lng: 98.3060 },
    { id: 'v11', name: '락비치 클럽', category: 'VIEW', googleMapsUrl: 'https://maps.app.goo.gl/ktCNPiytcRFkrDFA8', lat: 7.7800, lng: 98.2900 },

    // [ 아이들이 좋아하는 장소 ]
    { id: 'k1', name: '타이거파크', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/5hx6fzqt1rTEsUEA8', lat: 7.8822, lng: 98.3312 },
    { id: 'k2', name: '라이온랜드', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/QMcb8HLcivmTBvdp9', lat: 7.9100, lng: 98.3500 },
    { id: 'k3', name: '돌핀베이 쇼', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/C2UEg3JZVHP8nyhx7', lat: 7.8200, lng: 98.3380 },
    { id: 'k4', name: '코끼리 정글 생추어리', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/U6D5VAWe8oLjTwqaA', lat: 7.9600, lng: 98.3800 },
    { id: 'k5', name: '하누만 월드', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/oVKjKHCiRVt2prFV7', lat: 7.8900, lng: 98.3400 },
    { id: 'k6', name: '플라잉 하누만', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/Nu3ryGx8xpMVVtHo6', lat: 7.9200, lng: 98.3200 },
    { id: 'k7', name: '에라완 짚라인', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/MdUpACxkJDYYwq3t9', lat: 7.8200, lng: 98.3100 },
    { id: 'k8', name: '안다만다 워터파크', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/G6yQEaYtmgxQJCvm7', lat: 7.9066, lng: 98.3655 },
    { id: 'k9', name: '스플레시 워터파크', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/FrfWFFmyhBYyUG7c6', lat: 8.1100, lng: 98.3000 },
    { id: 'k10', name: '아쿠아리움 센탄', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/6xRWxvH9ja1U1uRs9', lat: 7.8922, lng: 98.3688 },
    { id: 'k11', name: '아쿠아리움 판와', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/yfwYCRdqJCXv4EPd9', lat: 7.8050, lng: 98.4050 },
    { id: 'k12', name: '푸켓 디노파크 미니골프', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/WXrwxjg1CW61bmw89', lat: 7.8280, lng: 98.2950 },
    { id: 'k13', name: '바나나비치', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/tQ8UfNBk3ryguk3A8', lat: 7.9150, lng: 98.3690 },
    { id: 'k14', name: '반 띠랑까', category: 'KIDS', googleMapsUrl: 'https://maps.app.goo.gl/UNkQVSe3yab1seit7', lat: 7.9350, lng: 98.3750 },
    { id: 'k15', name: '고다이브', category: 'EXTREME', googleMapsUrl: 'https://maps.app.goo.gl/VfVCy4fAp3L3oQM9A', lat: 7.8350, lng: 98.3300 },

    // [ 올드타운 포인트 ]
    { id: 'o1', name: '스타벅스', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/htvuUYtHBGMYkvQW9', lat: 7.8845, lng: 98.3895 },
    { id: 'o2', name: '토리 아이스크림 (유명점)', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/pRjXHyJJaJvPPQSt7', lat: 7.8830, lng: 98.3910 },
    { id: 'o3', name: '건물 꽃장식 포인트', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/SqM7DuKJqamuBPSY6', lat: 7.8850, lng: 98.3880 },
    { id: 'o4', name: '벽화 포인트', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/zZeGMoFWT1rPMshs9', lat: 7.8860, lng: 98.3875 },
    { id: 'o5', name: '올드타운 4거리', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/kx2uEPGMoWrURheC6', lat: 7.8848, lng: 98.3900 },
    { id: 'o6', name: '국왕 벽화', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/dxcoR6NRcwVPh9RJA', lat: 7.8835, lng: 98.3915 },
    { id: 'o7', name: '킴스 마사지', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/uvrzW1DYAy54Vwko9', lat: 7.8855, lng: 98.3890 },
    { id: 'o8', name: '뚜깝카우 레스토랑', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/r5Rf8AsiVx8bWNFQ6', lat: 7.8843, lng: 98.3898 },
    { id: 'o9', name: '시계탑', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/wd7WrJm5iQGPxayTA', lat: 7.8842, lng: 98.3925 },
    { id: 'o10', name: '선데이 마켓 입구', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/XMRn2hVxHGKBbMqPA', lat: 7.8844, lng: 98.3890 },
    { id: 'o11', name: '데이 앤 나이트 레스토랑', category: 'OLDTOWN', googleMapsUrl: 'https://maps.app.goo.gl/6wwEYZnXkYhHDiXo8', lat: 7.8870, lng: 98.3950 },

    // [ 평점 좋은 스파장 ]
    { id: 's1', name: '55스파', category: 'SPA', googleMapsUrl: 'https://maps.app.goo.gl/HPUMzSbrfs1Vxu6S9', lat: 7.8950, lng: 98.2980 },
    { id: 's2', name: '오아시스 까타', category: 'SPA', googleMapsUrl: 'https://maps.app.goo.gl/CkZNLfyCmfVZcbBEA', lat: 7.8170, lng: 98.3050 },
    { id: 's3', name: '오아시스 라구나', category: 'SPA', googleMapsUrl: 'https://maps.app.goo.gl/5nPxH8DQ9Vs9WSbJ9', lat: 8.0050, lng: 98.3100 },
    { id: 's4', name: '드플로라 스파', category: 'SPA', googleMapsUrl: 'https://maps.app.goo.gl/spqMzx4AddpPibaw6', lat: 7.8920, lng: 98.2960 },
    { id: 's5', name: '오리엔타라 스파 파통', category: 'SPA', googleMapsUrl: 'https://maps.app.goo.gl/QgZpzQsjUfeDur2M9', lat: 7.8960, lng: 98.3030 },
    { id: 's6', name: '사마온센 스파', category: 'SPA', googleMapsUrl: 'https://maps.app.goo.gl/3j5XXEcm84nJgw1S7', lat: 7.9120, lng: 98.3580 },
    { id: 's7', name: '딥릴렉스 라구나', category: 'SPA', googleMapsUrl: 'https://maps.app.goo.gl/2zKWzkx437FQ41cX7', lat: 8.0030, lng: 98.3050 },
    { id: 's8', name: '푸몬트라 스파', category: 'SPA', googleMapsUrl: 'https://maps.app.goo.gl/iypaxsphLs1mbScZ8', lat: 7.8980, lng: 98.3010 },

    // [ 푸켓의 맛집 ]
    { id: 'r1', name: '쏨찟국수', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/Gp2mz6L74qMsPJCM6', lat: 7.8860, lng: 98.3880 },
    { id: 'r2', name: '쓰리몽키즈', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/RLotNUuJeKvhKbNy6', lat: 7.8910, lng: 98.3410 },
    { id: 'r3', name: '로띠 테우남', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/VU2UaE8w7H6UUfrL8', lat: 7.8865, lng: 98.3920 },
    { id: 'r4', name: '원춘 레스토랑', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/R7DHyBQfZYj96bHJA', lat: 7.8850, lng: 98.3890 },
    { id: 'r5', name: '페티 스테이크', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/sdcXqa9DE7whhvKZ8', lat: 7.9050, lng: 98.3650 },
    { id: 'r6', name: '미똔포 국수집(타운)', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/nG1aztXsWgefBNR89', lat: 7.8835, lng: 98.3930 },
    { id: 'r7', name: '블루 엘리펀트', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/XtiCpcRfpHWRhHLL8', lat: 7.8872, lng: 98.3872 },
    { id: 'r8', name: '카오똠 디북 (비빔 까오라오)', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/aHy2E6zaBBsSt1Rd8', lat: 7.8852, lng: 98.3905 },
    { id: 'r9', name: '히야 씨여우보이 딤섬', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/pYixNGxvXhbV7yGt6', lat: 7.8820, lng: 98.3940 },
    { id: 'r10', name: '아뽕 매수니 (코코넛 과자)', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/TrLoFPyzUpvBWTDQ6', lat: 7.8844, lng: 98.3890 },
    { id: 'r11', name: '팽프라이 (숲속 레스토랑)', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/HHyuSszFJ6Fuzj5A8', lat: 8.0680, lng: 98.4350 },
    { id: 'r12', name: '꼬벤츠 카오랑 까오라오', category: 'RESTAURANT', googleMapsUrl: 'https://maps.app.goo.gl/XTwuMkZtTAmf5MBH7', lat: 7.8920, lng: 98.3780 },

    // [ 푸켓 공연 ]
    { id: 'sh1', name: '사이먼 쇼', category: 'SHOW', googleMapsUrl: 'https://maps.app.goo.gl/4PR8BzWunsot5ZvH9', lat: 7.8780, lng: 98.2920 },
    { id: 'sh2', name: '환타시 쇼', category: 'SHOW', googleMapsUrl: 'https://maps.app.goo.gl/k1ggH6rh7pJtHxr7A', lat: 7.9500, lng: 98.2800 },
    { id: 'sh3', name: '시암 니라밋 쇼', category: 'SHOW', googleMapsUrl: 'https://maps.app.goo.gl/mapNuq6bTq9QYm4p9', lat: 7.9300, lng: 98.3700 },
    { id: 'sh4', name: '매직 카니발 쇼', category: 'SHOW', googleMapsUrl: 'https://maps.app.goo.gl/gJeoGYKX4FhhetxZ6', lat: 7.9510, lng: 98.2810 },
    { id: 'sh5', name: '웨이크업 파통 쇼', category: 'SHOW', googleMapsUrl: 'https://maps.app.goo.gl/JJkzMiY3uFehdoTSA', lat: 7.8940, lng: 98.2980 },

    // [ 익스트림 ]
    { id: 'e1', name: '까타 써프하우스', category: 'EXTREME', googleMapsUrl: 'https://maps.app.goo.gl/ELuPD3yn9Do1g3Fs6', lat: 7.8180, lng: 98.2980 },
    { id: 'e2', name: '파통 써프하우스', category: 'EXTREME', googleMapsUrl: 'https://maps.app.goo.gl/YDgxochepnYw6T697', lat: 7.8930, lng: 98.2950 },
    { id: 'e3', name: '웨이크 파크 (케이블 스키)', category: 'EXTREME', googleMapsUrl: 'https://maps.app.goo.gl/LJYYkSgaEdige4gn6', lat: 7.9350, lng: 98.3450 },

    // [ 이쁜 카페, 레스토랑 ]
    { id: 'c1', name: '위카페', category: 'CAFE', googleMapsUrl: 'https://maps.app.goo.gl/TpeEGkXDHgUxNGkFA', lat: 7.8680, lng: 98.3450 },
    { id: 'c2', name: '바분카페', category: 'CAFE', googleMapsUrl: 'https://maps.app.goo.gl/gfL3kWNXHt7bxgSm9', lat: 7.8912, lng: 98.2955 },
    { id: 'c3', name: '시리와라 레스토랑', category: 'CAFE', googleMapsUrl: 'https://maps.app.goo.gl/adsLqXViGXhss7jb8', lat: 7.9420, lng: 98.3880 },
    { id: 'c4', name: 'KEP Restaurant', category: 'CAFE', googleMapsUrl: 'https://maps.app.goo.gl/WTLnMUPapp6wgPqg9', lat: 7.8250, lng: 98.3420 },
    { id: 'c5', name: '마두부아', category: 'CAFE', googleMapsUrl: 'https://maps.app.goo.gl/jnyiFsrQ3q1vuZsN9', lat: 8.0200, lng: 98.3300 },
    { id: 'c6', name: '깐엥 레스토랑', category: 'CAFE', googleMapsUrl: 'https://maps.app.goo.gl/DGejVT1HdSzwoHW17', lat: 7.8200, lng: 98.3400 },

    // [ 비치클럽 ]
    { id: 'bc1', name: '카페 델마', category: 'BEACHCLUB', googleMapsUrl: 'https://maps.app.goo.gl/6koGYkvoh16akn618', lat: 7.9560, lng: 98.2830 },
    { id: 'bc2', name: '크레페 디엠 비치클럽', category: 'BEACHCLUB', googleMapsUrl: 'https://maps.app.goo.gl/XA75S63mD8CV1sSY6', lat: 7.9820, lng: 98.2900 },
    { id: 'bc3', name: '바라쿠다 비치클럽', category: 'BEACHCLUB', googleMapsUrl: 'https://maps.app.goo.gl/mRFXyCARZJLvwKr28', lat: 7.9850, lng: 98.2920 },
    { id: 'bc4', name: '노마드 비치클럽', category: 'BEACHCLUB', googleMapsUrl: 'https://maps.app.goo.gl/mRFXyCARZJLvwKr28', lat: 7.9880, lng: 98.2950 },
    { id: 'bc5', name: '캐치 비치클럽', category: 'BEACHCLUB', googleMapsUrl: 'https://maps.app.goo.gl/mRFXyCARZJLvwKr28', lat: 7.9800, lng: 98.2800 },
    { id: 'bc6', name: '요나비치 비치클럽', category: 'BEACHCLUB', googleMapsUrl: 'https://maps.app.goo.gl/hnpwdxe9fD24BUC37', lat: 7.8950, lng: 98.3100 },
    { id: 'bc7', name: '프리덤 비치클럽', category: 'BEACHCLUB', googleMapsUrl: 'https://maps.app.goo.gl/hnpwdxe9fD24BUC37', lat: 7.8750, lng: 98.2750 },

    // [ 푸켓 야시장 ]
    { id: 'n1', name: '카론 바자마켓', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/qa7UKmSU42jDLJFn6', lat: 7.8480, lng: 98.2950 },
    { id: 'n2', name: '칠바마켓', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/1hK93sxvcmE6KUQq6', lat: 7.9060, lng: 98.3720 },
    { id: 'n3', name: '선데이마켓(랏야이)', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/V9bu4DWA4EJ1uYet6', lat: 7.8845, lng: 98.3900 },
    { id: 'n4', name: '딸랏 다운타운', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/jLNhJkvVZp1amUcBA', lat: 7.8820, lng: 98.3880 },
    { id: 'n5', name: '인디 나이트마켓', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/DEX5K8zUsJf3ctjm8', lat: 7.8920, lng: 98.3900 },
    { id: 'n6', name: '딸랏 나카', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/VNrQbiyNSGC8KgHq6', lat: 7.8800, lng: 98.3660 },
    { id: 'n7', name: '과일시장', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/TGpATQb8EFkih2td6', lat: 7.8850, lng: 98.3850 },
    { id: 'n8', name: '보트 에비뉴', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/Eza5wC7mibpdJKCW7', lat: 8.0030, lng: 98.3050 },
    { id: 'n9', name: '반싼시장', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/JJDhWPPYdwjHrUam6', lat: 7.8910, lng: 98.3010 },
    { id: 'n10', name: '라와이 수산시장', category: 'NIGHTMARKET', googleMapsUrl: 'https://maps.app.goo.gl/LNTFS8zXtro26Doe9', lat: 7.7750, lng: 98.3280 },

    // [ 대형마트 & 백화점 ]
    { id: 'm1', name: '센트럴백화점', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/PSr3GZaT6dwEr8SN7', lat: 7.8915, lng: 98.3675 },
    { id: 'm2', name: '정실론 파통', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/n5oSaZFLxsm1Xw7C9', lat: 7.8920, lng: 98.2985 },
    { id: 'm3', name: '로빈산 찰롱', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/MhZRcjPEzLMWsuHG7', lat: 7.8220, lng: 98.3410 },
    { id: 'm4', name: '로빈산 탈랑', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/JSXrvs3hwQby2EPj7', lat: 7.9820, lng: 98.3650 },
    { id: 'm5', name: '빅씨 센탄옆', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/rNUALQufystAAAeH7', lat: 7.8950, lng: 98.3640 },
    { id: 'm6', name: '로터스 쌈콩', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/WjsSwiHFzqKvkMWv8', lat: 7.9050, lng: 98.3700 },
    { id: 'm7', name: '빌라마트 라구나', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/QTd5AWNtwUPZsxMC6', lat: 8.0040, lng: 98.3040 },
    { id: 'm8', name: '빌라마켓 센탄', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/v4amNo9AkZwLUmyp9', lat: 7.8920, lng: 98.3670 },
    { id: 'm9', name: '빌라마켓 찰롱', category: 'MALL', googleMapsUrl: 'https://maps.app.goo.gl/ouLxftA3j89w1P3V8', lat: 7.8220, lng: 98.3415 },

    // [ 한식당 ]
    { id: 'ko1', name: '리틀서울', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/ks76dgxCWoKkhd4w8', lat: 7.9050, lng: 98.3650 },
    { id: 'ko2', name: '정식당', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/tyJ7jnD8Bz1PXPzdA', lat: 7.8880, lng: 98.3050 },
    { id: 'ko3', name: '한끼 한국슈퍼', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/3EHEVxbU1C6s15tf8', lat: 7.8950, lng: 98.3650 },
    { id: 'ko4', name: '55식당', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/eadaRhWa8ww731ZR6', lat: 7.8955, lng: 98.2985 },
    { id: 'ko5', name: '세레스 식당', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/9fcVgtVAkHmeZVmd6', lat: 8.0050, lng: 98.3080 },
    { id: 'ko6', name: '타이가든', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/wUVri3FovsHbbvAe9', lat: 7.8980, lng: 98.3680 },
    { id: 'ko7', name: '흥부네', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/T5fySGtiWXahgMuz5', lat: 7.8910, lng: 98.2950 },
    { id: 'ko8', name: '마루 파통타운', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/Qb2Av4KhcTAhjete7', lat: 7.8935, lng: 98.3005 },
    { id: 'ko9', name: '기와', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/MP2ex1bNPLQij4g86', lat: 7.8915, lng: 98.3680 },
    { id: 'ko10', name: '민디하우스', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/xEphnxnvibrdwZPi7', lat: 7.8940, lng: 98.3020 },
    { id: 'ko11', name: '한국식당 파통', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/kFX3KprnKamzBwjL8', lat: 7.8925, lng: 98.2995 },
    { id: 'ko12', name: '사랑해요 바베큐', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/UpaxZZB6UZ4Pdv2KA', lat: 8.0035, lng: 98.3055 },
    { id: 'ko13', name: '까오리', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/uC7sMhTd3yYtcUir6', lat: 7.8905, lng: 98.3715 },
    { id: 'ko14', name: '리오치킨', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/Sg4RpphpevAGUSuD8', lat: 7.8945, lng: 98.3625 },
    { id: 'ko15', name: '궁 바베큐', category: 'KOREAN', googleMapsUrl: 'https://maps.app.goo.gl/UKv58nvrHxS2xwqt6', lat: 8.0020, lng: 98.3045 },

    // [푸켓 마리나]
    { id: 'ma1', name: '헤븐마리나', category: 'MARINA', googleMapsUrl: 'https://maps.app.goo.gl/ovECtPzhKRU6J6JV8', lat: 7.9550, lng: 98.3950 },
    { id: 'ma2', name: '보트라군 마리나', category: 'MARINA', googleMapsUrl: 'https://maps.app.goo.gl/GQTVCgaq7fmTKyvq5', lat: 7.9520, lng: 98.3910 },
    { id: 'ma3', name: '로얄푸켓 마리나', category: 'MARINA', googleMapsUrl: 'https://maps.app.goo.gl/T7HuXcMrGXip8BbB9', lat: 7.9500, lng: 98.3900 },
    { id: 'ma4', name: '찰롱 마리나', category: 'MARINA', googleMapsUrl: 'https://maps.app.goo.gl/1k2P9s3FDoyYBtsp8', lat: 7.8210, lng: 98.3415 },
    { id: 'ma5', name: '아오포 그랜드 마리나', category: 'MARINA', googleMapsUrl: 'https://maps.app.goo.gl/5R11tbS3YiyRJ2vp9', lat: 8.0600, lng: 98.4400 },
];
