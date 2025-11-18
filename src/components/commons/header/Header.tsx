import { Z_INDEX } from '@constants/ui'
import { cn } from '@utils/cn'
import Logo from './components/Logo'
import { SearchBar } from './components/SearchBar'
import Navigation from './components/Navigation'

function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 flex h-24 w-full items-center justify-center bg-primary-200',
        `${Z_INDEX.HEADER}`
      )}
    >
      <div className="max-w-7xl w-full px-2.5">
        <div className="flex items-center justify-between gap-lg">
          <Logo />
          <SearchBar />
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export default Header
