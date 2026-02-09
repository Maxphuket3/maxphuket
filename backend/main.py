from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import random
import csv
import collections
import googlemaps
import os
from dotenv import load_dotenv

app = FastAPI()

# Enable CORS for frontend
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to specific frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
gmaps = None

if API_KEY and API_KEY != "여기본인의키입력":
    try:
        gmaps = googlemaps.Client(key=API_KEY)
        print(f"[INFO] Google Maps Client Initialized")
    except Exception as e:
        print(f"[WARN] Google Maps Init Failed: {e}")


# --- Driver Master DB (Simulated) ---
DRIVER_MASTER_DB = []

class DriverRegistration(BaseModel):
    fullName: str
    phone: str
    vehicleType: str
    photoName: Optional[str] = None

def notify_admin(message: str):
    """Simulate Notify_Admin('New Driver Registered')"""
    print(f"[ADMIN NOTIFICATION] {message} at {datetime.now().isoformat()}")

def send_line_message(phone: str, message: str):
    """Simulate Send_Line_Message action"""
    print(f"[LINE MESSAGE SENT TO {phone}] {message}")

def generate_driver_id():
    """Auto Generate Driver_ID_Unique"""
    return f"DRV-{random.randint(1000, 9999)}-{datetime.now().strftime('%M%S')}"


# --- Data Models ---
class AnalyzeRequest(BaseModel):
    start_location: str
    destinations: List[str]
    start_time: Optional[str] = None # ISO format

class Stop(BaseModel):
    name: str
    arrival_time: str
    departure_time: str
    travel_time_sec: int
    is_open: bool
    type: str

class RouteResponse(BaseModel):
    route: List[Stop]
    total_duration_sec: int

# --- Learning Engine (Transition Probabilities) ---
TRANSITION_GRAPH = collections.defaultdict(lambda: collections.defaultdict(int))

def load_learning_data():
    """Parses the history CSV and builds a transition probability graph."""
    global TRANSITION_GRAPH
    csv_path = os.path.join(os.path.dirname(__file__), "동선_예시.csv")
    
    if not os.path.exists(csv_path):
        print("[WARN] Learning data not found. Skipping.")
        return

    print("[INFO] Loading Learning Data from CSV...")
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            count = 0
            for row in reader:
                raw_route = row['Route']
                # Parse route string "A -> B -> C"
                stops = [s.strip() for s in raw_route.split('->')]
                
                # Resolve names to our standard keys
                resolved_stops = [resolve_name(s) for s in stops]
                
                # Build pairs (A -> B)
                for i in range(len(resolved_stops) - 1):
                    curr_s = resolved_stops[i]
                    next_s = resolved_stops[i+1]
                    if curr_s != next_s:
                        TRANSITION_GRAPH[curr_s][next_s] += 1
                        count += 1
            print(f"[INFO] Learned {count} transitions patterns.")
    except Exception as e:
        print(f"[ERROR] Error loading learning data: {e}")

# --- Data & Logic ---

LOCATIONS = {
    # Existing
    'Patong Beach': {'lat': 7.896, 'lng': 98.295, 'hours': (0, 24)},
    'Old Town': {'lat': 7.889, 'lng': 98.390, 'hours': (0, 24)},
    'Tu Kab Khao': {'lat': 7.883, 'lng': 98.392, 'hours': (11, 22)},
    'Three Monkeys': {'lat': 7.894, 'lng': 98.352, 'hours': (10, 22)},
    'Illuzion Phuket': {'lat': 7.893, 'lng': 98.297, 'hours': (21, 4)},
    'Cafe Del Mar': {'lat': 7.953, 'lng': 98.283, 'hours': (12, 24)},
    'Yona Beach Club': {'lat': 7.960, 'lng': 98.380, 'hours': (12, 19)},
    'Ma Doo Bua Cafe': {'lat': 8.016, 'lng': 98.332, 'hours': (9, 18)},
    'Coming Home Cafe': {'lat': 7.880, 'lng': 98.390, 'hours': (8, 20)}, 
    'Moonstone Cafe': {'lat': 7.805, 'lng': 98.406, 'hours': (8, 18)},
    'Mai Khao Plane Spotting': {'lat': 8.111, 'lng': 98.305, 'hours': (6, 18)},
    'Soi Romanee': {'lat': 7.884, 'lng': 98.391, 'hours': (0, 24)},
    'Promthep Cape': {'lat': 7.763, 'lng': 98.306, 'hours': (0, 24)},
    
    # NEW from User Data
    'Wat Chalong': {'lat': 7.846, 'lng': 98.337, 'hours': (8, 17)}, # 왓찰롱 사원
    'Big Buddha': {'lat': 7.827, 'lng': 98.312, 'hours': (6, 19)}, 
    'Karon Viewpoint': {'lat': 7.797, 'lng': 98.302, 'hours': (0, 24)}, # 카론 뷰포인트
    'Khao Rang Hill': {'lat': 7.893, 'lng': 98.385, 'hours': (0, 24)}, # 카오랑 뷰포인트
    'Tiger Park': {'lat': 7.835, 'lng': 98.335, 'hours': (9, 18)}, # 타이거파크
    'Dolphin Show': {'lat': 7.842, 'lng': 98.353, 'hours': (9, 17)}, # 돌핀쇼 (Dolphin Bay)
    'Chillva Market': {'lat': 7.907, 'lng': 98.375, 'hours': (17, 23)}, # 칠와 야시장
    'Central Festival': {'lat': 7.891, 'lng': 98.368, 'hours': (10, 22)}, # 센트럴 백화점
    'Jungceylon': {'lat': 7.892, 'lng': 98.298, 'hours': (11, 22)}, # 정실론
    'We Cafe': {'lat': 7.854, 'lng': 98.361, 'hours': (8, 21)}, # 위카페 (Chaofa branch assumed)
    'Som Chit Noodle': {'lat': 7.876, 'lng': 98.396, 'hours': (8, 16)}, # 쏨찟국수 (closes early!)
    'Massage': {'lat': 7.890, 'lng': 98.295, 'hours': (9, 23)}, # Generic Massage
    'Airport': {'lat': 8.111, 'lng': 98.306, 'hours': (0, 24)}, # 푸켓국제공항

    # Specific Requests (Orchid Resort, 55 Spa)
    'Orchid Resort': {'lat': 7.839, 'lng': 98.300, 'hours': (0, 24)}, # Orchid Resortel (Kata/Karon Area)
    '55 Spa': {'lat': 7.891, 'lng': 98.297, 'hours': (10, 22)}, # Assuming Patong location or using generic coords if unsure
}

# Mapping user terms to keys
NAME_MAPPING = {
    '왓찰롱': 'Wat Chalong', '왓찰롱사원': 'Wat Chalong', 'Wat Chalong': 'Wat Chalong',
    '올드타운': 'Old Town', '푸켓 올드타운': 'Old Town',
    '쓰리몽키즈': 'Three Monkeys', '쓰리몽키즈 레스토랑': 'Three Monkeys',
    '공항': 'Airport', '푸켓국제공항': 'Airport', '푸켓 국제공항': 'Airport',
    '마사지': 'Massage', '샤워 가능한 마사지 샵': 'Massage', '샤워가능 마사지': 'Massage', '55스파': '55 Spa', '55 Spa': '55 Spa',
    '칠와': 'Chillva Market', '칠와 야시장': 'Chillva Market', '칠와 마켓': 'Chillva Market',
    '돌핀쇼': 'Dolphin Show', '푸켓 돌핀쇼': 'Dolphin Show',
    '타이거파크': 'Tiger Park', 
    '카론 뷰포인트': 'Karon Viewpoint', '카오랑': 'Khao Rang Hill', '카오랑 뷰포인트': 'Khao Rang Hill', '카오랑힐': 'Khao Rang Hill',
    '위카페': 'We Cafe', 'We Cafe': 'We Cafe', 'WE CAFÉ': 'We Cafe',
    '쏨찟': 'Som Chit Noodle', '쏨찟국수': 'Som Chit Noodle', '쏨짓 바미국수': 'Som Chit Noodle',
    '빅부다': 'Big Buddha',
    '오키드 리조트': 'Orchid Resort', 'Orchid Resort': 'Orchid Resort'
}

def resolve_name(name: str):
    for key, val in NAME_MAPPING.items():
        if key in name:
            return val
    if name in LOCATIONS:
        return name
    return name # Unknown

def get_real_travel_info(origin: str, dest: str):
    """Fetch real travel time from Google Maps Distance Matrix"""
    if not gmaps:
        return None
    
    try:
        # Use Phuket, Thailand context
        matrix = gmaps.distance_matrix(
            origins=f"{origin}, Phuket",
            destinations=f"{dest}, Phuket",
            mode="driving",
            departure_time=datetime.now()
        )
        element = matrix['rows'][0]['elements'][0]
        if element['status'] == 'OK':
            duration_sec = element['duration_in_traffic']['value']
            return duration_sec
    except Exception as e:
        print(f"⚠️ Distance Matrix Failed for {origin}->{dest}: {e}")
        return None

def get_custom_weight(place_name: str, current_hour: int, next_dest: str = None) -> int:
    weight = 0
    
    # Rule 1: Sunset/Golden Hour (17:00-18:00)
    if place_name in ['Promthep Cape', 'Three Monkeys', 'Cafe Del Mar', 'Khao Rang Hill', 'Karon Viewpoint']:
        if 17 <= current_hour <= 18:
            weight += 50
            
    # Rule 2: Morning Spots (Cooler)
    if place_name in ['Ma Doo Bua Cafe', 'Mai Khao Plane Spotting', 'Tiger Park', 'Wat Chalong']:
        if current_hour < 11:
            weight += 30
            
    # Rule 3: Lunch Spots (12:00-14:00)
    if place_name in ['Tu Kab Khao', 'Som Chit Noodle', 'We Cafe', 'Three Monkeys']:
        if 11 <= current_hour <= 14:
            weight += 40

    # Rule 4: Night Market (Evening only)
    if place_name == 'Chillva Market':
        if current_hour >= 17:
            weight += 60
        else:
            weight -= 100 # Closed or boring

    # Rule 5: Pre-Airport Ritual (Massage or Market)
    if next_dest == 'Airport':
        if place_name in ['Massage', 'Chillva Market', 'Central Festival', '55 Spa']:
             weight += 100 # Huge priority if next is airport

    # Rule 6: Temples (Daytime only)
    if place_name in ['Wat Chalong', 'Big Buddha']:
        if current_hour > 16:
            weight -= 50 # Too late

    return weight

def get_transition_bonus(current_place: str, next_candidate: str) -> int:
    """Returns a bonus score if this transition is historically popular."""
    if current_place not in TRANSITION_GRAPH:
        return 0
    
    transitions = TRANSITION_GRAPH[current_place]
    total_out = sum(transitions.values())
    
    if total_out == 0:
        return 0
        
    count = transitions.get(next_candidate, 0)
    probability = count / total_out
    
    # Max bonus 100 points
    return int(probability * 100)

def check_is_open(place_name: str, dt: datetime) -> bool:
    if place_name not in LOCATIONS:
        return True # Assume open if unknown
    
    open_h, close_h = LOCATIONS[place_name]['hours']
    curr_h = dt.hour
    
    if close_h < open_h: # e.g. 21:00 to 04:00
        return curr_h >= open_h or curr_h < close_h
    else:
        return open_h <= curr_h < close_h

# Load CSV on startup
load_learning_data()

@app.post("/optimize", response_model=RouteResponse)
async def optimize_route_endpoint(request: AnalyzeRequest):
    # Determine Start Time
    start_time = datetime.now()
    if request.start_time:
        try:
            start_time = datetime.fromisoformat(request.start_time.replace('Z', '+00:00'))
            if start_time.tzinfo:
                start_time = start_time.replace(tzinfo=None) 
        except:
            pass

    # Normalize Start/Destinations
    current_location = resolve_name(request.start_location)
    current_time = start_time
    
    final_route = []
    
    # Add Start Node
    final_route.append(Stop(
        name=current_location,
        arrival_time=current_time.isoformat(),
        departure_time=current_time.isoformat(),
        travel_time_sec=0,
        is_open=True,
        type='start'
    ))
    
    unvisited = [resolve_name(d) for d in request.destinations]
    # Remove start if duplicate
    unvisited = list(set([x for x in unvisited if x != current_location]))
     
    # Greedy with Backtracking/Waiting
    while unvisited:
        possible_next_stops = []
        
        # Look ahead to see if Airport is in list (to prioritize pre-airport stops)
        next_is_airport = 'Airport' in unvisited and len(unvisited) == 1
        
        for loc in unvisited:
            # 1. Travel Time
            real_duration = get_real_travel_info(current_location, loc)
            if real_duration:
                travel_min = int(real_duration / 60)
            else:
                loc_data = LOCATIONS.get(loc, LOCATIONS['Patong Beach'])
                curr_data = LOCATIONS.get(current_location, LOCATIONS['Patong Beach'])
                dist_Approx = ((loc_data['lat'] - curr_data['lat'])**2 + (loc_data['lng'] - curr_data['lng'])**2)**0.5
                dist_km = dist_Approx * 111 * 1.5 
                travel_min = int((dist_km / 30) * 60)
            
            arrival_at = current_time + timedelta(minutes=travel_min)
            
            # 2. Check Open
            is_open = check_is_open(loc, arrival_at) 
            if not is_open:
                continue # Skip closed
                
            # 3. Weights
            next_target = 'Airport' if next_is_airport else None
            knowledge_score = get_custom_weight(loc, arrival_at.hour, next_target)
            transition_bonus = get_transition_bonus(current_location, loc)
            
            # 4. Total Score
            score = (knowledge_score * 2) + (transition_bonus * 1.5) - travel_min
            
            possible_next_stops.append({
                'name': loc,
                'score': score,
                'travel_min': travel_min,
                'arrival_at': arrival_at,
                'is_open': is_open
            })
            
        possible_next_stops.sort(key=lambda x: x['score'], reverse=True)
        
        if not possible_next_stops:
            # Wait/Advance time
            current_time += timedelta(minutes=30)
            if (current_time - start_time).days > 1: break 
            continue
            
        best = possible_next_stops[0]
        
        # Determine visit duration
        visit_duration = 60 
        if best['name'] in ['Massage', '55 Spa']: visit_duration = 120 # 2 hours for spa
        if best['name'] == 'Dolphin Show': visit_duration = 60
        if best['name'] == 'Three Monkeys': visit_duration = 90 # Dinner
        
        departure_at = best['arrival_at'] + timedelta(minutes=visit_duration)
        
        final_route.append(Stop(
            name=best['name'],
            arrival_time=best['arrival_at'].isoformat(),
            departure_time=departure_at.isoformat(),
            travel_time_sec=best['travel_min'] * 60,
            is_open=True,
            type='stop'
        ))
        
        current_location = best['name']
        current_time = departure_at
        unvisited.remove(best['name'])
        
    return RouteResponse(
        route=final_route,
        total_duration_sec=int((current_time - start_time).total_seconds())
    )

@app.post("/register-driver")
async def register_driver(registration: DriverRegistration):
    driver_id = generate_driver_id()
    new_driver = {
        "driver_id": driver_id,
        **registration.dict(),
        "status": "pending", # Default status for approval
        "registered_at": datetime.now().isoformat()
    }
    DRIVER_MASTER_DB.append(new_driver)
    
    # Notify Admin Action
    notify_admin(f"New Driver Registered: {registration.fullName} ({driver_id})")
    
    # Registration_Success Flow: Send_Line_Message
    welcome_msg = "ยินดีต้อนรับ! ข้อมูลของคุณได้รับการบันทึกแล้ว เราจะติดต่อกลับโดยเร็วที่สุด"
    send_line_message(registration.phone, welcome_msg)
    
    return {
        "status": "success",
        "message": "Driver registration completed successfully",
        "driver_id": driver_id
    }

@app.post("/admin/approve-driver")
async def approve_driver(payload: dict):
    driver_id = payload.get("driver_id")
    status = payload.get("status") # approved or rejected
    for driver in DRIVER_MASTER_DB:
        if driver["driver_id"] == driver_id:
            driver["status"] = status
            return {"status": "success", "updated_driver": driver_id}
    raise HTTPException(status_code=404, detail="Driver not found")

@app.get("/admin/revenue")
async def get_revenue_data():
    """Dummy revenue data for Chart"""
    return {
        "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "values": [1250, 2300, 1800, 3100, 2800, 4500, 5200]
    }

@app.post("/admin/send-message")
async def send_direct_message(payload: dict):
    driver_id = payload.get("driver_id")
    msg = payload.get("message")
    # Simulation
    print(f"[DIRECT MESSAGE TO {driver_id}] {msg}")
    return {"status": "sent"}

@app.get("/admin/drivers")
async def get_drivers():
    """CEO Admin Access: View all drivers"""
    return sorted(DRIVER_MASTER_DB, key=lambda x: x['registered_at'], reverse=True)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
