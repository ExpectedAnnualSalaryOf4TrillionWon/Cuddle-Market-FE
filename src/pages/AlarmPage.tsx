import logoImage from '@images/CuddleMarketLogo.png';
import userDefaultImage from '@images/userDefault.svg';

interface AlarmPageProps {
  image: string;
  message: string;
}

function AlarmDetailDIV({ image, message }: AlarmPageProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex flex-col gap-lg">
        <div className="flex items-center space-x-5  py-xs">
          <div>
            <img
              src={image}
              className="w-auto h-15
            "
            />
          </div>
          <div className="flex items-center"> {message} </div>
        </div>
      </div>
  );
}

function AlarmPage() {
  return (
    <>
      {/* 채팅 페이지 코드 참조 */}
      {/* 헤더 영역 */}
      <header className="flex items-center justify-between gap-lg sticky top-0 z-1 bg-primary">
        <div className="w-full max-w-[var(--container-max-width)] mx-auto px-lg py-md flex items-center gap-lg">
          {/* 로고 */}
          <div>
            <img src={logoImage} alt="커들마켓" className="w-auto h-16 object-contain" />
          </div>
          {/* 페이지 타이틀 */}
          <h2 className="text-xl font-bold">알람</h2>
        </div>
      </header>
      {/* 알람 목록 */}
      <div className="max-w-[var(--container-max-width)] h-[calc(100vh-80px)] flex flex-col px-lg py-xl">
        <div className="shadow-xs shadow-dark bg-bg">
          <h2 className="heading3 p-4 border-b border-gray-200">알림 목록</h2>
        </div>
        <div className="flex-1 flex flex-col">
          <AlarmDetailDIV image={userDefaultImage} message="1번째 알림" />
          <AlarmDetailDIV image={userDefaultImage} message="2번째 알림" />
          <AlarmDetailDIV image={userDefaultImage} message="3번째 알림" />
          <AlarmDetailDIV image={userDefaultImage} message="4번째 알림" />
        </div>
      </div>
    </>
  );
}

export default AlarmPage;
