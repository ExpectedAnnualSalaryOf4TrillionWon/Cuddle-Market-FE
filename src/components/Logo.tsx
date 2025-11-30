import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png'
import { ROUTES } from '@src/constants/routes'
import { Link } from 'react-router-dom'
import { cn } from '@src/utils/cn'

interface LogoProps {
  logoClassname?: string
  textClassname?: string
}

export default function Logo({ logoClassname, textClassname }: LogoProps) {
  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2">
      <div className={cn('h-16 w-auto object-contain', logoClassname)}>
        <img src={CuddleMarketLogo} alt="CuddleMarket 로고" className="h-full w-full object-cover" />
      </div>
      <p className={cn('logo flex flex-col text-2xl leading-none text-white', textClassname)}>
        <span>CUDDLE</span>
        <span>MARKET</span>
      </p>
    </Link>
  )
}
