import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { JourneyProvider } from './context/JourneyContext';
import JourneyStartScreen from './screens/JourneyStartScreen';
import JourneySelectScreen from './screens/JourneySelectScreen';
import LastDayScreen from './screens/LastDayScreen';

// Legacy screens (kept for reference if needed, but hidden from main flow)
import MainScreen from './screens/MainScreen';
import DashboardScreen from './screens/DashboardScreen';
import AdminDashboard from './screens/AdminDashboard';
import DriverRegistration from './screens/DriverRegistration';

const App: React.FC = () => {
  return (
    <JourneyProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* 3-Step Journey Flow */}
            <Route path="/" element={<JourneyStartScreen />} />
            <Route path="/select" element={<JourneySelectScreen />} />
            <Route path="/result" element={<LastDayScreen />} />

            {/* Legacy Routes / Hidden */}
            <Route path="/old-main" element={<MainScreen onNext={() => { }} />} />
            <Route path="/admin" element={<AdminDashboard onBack={() => { }} />} />
            <Route path="/driver-register" element={<DriverRegistration onBack={() => window.history.back()} />} />

            {/* Catch all - Redirect to Start */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </JourneyProvider>
  );
};

export default App;
