import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png'
import { ROUTES } from '@src/constants/routes'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2">
      <div className="w-auto h-16 object-contain">
        <img
          src={CuddleMarketLogo}
          alt="CuddleMarket 로고"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="flex flex-col text-2xl text-white leading-none logo">
        <span>CUDDLE</span>
        <span>MARKET</span>
      </p>
    </Link>
  )
}
