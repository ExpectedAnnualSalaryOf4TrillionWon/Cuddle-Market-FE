import Header from '@layout/Header';
import Home from '@pages/Home';

import KakaoCallback from '@pages/KakaoCallback';
import Login from '@pages/Login';
import ProductDetail from '@pages/ProductDetail';
import ProductPost from '@pages/ProductPost';
import Signup from '@pages/Signup';
import UserPage from '@pages/UserPage';
import { Outlet, Route, Routes } from 'react-router-dom';
import MyPage from '@pages/MyPage';

const WithHeaderLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const NoHeaderLayout = () => <Outlet />;

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Header 포함 구간: Home, ProductDetail */}
        <Route element={<WithHeaderLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Route>


      {/* Header 미포함 구간: Signup, MyPage */}
      <Route element={<NoHeaderLayout />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product-post" element={<ProductPost />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
      <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
    </Routes>

  );
};

export default AppRoutes;
