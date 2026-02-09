# Phuket Tour Knowledge Base & Pattern Rules

## 1. Popular Sequence Patterns (Sequencing Rules)
- **Airport Sending**: [Activity/Sightseeing] -> [Massage/Shower] -> [Dinner/Night Market] -> [Airport]
    - *Reasoning*: Most travelers want to wash up (Massage 60-120min) before their late-night flight.
    - *Action*: If destination is 'Airport', suggest 'Massage' or 'Night Market' immediately preceding it.
- **Temple & Culture**: 'Wat Chalong' (Chalong Temple) is often paired with 'Old Town' or 'Big Buddha'.
    - *Time*: Wat Chalong is usually visited in the afternoon (13:00 - 16:00).
- **Dining**: 
    - 'Three Monkeys' is a very popular stop for Lunch (12:00-14:00) or Sunset Dinner (17:00-19:00).
    - 'Tu Kab Khao', 'One Chun', 'Mee Ton Poe' (Noodles) are popular Lunch/Dinner spots in Old Town.
    - 'We Cafe' is a popular lunch spot.
- **Viewpoints**: 
    - 'Khao Rang Hill' is often visited before 'Old Town' or for Sunset.
    - 'Promthep Cape' is strictly a Sunset spot (17:30 - 18:30).

## 2. Time-Based Constraints (Scheduling Rules)
- **Markets**:
    - 'Chillva Market': Evening only (17:00+). Good last stop before Airport.
    - 'Sunday Walking Street' (Lard Yai): Sunday evenings only in Old Town.
- **Activities**:
    - 'Dolphin Show': Has fixed showtimes (usually 11:00, 14:00, 17:00). Needs strict scheduling.
    - 'Island Tours': Usually morning departures (08:00 - 09:00).
- **Traffic**:
    - Avoid Patong Beach Road during rush hour (18:00 - 20:00) if possible unless destination is there.

## 3. Location Clusters (Grouping Rules)
- **Chalong Area**: Wat Chalong, Dolphin Bay, Tiger Park, Bird Park, Zoo. -> Group these together.
- **Old Town Area**: Rang Hill, Central Festival, Andamanda Waterpark.
- **North (Airport)**: Mai Khao Beach, Splash Jungle, Yacht Haven.
- **South**: Promthep Cape, Rawai Seafood, Yanui Beach.

## 4. User Preferences (Implicit Weights)
- **High Frequency Spots**: 
    - `Wat Chalong` (Must See)
    - `Old Town` (Must See)
    - `Three Monkeys` (Must Visit Restaurant)
    - `Massage` (Must Do before flight)
- **Hidden Gems**:
    - `Ma Doo Bua` (Lotus Cafe)
    - `Som Chit Noodle` (Local food)

## 5. Optimization Weights (For Code)
- IF `Next Stop` == 'Airport' AND `Current Time` > 18:00:
    - Boost Score for `Massage` (+50)
    - Boost Score for `Chillva Market` (+30)
- IF `Place` == 'Three Monkeys':
    - Boost Score if `Time` is 12:00-13:00 OR 17:00-18:00 (+40)
- IF `Place` == 'Wat Chalong':
    - Boost Score if `Time` is 10:00-16:00 (+20)
    - Penalty if `Time` > 17:00 (-50) (Temples close/get dark)
