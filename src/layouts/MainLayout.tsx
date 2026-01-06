import Header from '@components/header/Header'
// import ChatFloatButton from '@src/components/commons/chat/ChatFloatButton';
import { Outlet, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import { ROUTES } from '@src/constants/routes'
import { cn } from '@src/utils/cn'

// Header 숨김 패턴 (정규표현식 필요)
const HIDE_HEADER_PATTERNS = [/^\/community\/\d+\/edit$/, new RegExp(`^${ROUTES.COMMUNITY_POST}$`)]

// Header 숨김 패턴 (모바일에서만 숨김)
const HIDE_HEADER_MOBILE_PATTERNS = [/^\/community\/\d+$/]

// SearchBar 숨김 경로 (정적 경로)
const HIDE_SEARCHBAR_PATHS: string[] = [
  ROUTES.COMMUNITY,
  ROUTES.PROFILE_UPDATE,
  ROUTES.PRODUCT_POST,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FIND_PASSWORD,
  ROUTES.MYPAGE,
]

// 메뉴 버튼 숨김 경로
const HIDE_MENU_BUTTON_PATHS: string[] = [ROUTES.LOGIN, ROUTES.SIGNUP]

// SearchBar 숨김 패턴 (동적 경로)
const HIDE_SEARCHBAR_PATTERNS = [/^\/products\/\d+\/edit$/, /^\/user-profile\/\d+$/]

export default function MainLayout() {
  const isMd = useMediaQuery('(min-width: 768px)')
  const { pathname } = useLocation()

  const hideHeaderAlways = HIDE_HEADER_PATTERNS.some((pattern) => pattern.test(pathname))
  const hideHeaderMobile = !isMd && HIDE_HEADER_MOBILE_PATTERNS.some((pattern) => pattern.test(pathname))
  const showHeader = !hideHeaderAlways && !hideHeaderMobile
  const hideSearchBar = !isMd && (HIDE_SEARCHBAR_PATHS.includes(pathname) || HIDE_SEARCHBAR_PATTERNS.some((pattern) => pattern.test(pathname)))
  const hideMenuButton = HIDE_MENU_BUTTON_PATHS.includes(pathname)
  return (
    <div className="flex min-h-screen flex-col">
      {showHeader && <Header hideSearchBar={hideSearchBar} hideMenuButton={hideMenuButton} />}
      {/* <ChatFloatButton /> */}
      <main className={cn('w-full flex-1', showHeader ? 'pt-16 md:pt-24' : 'pt-0')}>
        <Outlet />
      </main>
    </div>
  )
}
