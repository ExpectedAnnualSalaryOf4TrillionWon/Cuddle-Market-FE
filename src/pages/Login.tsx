import logo from '@images/CuddleMarketLogoBase.png';
import kakao from '@images/kakao.svg';

//  React.FC : "Login은 React 함수형 컴포넌트야!" 라고 타입스크립트에게 알려주는 것
const Login: React.FC = () => {
  const KAKAO_CLIENT_ID: string = import.meta.env.VITE_KAKAO_CLIENT_ID || '';
  const REDIRECT_URI: string =
    import.meta.env.VITE_KAKAO_REDIRECT_URI || `${window.location.origin}/oauth/kakao/callback`;

  // 카카오 로그인 시작
  const handleKakaoLogin = (): void => {
    console.log('카카오 로그인 시작');

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&response_type=code&scope=profile_nickname,profile_image`;

    console.log(kakaoAuthUrl);

    // 카카오 로그인 페이지로 이동
    window.location.href = kakaoAuthUrl.toString();
  };

  // const handleEmailLogin = () => {
  //   alert('이메일 로그인 페이지로 이동합니다.');
  // };

  // const handleSignupClick = () => {
  //   navigate('/signup');
  // };

  return (
    <div className="flex items-center justify-center bg-primary h-[90vh]">
      <div className="bg-light/90 flex flex-col justify-center items-center gap-md rounded-xl p-2xl shadow-xl w-[40vw] max-w-[500px] min-w-[250px] h-[400px] min-h-[350px]">
        <div className="w-[20vw] max-w-[300px] h-auto flex items-center justify-center ">
          <img src={logo} alt="Cuddle Market 로고" className="w-full h-full mb-xl object-contain" />
        </div>

        <button
          type="submit"
          onClick={handleKakaoLogin}
          className="flex w-full items-center justify-center gap-sm rounded-xl bg-[#fee500] px-2 py-2 text-bodySmall tablet:text-bodyLarge font-semibold shadow-lg cursor-pointer"
        >
          <img src={kakao} className="w-md" />
          <span>카카오톡으로 시작하기</span>
        </button>
        {/*이 아래의 버튼들은 일반 로그인 구현 가능성을 염두에 둔 UI로 소셜로그인만 구현시 최종 배포전에 삭제할 예정*/}
        {/* <button
          onClick={handleEmailLogin}
          className="w-full bg-point text-text-primary py-2 px-2  rounded-xl text-bodySmall tablet:text-bodyLarge font-semibold"
        >
          <span>이메일로 시작하기</span>
        </button> */}
        {/* 
        <button onClick={handleSignupClick} className="text-text-secondary text-sm">
          회원가입
        </button> */}
      </div>
    </div>
  );
};

export default Login;
