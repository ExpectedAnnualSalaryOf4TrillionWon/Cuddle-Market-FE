import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import Logo from '../Logo'
import { SearchBar } from './components/SearchBar'
import Navigation from './components/Navigation'
import { Link, useSearchParams } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
import { useMediaQuery } from '@src/hooks/useMediaQuery'

interface HeaderProps {
  hideSearchBar?: boolean
}

function Header({ hideSearchBar = false }: HeaderProps) {
  const isMd = useMediaQuery('(min-width: 768px)')
  return (
    <header
      className={cn(
        'bg-primary-200 sticky top-0 flex w-full items-center justify-center',
        hideSearchBar ? 'h-16 md:h-24' : 'h-28 md:h-24',
        `${Z_INDEX.HEADER}`
      )}
    >
      <div className="flex w-full flex-col gap-3 px-4 md:block md:max-w-7xl md:px-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Logo />
            {isMd && (
              <>
                <Link to={ROUTES.HOME} className="text-lg font-extrabold text-white">
                  마켓
                </Link>
                <Link to={ROUTES.COMMUNITY} className="text-lg font-extrabold text-white">
                  커뮤니티
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-6">
            {!hideSearchBar && <SearchBar className="hidden md:block" />}
            <Navigation />
          </div>
        </div>
        {!hideSearchBar && <SearchBar className="md:hidden" inputClass="py-1" />}
      </div>
    </header>
  )
}

export default Header
