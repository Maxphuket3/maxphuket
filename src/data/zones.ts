import { Spot, Partner } from '../types';

export const ZONES = {
    SOUTH: ["Rawai", "NaiHarn"],
    WEST: ["Patong", "Karon", "Kata"],
    CENTRAL: ["OldTown", "Kathu"],
    LAGUNA: ["Bangtao", "Kamala", "Surin"],
    NORTH: ["良好", "Naiyang"]
};

/**
 * 특정 호텔의 위치에 따른 추천 스팟 우선순위 반환
 */
export const getPrioritySpots = (hotelZone: string): string[] => {
    if (hotelZone === "South") return ["s1"]; // 왓찰롱 사원
    if (hotelZone === "West") return ["karon-view-point"];
    return [];
};
