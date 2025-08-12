import Header from '@layout/Header';
import Home from '@pages/Home';
import ProductDetail from '@pages/ProductDetail';
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
      </Route>

      {/* Header 미포함 구간: Signup */}
      <Route element={<NoHeaderLayout />}>
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
