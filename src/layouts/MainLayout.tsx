import Header from '@components/header/Header'
// import ChatFloatButton from '@src/components/commons/chat/ChatFloatButton';
import { Outlet, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import { ROUTES } from '@src/constants/routes'
import { cn } from '@src/utils/cn'

// Header 숨김 패턴 (모바일에서만 숨김)
const HIDE_HEADER_MOBILE_PATTERNS = [/^\/community\/\d+$/, /^\/community\/\d+\/edit$/, new RegExp(`^${ROUTES.COMMUNITY_POST}$`)]

// SearchBar 숨김 경로 - 모바일만 (정적 경로)
const HIDE_SEARCHBAR_MOBILE_PATHS: string[] = [ROUTES.MYPAGE]

// SearchBar 숨김 경로 - 항상 (정적 경로)
const HIDE_SEARCHBAR_ALWAYS_PATHS: string[] = [
  ROUTES.COMMUNITY,
  ROUTES.COMMUNITY_POST,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FIND_PASSWORD,
  ROUTES.PROFILE_UPDATE,
  ROUTES.PRODUCT_POST,
  ROUTES.CHAT,
]

// 메뉴 버튼 숨김 경로
const HIDE_MENU_BUTTON_PATHS: string[] = [ROUTES.LOGIN, ROUTES.SIGNUP]

// SearchBar 숨김 패턴 - 모바일만 (동적 경로)
const HIDE_SEARCHBAR_MOBILE_PATTERNS = [/^\/user-profile\/\d+$/]

// SearchBar 숨김 패턴 - 항상 (동적 경로)
const HIDE_SEARCHBAR_ALWAYS_PATTERNS = [/^\/community\/\d+$/, /^\/community\/\d+\/edit$/, /^\/products\/\d+\/edit$/, /^\/chat\/\d+$/]

export default function MainLayout() {
  const isMd = useMediaQuery('(min-width: 768px)')
  const { pathname } = useLocation()

  const hideHeaderMobile = !isMd && HIDE_HEADER_MOBILE_PATTERNS.some((pattern) => pattern.test(pathname))
  const showHeader = !hideHeaderMobile
  const hideSearchBarMobile =
    !isMd && (HIDE_SEARCHBAR_MOBILE_PATHS.includes(pathname) || HIDE_SEARCHBAR_MOBILE_PATTERNS.some((pattern) => pattern.test(pathname)))
  const hideSearchBarAlways =
    HIDE_SEARCHBAR_ALWAYS_PATHS.includes(pathname) || HIDE_SEARCHBAR_ALWAYS_PATTERNS.some((pattern) => pattern.test(pathname))
  const hideSearchBar = hideSearchBarMobile || hideSearchBarAlways
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
