import Header from '@components/header/Header'
// import ChatFloatButton from '@src/components/commons/chat/ChatFloatButton';
import { Outlet, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import { ROUTES } from '@src/constants/routes'

// Header 숨김 패턴 (정규표현식 필요)
const HIDE_HEADER_PATTERNS = [/^\/community\/\d+$/, /^\/community\/\d+\/edit$/, new RegExp(`^${ROUTES.COMMUNITY_POST}$`)]

// SearchBar 숨김 경로 (정적 경로)
const HIDE_SEARCHBAR_PATHS: string[] = [ROUTES.COMMUNITY, ROUTES.PROFILE_UPDATE, ROUTES.PRODUCT_POST, ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.FIND_PASSWORD, ROUTES.MYPAGE]

// SearchBar 숨김 패턴 (동적 경로)
const HIDE_SEARCHBAR_PATTERNS = [/^\/products\/\d+\/edit$/, /^\/user-profile\/\d+$/]

export default function MainLayout() {
  const isMd = useMediaQuery('(min-width: 768px)')
  const { pathname } = useLocation()

  const showHeader = !HIDE_HEADER_PATTERNS.some((pattern) => pattern.test(pathname))
  const hideSearchBar = !isMd && (HIDE_SEARCHBAR_PATHS.includes(pathname) || HIDE_SEARCHBAR_PATTERNS.some((pattern) => pattern.test(pathname)))
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
