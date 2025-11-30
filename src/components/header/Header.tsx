import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import Logo from '../Logo'
import { SearchBar } from './components/SearchBar'
import Navigation from './components/Navigation'

function Header() {
  return (
    <header className={cn('bg-primary-200 sticky top-0 flex h-24 w-full items-center justify-center', `${Z_INDEX.HEADER}`)}>
      <div className="w-full max-w-7xl px-2.5">
        <div className="gap-lg flex items-center justify-between">
          <Logo />
          <SearchBar />
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export default Header
