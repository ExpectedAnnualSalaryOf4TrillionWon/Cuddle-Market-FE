import { Link } from 'react-router-dom'
import { ROUTES } from '@src/constants/routes'
// import PageLink from '@components/commons/page-link/PageLink'
// const ACCOUNT = 'https://account.ozcoding.site'
// const returnTo = encodeURIComponent(window.location.href)
export default function AuthMenu() {
  return (
    <>
      <Link
        to={ROUTES.LOGIN}
        // variant="text"
        // fontWeight="normal"
        // link={`${ACCOUNT}/auth/login?return_to=${returnTo}`}
        // size="lg"
      >
        로그인
      </Link>
      <Link
        to={ROUTES.SIGNUP}
        // variant="filled"
        // size="base"
        // fontWeight="medium"
        // link="/signup"
        className="rounded-lg bg-white px-4 py-2.5"
      >
        회원가입
      </Link>
    </>
  )
}
