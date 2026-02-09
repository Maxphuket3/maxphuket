import React, { useState } from 'react';
import { hotspots } from '../data/hotspotsData';
import { tours, activities } from '../data/mockData';
import { MapPin, Navigation, Clock, Star, ArrowRight, CheckCircle, Search, Calendar } from 'lucide-react';

const Planner = () => {
    // State
    const [selectedSpots, setSelectedSpots] = useState([]);
    const [startLocation, setStartLocation] = useState('Patong Beach');
    const [optimizedRoute, setOptimizedRoute] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mapUrl, setMapUrl] = useState('');

    // Toggle Selection
    const toggleSpot = (spotName) => {
        if (selectedSpots.includes(spotName)) {
            setSelectedSpots(selectedSpots.filter(name => name !== spotName));
        } else {
            setSelectedSpots([...selectedSpots, spotName]);
        }
    };

    // Optimize Function
    const handleOptimize = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/optimize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    start_location: startLocation,
                    destinations: selectedSpots,
                    start_time: new Date().toISOString()
                })
            });
            const data = await response.json();
            setOptimizedRoute(data.route);

            // Map Generation
            const origin = encodeURIComponent(data.route[0].name + ", Phuket");
            const destination = encodeURIComponent(data.route[data.route.length - 1].name + ", Phuket");
            const waypoints = data.route.slice(1, -1).map(s => encodeURIComponent(s.name + ", Phuket")).join('|');
            const generatedMapUrl = `https://www.google.com/maps/embed/v1/directions?key=여기본인의키입력&origin=${origin}&destination=${destination}&waypoints=${waypoints}&mode=driving`;
            setMapUrl(generatedMapUrl);

        } catch (e) {
            console.error("Optimization failed", e);
            alert("서버 연결 실패. 백엔드가 실행 중인지 확인해주세요.");
        }
        setIsLoading(false);
    };

    // Components
    const SideCard = ({ item }) => (
        <div className="bg-[#1E293B] rounded-xl overflow-hidden mb-6 border border-slate-700 hover:border-[#EAB308] transition group">
            <div className="h-40 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-2 right-2 bg-black/70 text-[#EAB308] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={10} fill="#EAB308" /> {item.rating}
                </div>
            </div>
            <div className="p-4">
                <h4 className="font-bold text-slate-200 mb-1 leading-tight">{item.title}</h4>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-slate-400">{item.category || 'Activity'}</span>
                    <span className="text-[#EAB308] font-bold">{item.price}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans pt-24 pb-20">

            {/* Header */}
            <div className="text-center mb-10 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-[#EAB308] mb-3 font-serif tracking-tight">
                    AI Smart Planner
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Design your perfect Phuket journey. AI optimizes the route, you enjoy the ride.
                </p>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_300px] gap-8">

                {/* Left Column: Popular Tours */}
                <aside className="hidden lg:block">
                    <h3 className="text-[#EAB308] font-bold uppercase tracking-widest text-sm mb-6 border-b border-slate-800 pb-2">
                        Popular Tours
                    </h3>
                    {tours.map(tour => <SideCard key={tour.id} item={tour} />)}
                </aside>

                {/* Center Column: Main Planner */}
                <main>
                    {/* Input Section */}
                    <div className="bg-[#1E293B] rounded-3xl p-6 md:p-8 border border-slate-700 shadow-2xl mb-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#EAB308] to-transparent"></div>

                        <div className="mb-8">
                            <label className="block text-[#EAB308] text-sm font-bold uppercase tracking-wide mb-3">
                                Start Point
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-slate-500" size={20} />
                                <select
                                    value={startLocation}
                                    onChange={(e) => setStartLocation(e.target.value)}
                                    className="w-full bg-[#0B1120] text-white pl-12 pr-4 py-3 rounded-xl border border-slate-600 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] outline-none appearance-none cursor-pointer"
                                >
                                    <option value="Patong Beach">Patong Beach</option>
                                    <option value="Orchid Resort">Orchid Resort</option>
                                    <option value="Old Town">Old Town</option>
                                    <option value="Kamala Beach">Kamala Beach</option>
                                    <option value="Kata Beach">Kata Beach</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-3">
                                <label className="block text-[#EAB308] text-sm font-bold uppercase tracking-wide">
                                    Destinations
                                </label>
                                <span className="text-xs text-slate-500">{selectedSpots.length} selected</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {hotspots.map(spot => {
                                    const isSelected = selectedSpots.includes(spot.title);
                                    return (
                                        <div
                                            key={spot.id}
                                            onClick={() => toggleSpot(spot.title)}
                                            className={`
                                                cursor-pointer rounded-lg p-3 flex items-center gap-3 border transition-all duration-200
                                                ${isSelected
                                                    ? 'bg-[#EAB308]/10 border-[#EAB308] text-[#EAB308]'
                                                    : 'bg-[#0B1120] border-slate-700 text-slate-400 hover:border-slate-500'
                                                }
                                            `}
                                        >
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#EAB308] bg-[#EAB308]' : 'border-slate-600'}`}>
                                                {isSelected && <CheckCircle size={10} className="text-black" />}
                                            </div>
                                            <span className="text-sm font-medium truncate">{spot.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            onClick={handleOptimize}
                            disabled={selectedSpots.length === 0 || isLoading}
                            className={`
                                w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                                ${selectedSpots.length === 0
                                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-[#EAB308] hover:bg-[#CA9A06] text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                                }
                            `}
                        >
                            {isLoading ? (
                                <>Processing... <span className="animate-spin">⏳</span></>
                            ) : (
                                <>Calculate Optimal Route <Navigation size={20} /></>
                            )}
                        </button>
                    </div>

                    {/* Results Section */}
                    {optimizedRoute && (
                        <div className="animate-fade-in-up">
                            {/* Stats Bar */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-[#1E293B] rounded-xl p-4 text-center border border-slate-700">
                                    <div className="text-slate-400 text-xs uppercase">Total Spots</div>
                                    <div className="text-[#EAB308] font-bold text-xl">{optimizedRoute.length}</div>
                                </div>
                                <div className="bg-[#1E293B] rounded-xl p-4 text-center border border-slate-700">
                                    <div className="text-slate-400 text-xs uppercase">Est. Duration</div>
                                    <div className="text-[#EAB308] font-bold text-xl">~6 Hrs</div>
                                </div>
                                <div className="bg-[#1E293B] rounded-xl p-4 text-center border border-slate-700">
                                    <div className="text-slate-400 text-xs uppercase">Efficiency</div>
                                    <div className="text-[#EAB308] font-bold text-xl">High</div>
                                </div>
                            </div>

                            {/* Map */}
                            {mapUrl && (
                                <div className="w-full h-[300px] rounded-2xl overflow-hidden mb-8 border border-slate-700 shadow-xl relative group">
                                    <div className="absolute inset-0 bg-slate-900 animate-pulse" />
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, position: 'relative', zIndex: 10 }}
                                        loading="lazy"
                                        allowFullScreen
                                        src={mapUrl}
                                    ></iframe>
                                </div>
                            )}

                            {/* Timeline */}
                            <div className="relative pl-4 space-y-8">
                                <div className="absolute top-4 left-[27px] bottom-4 w-0.5 bg-linear-to-b from-[#EAB308] to-slate-800"></div>

                                {optimizedRoute.map((stop, index) => (
                                    <div key={index} className="relative flex items-start group">
                                        <div className={`
                                            w-6 h-6 rounded-full border-4 border-[#0B1120] z-10 shrink-0 mr-6 shadow-[0_0_10px_rgba(234,179,8,0.5)]
                                            ${index === 0 ? 'bg-white' : 'bg-[#EAB308]'}
                                        `}></div>

                                        <div className="flex-1 bg-[#1E293B] rounded-xl p-5 border border-slate-700 group-hover:border-[#EAB308]/50 transition">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg text-white">{stop.name}</h3>
                                                <span className="bg-[#0B1120] text-[#EAB308] text-xs font-mono px-2 py-1 rounded">
                                                    {new Date(stop.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>

                                            {stop.type !== 'start' && (
                                                <div className="flex gap-2">
                                                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">
                                                        Open Now
                                                    </span>
                                                    <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                                                        Recommended time: 1h
                                                    </span>
                                                </div>
                                            )}

                                            {stop.travel_time_sec > 0 && (
                                                <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center gap-2 text-xs text-slate-500">
                                                    <Navigation size={12} /> Travel time: about {Math.round(stop.travel_time_sec / 60)} mins
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!optimizedRoute && (
                        <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl opacity-50">
                            <Search size={48} className="mx-auto text-slate-600 mb-4" />
                            <p className="text-slate-500 text-lg">Select destinations to generate your route</p>
                        </div>
                    )}
                </main>

                {/* Right Column: Activities */}
                <aside className="hidden lg:block">
                    <h3 className="text-[#EAB308] font-bold uppercase tracking-widest text-sm mb-6 border-b border-slate-800 pb-2">
                        Top Activities
                    </h3>
                    {activities.map(act => <SideCard key={act.id} item={act} />)}
                </aside>

            </div>
        </div>
    );
};

export default Planner;
