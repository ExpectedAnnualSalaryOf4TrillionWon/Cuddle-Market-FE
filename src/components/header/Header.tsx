import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import Logo from '../Logo'
import { SearchBar } from './components/SearchBar'
import UserControls from './components/UserControls'
import MobileNavigation from './components/MobileNavigation'
import { Link } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import { useEffect, useRef, useState } from 'react'
import { IconButton } from '@src/components/commons/button/IconButton'
import { Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface HeaderProps {
  hideSearchBar?: boolean
  hideMenuButton?: boolean
}

function Header({ hideSearchBar = false, hideMenuButton = false }: HeaderProps) {
  const isMd = useMediaQuery('(min-width: 768px)')
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const [searchBarHeight, setSearchBarHeight] = useState(0)

  useEffect(() => {
    if (searchBarRef.current) {
      setSearchBarHeight(searchBarRef.current.scrollHeight)
    }
  }, [])

  return (
    <>
      <header
        className={cn(
          'bg-primary-200 sticky top-0 flex w-full items-center justify-center py-3',
          hideSearchBar ? 'h-16 md:h-24' : 'h-auto pb-0 md:h-24',
          `${Z_INDEX.HEADER}`
        )}
      >
        <div className="flex w-full flex-col px-4 md:block md:max-w-7xl md:gap-3 md:px-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <Logo />
              {isMd && (
                <>
                  <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) => cn('text-lg', isActive ? 'border-b-2 border-white font-extrabold text-white' : 'text-gray-700')}
                  >
                    마켓
                  </NavLink>
                  <NavLink
                    to={ROUTES.COMMUNITY}
                    className={({ isActive }) => cn('text-lg', isActive ? 'border-b-2 border-white font-extrabold text-white' : 'text-gray-700')}
                  >
                    커뮤니티
                  </NavLink>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 md:gap-8">
              {!hideSearchBar && <SearchBar className="hidden md:block" />}
              {/* 모바일 검색 아이콘 */}
              {!hideSearchBar && !isMd && (
                <IconButton aria-label="검색" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <Search className="text-white" />
                </IconButton>
              )}
              <UserControls setIsSideOpen={setIsSideOpen} isSideOpen={isSideOpen} hideMenuButton={hideMenuButton} />
            </div>
          </div>
          {/* 모바일 검색바 - 아코디언 */}
          {!hideSearchBar && (
            <div
              ref={searchBarRef}
              className="mt-3 overflow-hidden transition-[height] duration-300 md:hidden"
              style={{
                height: isSearchOpen ? `${searchBarHeight}px` : '0',
                marginBottom: isSearchOpen ? '12px' : '0',
              }}
            >
              <SearchBar className="h-8 md:hidden" inputClass="py-1 text-sm" />
            </div>
          )}
        </div>
      </header>
      <MobileNavigation isOpen={isSideOpen} onClose={() => setIsSideOpen(false)} />
    </>
  )
}

export default Header
