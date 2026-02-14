import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JourneyProvider } from './context/JourneyContext';
import MainScreen from './screens/MainScreen';
import TourDetailScreen from './screens/TourDetailScreen';
import ReservationScreen from './screens/ReservationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import AdminDashboard from './screens/AdminDashboard';
import ProductModal from './components/ProductModal';

const App: React.FC = () => {
  return (
    <JourneyProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/tour/:id" element={<TourDetailScreen />} />
            <Route path="/reservation" element={<ReservationScreen />} />
            <Route path="/confirmation" element={<ConfirmationScreen />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>

          {/* 상품 상세 모달 연결 - 이 줄이 있어야 클릭 시 팝업이 뜹니다 */}
          <ProductModal product={null} isOpen={false} onClose={() => { }} />
        </div>
      </BrowserRouter>
    </JourneyProvider>
  );
};

export default App;