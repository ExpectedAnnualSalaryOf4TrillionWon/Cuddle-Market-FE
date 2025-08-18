import Footer from '@layout/Footer';
import Header from '@layout/Header';
import AlarmPage from '@pages/AlarmPage';
import ChatPage from '@pages/ChatPage';
import Home from '@pages/Home';

import KakaoCallback from '@pages/KakaoCallback';

import Login from '@pages/Login';
import MyPage from '@pages/MyPage';
import ProductDetail from '@pages/ProductDetail';
import ProductPost from '@pages/ProductPost';
import Signup from '@pages/Signup';
import UserPage from '@pages/UserPage';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

const WithHeaderLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

const NoHeaderLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className={`min-h-screen ${pathName === '/signin' ? 'bg-primary' : 'bg-gray-50'}`}>
      <Outlet />
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Header 포함 구간: Home, ProductDetail */}
      <Route element={<WithHeaderLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>

      {/* Header 미포함 구간: Signup, MyPage */}
      <Route element={<NoHeaderLayout />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/product-post" element={<ProductPost />} />
      </Route>
      <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
    </Routes>
  );
};

export default AppRoutes;
