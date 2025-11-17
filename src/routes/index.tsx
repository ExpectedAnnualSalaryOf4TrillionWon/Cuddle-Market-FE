import Header from '@components/common/Header';
import AlarmPage from '@pages/AlarmPage';
import Home from '@pages/Home';

import KakaoCallback from '@pages/KakaoCallback';

import Login from '@pages/Login';
import MyPage from '@pages/MyPage';
import ProductDetail from '@pages/ProductDetail';
import ProductPost from '@pages/ProductPost';
import ProfileUpdate from '@pages/ProfileUpdate';
import Signup from '@pages/Signup';
import UserPage from '@pages/UserPage';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

const WithHeaderLayout = () => (
  <div className="min-h-screen ">
    <Header />
    <Outlet />
  </div>
);

const NoHeaderLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className={`min-h-screen ${pathName === '/signin' ? 'bg-primary' : ''}`}>
      <Outlet />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Header 포함 구간: Home, ProductDetail */}
      <Route element={<WithHeaderLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>

      {/* Header 미포함 구간: Signup, MyPage */}
      <Route element={<NoHeaderLayout />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route element={<ProductPost />}>
          <Route path="/product-post" />
          <Route path="/products/:id/edit" />
        </Route>
        {/* 같은 element를 갖는 라우트를 묶자는 멘토링 내용 반영 */}
      </Route>

      <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
    </Routes>
  );
};

export default AppRoutes;
