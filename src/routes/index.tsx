import Header from '@layout/Header';
import Home from '@pages/Home';
import MyPage from '@pages/MyPage';
import ProductDetail from '@pages/ProductDetail';
import Signup from '@pages/Signup';
import UserPage from '@pages/UserPage';
import { Outlet, Route, Routes } from 'react-router-dom';

const WithHeaderLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const NoHeaderLayout = () => <Outlet />;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Header 포함 구간: Home, ProductDetail */}
      <Route element={<WithHeaderLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Route>

      {/* Header 미포함 구간: Signup, MyPage */}
      <Route element={<NoHeaderLayout />}>
        <Route path="/signin" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
