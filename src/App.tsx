import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JourneyProvider } from './context/JourneyContext';
import JourneyStartScreen from './screens/JourneyStartScreen';
import JourneySelectScreen from './screens/JourneySelectScreen';
import LastDayScreen from './screens/LastDayScreen';
import TourDetailScreen from './screens/TourDetailScreen';
import MainScreen from './screens/MainScreen';
import AdminDashboard from './screens/AdminDashboard';
import ProductModal from './components/ProductModal';

const App: React.FC = () => {
  return (
    <JourneyProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<JourneyStartScreen />} />
            <Route path="/select" element={<JourneySelectScreen />} />
            <Route path="/result" element={<LastDayScreen />} />
            <Route path="/tour-detail/:id" element={<TourDetailScreen />} />
            <Route path="/old-main" element={<MainScreen />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          {/* 상품 클릭 시 나타날 모달 연결 */}
          <ProductModal product={null} isOpen={false} onClose={() => { }} />
        </div>
      </BrowserRouter>
    </JourneyProvider>
  );
};

export default App;