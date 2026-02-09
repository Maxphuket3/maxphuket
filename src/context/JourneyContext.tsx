import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RecommendedPlace } from '../data/recommendedPlaces';

interface UserInfo {
    name: string;
    personCount: number;
    resort: string;
    flight: string;
    vehicleType: 'SEDAN' | 'VAN';
}

interface JourneyContextType {
    userInfo: UserInfo;
    setUserInfo: (info: UserInfo) => void;
    selectedPlaces: RecommendedPlace[];
    addPlace: (place: RecommendedPlace) => void;
    removePlace: (id: string) => void;
    resetJourney: () => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: '',
        personCount: 2,
        resort: '',
        flight: '',
        vehicleType: 'SEDAN'
    });

    const [selectedPlaces, setSelectedPlaces] = useState<RecommendedPlace[]>([]);

    const addPlace = (place: RecommendedPlace) => {
        // Prevent duplicates if desired, but user said "continue adding". 
        // We'll allow duplicates or filtering based on ID. 
        // For a trip, usually you visit a place once, so let's prevent duplicates for sanity.
        if (!selectedPlaces.find(p => p.id === place.id)) {
            setSelectedPlaces(prev => [...prev, place]);
        }
    };

    const removePlace = (id: string) => {
        setSelectedPlaces(prev => prev.filter(p => p.id !== id));
    };

    const resetJourney = () => {
        setUserInfo({ name: '', personCount: 2, resort: '', flight: '', vehicleType: 'SEDAN' });
        setSelectedPlaces([]);
    };

    return (
        <JourneyContext.Provider value={{ userInfo, setUserInfo, selectedPlaces, addPlace, removePlace, resetJourney }}>
            {children}
        </JourneyContext.Provider>
    );
};

export const useJourney = () => {
    const context = useContext(JourneyContext);
    if (!context) {
        throw new Error('useJourney must be used within a JourneyProvider');
    }
    return context;
};
