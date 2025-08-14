import { useNavigate } from 'react-router-dom';
import logo from '@images/CuddleMarketLogoBase.png';
import kakao from '@images/kakao.svg';

const Login = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    alert(
      '카카오톡 로그인 기능을 연동해주세요!\n\n실제 서비스에서는 카카오 개발자 센터에서\nJavaScript SDK를 설정하시면 됩니다.',
    );
    setTimeout(() => {
      alert('로그인이 완료되었습니다! 🎉\n커들마켓에 오신 것을 환영합니다!');
      navigate('/');
    }, 1000);
  };

  const handleEmailLogin = () => {
    alert('이메일 로그인 페이지로 이동합니다.');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center bg-point h-[90vh]">
      <div className="bg-secondary flex flex-col justify-center items-center gap-md rounded-xl p-2xl shadow-xl w-[40vw] max-w-[500px] min-w-[250px] h-[60vh] min-h-[350px]">
        <div className="w-[30vw] max-w-[300px] h-auto flex items-center justify-center ">
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
        <button
          onClick={handleEmailLogin}
          className="w-full bg-point text-text-primary py-2 px-2  rounded-xl text-bodySmall tablet:text-bodyLarge font-semibold"
        >
          <span>이메일로 시작하기</span>
        </button>

        <button onClick={handleSignupClick} className="text-text-secondary text-sm">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
