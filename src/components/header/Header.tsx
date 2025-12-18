import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import Logo from '../Logo'
import { SearchBar } from './components/SearchBar'
import Navigation from './components/Navigation'

interface HeaderProps {
  hideSearchBar?: boolean
}

function Header({ hideSearchBar = false }: HeaderProps) {
  return (
    <header
      className={cn(
        'bg-primary-200 sticky top-0 flex w-full items-center justify-center',
        hideSearchBar ? 'h-16 md:h-24' : 'h-28 md:h-24',
        `${Z_INDEX.HEADER}`
      )}
    >
      <div className="flex w-full flex-col gap-3 px-4 md:block md:px-2.5">
        <div className="gap-lg flex items-center justify-between">
          <Logo />
          {!hideSearchBar && <SearchBar className="hidden md:block" />}
          <Navigation />
        </div>
        {!hideSearchBar && <SearchBar className="md:hidden" inputClass="py-1" />}
      </div>
    </header>
  )
}

export default Header
