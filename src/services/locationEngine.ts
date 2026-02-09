import { Spot, User, Itinerary, ItineraryItem } from '../types';

/**
 * Phuket Location Engine
 * 핵심 전략: 북향 우선순위 (Northbound Priority) & 백트래킹 방지
 */
export class LocationEngine {
  private readonly AIRPORT_LAT = 8.1132; // 푸켓 국제공항 위도
  private readonly AIRPORT_LNG = 98.3048;

  constructor(
    private spots: Spot[],
    private user: User,
    private historicalTrafficData: any // 시티투어 동선모음 데이터 기반
  ) {}

  /**
   * 최적의 동선 생성
   */
  public generateItinerary(selectedSpotIds: string[]): Itinerary {
    const selectedSpots = this.spots.filter(s => selectedSpotIds.includes(s.id));
    
    // 1. 위도 순으로 정렬 (남쪽 -> 북쪽)
    // 이것이 'Northbound Priority'의 기초가 됨
    const sortedSpots = [...selectedSpots].sort((a, b) => a.lat - b.lat);

    // 2. 일정 아이템 생성
    let currentTime = new Date(this.user.flight_time);
    currentTime.setHours(currentTime.getHours() - 12); // 비행 12시간 전부터 시작한다고 가정

    const itineraryItems: ItineraryItem[] = [];
    let totalCost = 0;

    sortedSpots.forEach(spot => {
      // 영업 시간 체크 (간단화)
      const arrival = new Date(currentTime);
      const departure = new Date(arrival.getTime() + spot.duration * 60000);

      itineraryItems.push({
        spot,
        arrival_time: arrival,
        duration: spot.duration,
        departure_time: departure
      });

      totalCost += spot.price;
      currentTime = new Date(departure.getTime() + 30 * 60000); // 이동 시간 30분 가정 (나중에 고도화)
    });

    // 3. 공항 도착 시간 체크
    const lastDeparture = itineraryItems.length > 0 
      ? itineraryItems[itineraryItems.length - 1].departure_time 
      : currentTime;
      
    const airportArrival = new Date(lastDeparture.getTime() + 60 * 60000); // 공항까지 1시간 가정

    return {
      user_id: "user_123",
      start_location: this.user.hotel,
      items: itineraryItems,
      total_cost: totalCost,
      status: 'Draft'
    };
  }

  /**
   * 백트래킹(역행) 감지 로직
   */
  public static checkBacktracking(currentLat: number, nextLat: number): boolean {
    return nextLat < currentLat; // 북향 동선에서 위도가 낮아지면 역행
  }

  /**
   * 하이브리드 교통 시간 계산
   * 구글 예측 시간과 과거 데이터를 비교하여 더 보수적인 시간을 선택
   */
  public calculateTravelTime(googleTime: number, historicalTime: number): number {
    if (googleTime < historicalTime) {
      return historicalTime * 1.1; // 10% 버퍼 추가
    }
    return googleTime;
  }
}
