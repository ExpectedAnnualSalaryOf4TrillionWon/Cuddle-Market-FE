import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import Logo from '../Logo'
import { SearchBar } from './components/SearchBar'
import Navigation from './components/Navigation'

function Header() {
  return (
    <header className={cn('bg-primary-200 sticky top-0 flex h-32 w-full items-center justify-center md:h-24', `${Z_INDEX.HEADER}`)}>
      <div className="flex w-full flex-col gap-3 px-4 md:block md:px-2.5">
        <div className="gap-lg flex items-center justify-between">
          <Logo />
          <SearchBar className="hidden md:block" />
          <Navigation />
        </div>
        <SearchBar className="md:hidden" />
      </div>
    </header>
  )
}

export default Header
