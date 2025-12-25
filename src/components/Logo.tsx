import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png'
import { ROUTES } from '@src/constants/routes'
import { Link, useSearchParams } from 'react-router-dom'
import { cn } from '@src/utils/cn'
import { useFilterStore } from '@src/store/filterStore'

interface LogoProps {
  logoClassname?: string
  textClassname?: string
}

export default function Logo({ logoClassname, textClassname }: LogoProps) {
  const [, setSearchParams] = useSearchParams()
  const resetFilters = useFilterStore((state) => state.resetFilters)

  const handleLogoClick = () => {
    setSearchParams({})
    resetFilters()
  }

  return (
    <Link to={ROUTES.HOME} onClick={handleLogoClick} className="flex items-center gap-2">
      <div className={cn('h-11 w-auto object-contain md:h-16', logoClassname)}>
        <img src={CuddleMarketLogo} alt="CuddleMarket 로고" className="h-full w-full object-cover" />
      </div>

      <p className={cn('logo hidden flex-col text-xl leading-none text-white md:flex md:text-2xl', textClassname)}>
        <span>CUDDLE</span>
        <span>MARKET</span>
      </p>
    </Link>
  )
}
