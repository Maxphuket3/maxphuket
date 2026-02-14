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

          {/* 상품 상세 모달 - 이 위치에 있어야 클릭이 먹힙니다 */}
          <ProductModal product={null} isOpen={false} onClose={() => { }} />
        </div>
      </BrowserRouter>
    </JourneyProvider>
  );
};

export default App;