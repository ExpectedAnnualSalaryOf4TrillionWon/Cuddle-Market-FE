import { Link } from 'react-router-dom';
import logoImage from '@images/CuddleMarketLogo.png';

type SimpleHeaderProps = {
  title: string;
};

export const SimpleHeader = ({ title }: SimpleHeaderProps) => {
  return (
    <header className="sticky top-0 z-1 bg-primary">
      <div className="w-full max-w-[var(--container-max-width)] mx-auto px-lg py-md flex items-center gap-xl">
        {/* 로고 */}
        <Link to="/">
          <img src={logoImage} alt="커들마켓" className="w-auto h-22 object-contain" />
        </Link>

        {/* 페이지 타이틀 */}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </header>
  );
};
