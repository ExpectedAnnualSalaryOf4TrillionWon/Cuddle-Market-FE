import Header from '@components/header/Header'
// import ChatFloatButton from '@src/components/commons/chat/ChatFloatButton';
import { Outlet, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@src/hooks/useMediaQuery'

export default function MainLayout() {
  const isMd = useMediaQuery('(min-width: 768px)')
  const { pathname } = useLocation()

  // /community 관련 페이지인지 확인
  const isCommunityDetailPage = /^\/community\/\d+$/.test(pathname)
  const isCommunityFormPage = /^\/community-post$/.test(pathname) || /^\/community\/\d+\/edit$/.test(pathname)
  const isCommunityListPage = /^\/community$/.test(pathname)
  const isProfileEditPage = /^\/profile-update$/.test(pathname)

  // CommunityDetail: Header 전체 숨김, CommunityPage: SearchBar만 숨김
  const showHeader = !isCommunityDetailPage && !isCommunityFormPage
  const hideSearchBar = !isMd && (isCommunityListPage || isProfileEditPage)
  return (
    <div className="flex min-h-screen flex-col">
      {showHeader && <Header hideSearchBar={hideSearchBar} />}
      {/* <ChatFloatButton /> */}
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  )
}
