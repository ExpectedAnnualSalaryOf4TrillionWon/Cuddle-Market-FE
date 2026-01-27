import { useEffect } from 'react'
import AppRoutes from './routes/index'
import LoginModal from './components/modal/LoginModal'
import ToastContainer from './components/commons/ToastContainer'
import { useUserStore } from './store/userStore'

function App() {
  const validateAuthState = useUserStore((state) => state.validateAuthState)

  // 앱 시작 시 인증 상태 검증 (토큰-유저 상태 동기화)
  useEffect(() => {
    validateAuthState()
  }, [validateAuthState])

  return (
    <>
      <AppRoutes />
      <LoginModal />
      <ToastContainer />
    </>
  )
}

export default App
