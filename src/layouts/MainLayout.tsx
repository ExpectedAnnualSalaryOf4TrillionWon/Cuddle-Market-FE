import Header from '@components/header/Header'
// import ChatFloatButton from '@src/components/commons/chat/ChatFloatButton';
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* <ChatFloatButton /> */}
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  )
}
