import logoImage from '@images/CuddleMarketLogoImage.png';
import { CiCalendar, CiLock, CiMail, CiUser } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { PiTagThin } from 'react-icons/pi';
//max-w-[375px]  : 해당 값보다 요소가 더 커지지 않게

const Signup = () => {
  return (
    <div className="px-lg py-8 bg-primary">
      <div className="">
        {/* 헤더 영역 */}
        <div className="text-center flex flex-col items-center gap-6 pb-2xl">
          <div className="flex h-20 w-20 items-center justify-center rounded-full">
            <img src={logoImage} alt="" className="object-cover h-full" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="heading3 text-text-primary">커들마켓에 오신 것을 환영합니다!</h2>
            <p className="bodyLarge text-text-secondary">
              안전한 반려동물 용품 거래를 시작해보세요
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full">
          {/* 카드 */}
          <div className="flex flex-col gap-6 rounded-xl bg-light/90 shadow-2xl py-[2rem] px-[1.5rem] w-[700px]">
            {/* 카드 헤더: grid → flex + gap */}
            <div className="flex flex-col items-center gap-1.5">
              <h4 className="heading4 text-center text-text-primary">회원가입</h4>
              <p className="bodyLarge text-center text-text-secondary">
                계정에 로그인하여 더 많은 기능을 이용해보세요
              </p>
            </div>

            {/* 카드 콘텐츠: 내부 섹션 간격을 gap으로 관리 */}
            <div className="flex flex-col gap-8 pb-8 ">
              {/* 폼 */}
              <form className="flex flex-col gap-5">
                {/* 이메일 */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="signup-email" className="bodySmall font-medium text-text-primary">
                    이메일 주소 *
                  </label>
                  <div className="relative">
                    <CiMail className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      maxLength={100}
                      required
                      className="flex h-12 w-full min-w-0 rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  <p id="signup-email-error" className="text-sm font-medium text-[#f87171]">
                    이메일 형식에 맞게 입력해주세요.
                  </p>
                </div>

                {/* 이름 */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="signup-name" className="bodySmall font-medium text-text-primary">
                    이름 *
                  </label>
                  <div className="relative">
                    <CiUser className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-name"
                      placeholder="실제 이름을 입력해주세요"
                      required
                      maxLength={15}
                      className="flex h-12 w-full rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  <p className="text-sm font-medium text-[#000]">
                    이름은 2글자 이상 15자 이하입니다.
                  </p>
                  {/* 이름 입력필드가 비어있을 경우의 안내문구 */}
                  <p id="signup-name-error" className="text-sm font-medium text-[#f87171]">
                    이름을 입력해주세요.
                  </p>
                </div>

                {/* 닉네임 */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="signup-nickname"
                    className="bodySmall font-medium text-text-primary"
                  >
                    닉네임 *
                  </label>
                  <div className="relative">
                    <PiTagThin className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-nickname"
                      placeholder="사용할 닉네임을 입력해주세요"
                      required
                      maxLength={12}
                      className="flex h-12 w-full min-w-0 rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  <p className="text-sm font-medium text-[#000]">
                    닉네임은 2글자 이상 12자 이하입니다.
                  </p>
                  {/* 닉네임 입력필드가 비어있을 경우의 안내문구 */}
                  <p id="signup-name-error" className="text-sm font-medium text-[#f87171]">
                    닉네임을 입력해주세요.
                  </p>
                </div>

                {/* 비밀번호 */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="signup-password"
                    className="bodySmall font-medium text-text-primary"
                  >
                    비밀번호 *
                  </label>
                  <div className="relative">
                    <CiLock className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-password"
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      required
                      className="flex h-12 w-full min-w-0 rounded-xl border border-border bg-light px-3 py-1 pl-12 pr-12 transition-[color,box-shadow]"
                    />
                  </div>
                  {/* 비밀번호 유효성 검증 실패했을 비어있을 경우의 안내문구 */}
                  <p id="signup-password-error" className="text-sm font-medium text-[#f87171]">
                    영문과 숫자 조합 8자 이상으로 설정해주세요.
                  </p>
                </div>

                {/* 비밀번호 확인 */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="signup-confirm-password"
                    className="bodySmall font-medium text-text-primary"
                  >
                    비밀번호 확인 *
                  </label>
                  <div className="relative">
                    <CiLock className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="비밀번호를 다시 입력해주세요"
                      required
                      className="flex h-12 w-full min-w-0 rounded-xl border border-border bg-light px-3 py-1 pl-12 pr-12 transition-[color,box-shadow]"
                    />
                  </div>
                  {/* 비밀번호가 일치하지 않을 경우의 안내문구 */}
                  <p
                    id="signup-confirm-password-error"
                    className="text-sm font-medium text-[#f87171]"
                  >
                    비밀번호가 일치하지 않습니다.
                  </p>
                </div>

                {/* 생년월일 */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="signup-birth-date"
                    className="bodySmall font-medium text-text-primary"
                  >
                    생년월일 *
                  </label>
                  <div className="relative">
                    <CiCalendar className="absolute left-4 top-1/2 translate-y-[-50%]" size={18} />
                    <input
                      id="signup-birth-date"
                      type="date"
                      required
                      className="flex h-12 w-full rounded-xl border border-border bg-light px-3 py-1 pl-12 transition-[color,box-shadow]"
                    />
                  </div>
                  {/* 생년월일 입력필드가 비어있을 경우의 안내문구 */}
                  <p id="signup-birth-date-error" className="text-sm font-medium text-[#f87171]">
                    생년월일을 선택해주세요.
                  </p>
                </div>

                {/* 거주지 */}
                <div className="flex flex-col gap-4">
                  <label className="bodySmall font-medium text-text-primary">거주지 *</label>

                  <div className="flex flex-col gap-3">
                    {/* 시/도 */}
                    <div className="relative">
                      <IoLocationOutline
                        className="absolute left-4 top-1/2 translate-y-[-50%]"
                        size={18}
                      />
                      <select
                        required
                        className="flex h-12 w-full appearance-none rounded-xl border border-border bg-light px-3 py-2 pl-12 pr-10 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          시/도를 선택해주세요
                        </option>
                        <option value="서울특별시">서울특별시</option>
                        <option value="부산광역시">부산광역시</option>
                        <option value="대구광역시">대구광역시</option>
                        <option value="인천광역시">인천광역시</option>
                        <option value="광주광역시">광주광역시</option>
                        <option value="대전광역시">대전광역시</option>
                        <option value="울산광역시">울산광역시</option>
                        <option value="세종특별자치시">세종특별자치시</option>
                      </select>
                      <IoIosArrowDown className="absolute right-3 top-1/2 translate-y-[-50%]" />
                    </div>
                    {/* 시/도 입력필드가 비어있을 경우의 안내문구 */}
                    <p id="signup-city-error" className="text-sm font-medium text-[#f87171]">
                      시/도를 선택해주세요.
                    </p>

                    {/* 시/군/구 (disabled) */}
                    <div className="relative">
                      <IoLocationOutline
                        className="absolute left-4 top-1/2 translate-y-[-50%]"
                        size={18}
                      />
                      <select
                        disabled
                        className="flex h-12 w-full appearance-none rounded-xl border border-border bg-light px-3 py-2 pl-12 pr-10 text-sm opacity-60"
                        defaultValue=""
                      >
                        <option value="">먼저 시/도를 선택해주세요</option>
                      </select>
                      <IoIosArrowDown className="absolute right-3 top-1/2 translate-y-[-50%]" />
                    </div>
                    {/* 군/구 입력필드가 비어있을 경우의 안내문구 */}
                    <p id="signup-district-error" className="text-sm font-medium text-[#f87171]">
                      군/구를 선택해주세요.
                    </p>
                  </div>
                </div>

                {/* 제출 */}
                <button
                  type="submit"
                  disabled
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-dark px-4 py-2 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  회원가입
                </button>
              </form>

              {/* 소셜 로그인 */}
              {/* <div className="flex flex-col gap-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-px w-full bg-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bodySmall text-text-secondary">소셜 계정으로 가입</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm transition-all hover:bg-light">
                    <img src={googleLogo} alt="구글로 로그인" />
                    <span className="bodyLarge">Google</span>
                  </button>

                  <button className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm transition-all hover:bg-light">
                    <IoLogoGithub size={24} />
                    <span className="bodyLarge">GitHub</span>
                  </button>
                </div>
              </div> */}

              {/* 로그인 링크 */}
              <div className="flex justify-center gap-xl">
                <p className="bodyLarge text-text-secondary">이미 계정이 있으신가요?</p>
                <button className="inline-flex rounded-md p-0 text-base font-semibold text-text-primary">
                  로그인하기
                </button>
              </div>
            </div>
          </div>
          {/* card 끝 */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
