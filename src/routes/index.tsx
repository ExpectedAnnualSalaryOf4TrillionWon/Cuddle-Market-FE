// import Header from '@src/components/commons/header/Header';
// import AlarmPage from '@pages/AlarmPage';
import Home from '@src/pages/home/Home'

import KakaoCallback from '@pages/KakaoCallback'

import Login from '@src/pages/login/Login'
import MyPage from '@src/pages/my-page/MyPage'
// import ProductDetail from '@pages/ProductDetail';
// import ProductPost from '@pages/ProductPost';
// import ProfileUpdate from '@pages/ProfileUpdate';
import Signup from '@src/pages/signup/Signup'
// import UserPage from '@pages/UserPage';
import { Route, Routes } from 'react-router-dom'
import MainLayout from '@src/layouts/MainLayout'
import { ROUTES } from '@src/constants/routes'
import ProductDetail from '@src/pages/product-detail/ProductDetail'
import ProductPost from '@src/pages/product-post/ProductPost'
import ProfileUpdate from '@src/pages/profile-update/ProfileUpdate'
import UserPage from '@src/pages/UserPage'
import FindPasswordPage from '@src/pages/find-password/FindPasswordPage'
import CommunityPage from '@src/pages/community/CommunityPage'
import CommunityPostForm from '@src/pages/community/components/CommunityPostForm'
import CommunityDetail from '@src/pages/community/CommunityDetail'
import GoogleCallback from '@src/pages/GoogleCallback'

const routes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.SIGNUP, element: <Signup /> },
  { path: ROUTES.FIND_PASSWORD, element: <FindPasswordPage /> },
  { path: ROUTES.MYPAGE, element: <MyPage /> },
  { path: ROUTES.DETAIL, element: <ProductDetail /> },
  { path: ROUTES.PRODUCT_POST, element: <ProductPost /> },
  { path: ROUTES.PRODUCT_EDIT, element: <ProductPost /> },
  { path: ROUTES.PROFILE_UPDATE, element: <ProfileUpdate /> },
  { path: ROUTES.USER_PROFILE, element: <UserPage /> },
  { path: ROUTES.COMMUNITY, element: <CommunityPage /> },
  { path: ROUTES.COMMUNITY_POST, element: <CommunityPostForm /> },
  { path: ROUTES.COMMUNITY_DETAIL, element: <CommunityDetail /> },
  { path: ROUTES.COMMUNITY_EDIT, element: <CommunityPostForm /> },
]

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
      <Route path="/oauth-redirect" element={<GoogleCallback />} />
    </Routes>
  )
}

export default AppRoutes
