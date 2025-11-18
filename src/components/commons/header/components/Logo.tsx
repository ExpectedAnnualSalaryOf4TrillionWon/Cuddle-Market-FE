// import StudyLogo from '@assets/images/logo_studyhub.svg?react'
import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png';
// import { Menu as MenuIcon } from 'lucide-react'
// import { useMediaQuery } from '@src/hooks/useMediaQuery'
// import Button from '@components/commons/button/Button'
import { ROUTES } from '@src/constants/routes';
import { Link } from 'react-router-dom';


interface LogoProps {
  toggleGnb: () => void
  sidebarButtonRef: React.RefObject<HTMLDivElement | null>
}
export default function Logo({ toggleGnb, sidebarButtonRef }: LogoProps) {
  // const isDesktop = useMediaQuery('(min-width: 840px)')
  console.log(toggleGnb);
  console.log(sidebarButtonRef);
  

  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2">
      <div className="w-auto h-16 object-contain">
        <img
          src={CuddleMarketLogo}
          alt="CuddleMarket 로고"
        className="w-full h-full object-cover"
        />
      </div>
      <p className="flex flex-col text-2xl text-white logo leading-none">
        <span>CUDDLE</span>
        <span>MARKET</span>
      </p>
    </Link>
  )
}
