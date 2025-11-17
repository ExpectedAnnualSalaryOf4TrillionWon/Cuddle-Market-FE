import { Link } from 'react-router-dom';
import logoImage from '@assets/images/CuddleMarketLogoImage.png';

interface SimpleHeaderProps {
  title: string;
}

export function SimpleHeader({ title }: SimpleHeaderProps) {
  return (
    <header className="sticky top-0 z-1 bg-primary">
      <div className="w-full max-w-[var(--container-max-width)] mx-auto px-lg py-md flex items-center gap-xl">
        {/* 로고 */}
        <Link to="/">
          <img src={logoImage} alt="커들마켓" className="w-auto h-15 tablet:h-22 object-contain" />
        </Link>

        {/* 페이지 타이틀 */}
        <h2 className="text-heading4 tablet:text-heading3 font-bold">{title}</h2>
      </div>
    </header>
  );
}
