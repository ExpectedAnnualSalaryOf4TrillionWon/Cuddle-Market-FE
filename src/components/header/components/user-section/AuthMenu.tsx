import { Link } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
// import PageLink from '@components/commons/page-link/PageLink'
// const ACCOUNT = 'https://account.ozcoding.site'
// const returnTo = encodeURIComponent(window.location.href)
export default function AuthMenu() {
  return (
    <div className="flex items-center gap-4">
      <Link to={ROUTES.COMMUNITY} className="font-bold text-white md:text-lg">
        커뮤니티
      </Link>
      <Link to={ROUTES.LOGIN} className="font-bold text-white md:text-lg">
        로그인
      </Link>
      <Link to={ROUTES.SIGNUP} className="rounded-lg bg-white px-2 py-1 md:px-4 md:py-2.5">
        회원가입
      </Link>
    </div>
  )
}
