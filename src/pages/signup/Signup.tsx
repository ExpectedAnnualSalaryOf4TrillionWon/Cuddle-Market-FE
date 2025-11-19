import { LOCATIONS, type CityCode, type StateCode } from '@constants/constants'
import logoImage from '@assets/images/CuddleMarketLogoImage.png'
import { useUserStore } from '@store/userStore'
import { useEffect, useRef, useState } from 'react'
import { CiCalendar, CiLocationOn, CiUser } from 'react-icons/ci'
import { PiTagThin } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import type { CreateUserRequest, CreateUserResponse, FormErrors } from 'src/types'
import { apiFetch } from '../../api/apiFetch'
import { TitleSection } from '../login/components/TitleSection'
import { ROUTES } from '@src/constants/routes'
import { SignUpForm } from './components/SignUpForm'

function Signup() {
  const [userName, setUserName] = useState<string>('')
  const [userNickName, setUserNickName] = useState<string>('')
  const [userBirth, setUserBirth] = useState<string>('')

  /**거주지 */
  const [selectedState, setSelectedState] = useState<StateCode | string>('')
  const [selectedCity, setSelectedCity] = useState<CityCode | string>('')
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)

  const cityOptions = selectedState ? LOCATIONS.find((location) => location.code === selectedState)?.cities || [] : []

  /** 거주지 선택창 */
  const stateBoxRef = useRef<HTMLDivElement | null>(null)
  const cityBoxRef = useRef<HTMLDivElement | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const navigate = useNavigate()
  const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL

  const { accessToken, updateUserProfile, redirectUrl, setRedirectUrl } = useUserStore()

  // 이름
  const handleUserName = (val: string) => {
    setUserName(val === '' ? '' : val)
    if (userName && val) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.userName
        return newErrors
      })
    }
  }

  const handleUserNickName = (val: string) => {
    setUserNickName(val === '' ? '' : val)
    if (userNickName && val) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.userNickName
        return newErrors
      })
    }
  }

  const handleUserBirth = (val: string) => {
    setUserBirth(val === '' ? '' : val)
    if (userNickName && val) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.userBirth
        return newErrors
      })
    }
  }

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode)
    setSelectedCity('')
    setShowStateDropdown(false)
  }

  const handleCitySelect = (cityCode: string) => {
    setSelectedCity(cityCode)
    setShowCityDropdown(false)
    if (selectedState && cityCode) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.location
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('회원가입 버튼 클릭')

    if (isSubmitting) return // 중복 제출 방지

    const newErrors: FormErrors = {}
    // 유효성 검사

    if (!userName) {
      newErrors.userName = '이름을 입력해주세요.'
    }

    if (!userNickName) {
      newErrors.userNickName = '닉네임을 입력해주세요.'
    }

    if (!userBirth) {
      newErrors.userBirth = '생년월일을 선택해주세요.'
    }

    if (!selectedState || !selectedCity) {
      newErrors.location = '거래 희망 지역을 선택해주세요.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // 첫 번째 에러가 있는 위치로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    try {
      const requestBody: CreateUserRequest = {
        nickname: userNickName,
        name: userName,
        birthday: userBirth,
        state_name: selectedState!,
        city_name: selectedCity,
      }

      if (!accessToken) {
        alert('로그인이 필요합니다.')
        navigate('/signin')
        return
      }

      const response = await apiFetch(`${API_BASE_URL}/users/profile-complete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        const data: CreateUserResponse = await response.json()
        console.log('📍 응답 데이터:', data)

        updateUserProfile({
          nickname: data.nickname,
          name: data.name,
          birthday: data.birthday,
          state_name: data.state_name,
          city_name: data.city_name,
          profile_completed: true,
        })

        if (redirectUrl) {
          const targetUrl = redirectUrl
          setRedirectUrl(null) // 사용 후 초기화
          console.log('저장된 페이지로 이동:', targetUrl)
          navigate(targetUrl, { replace: true })
        } else {
          console.log('홈으로 이동')
          navigate('/', { replace: true })
        }
      } else {
        const errorResponse = await response.json()
        const serverErrors: FormErrors = {}

        if (errorResponse.birthday && errorResponse.birthday.length > 0) {
          serverErrors.userBirth = errorResponse.birthday[0]
        }
        // 닉네임 에러 처리
        if (errorResponse.nickname && errorResponse.nickname.length > 0) {
          serverErrors.userNickName = errorResponse.nickname[0]
        }

        if (Object.keys(serverErrors).length > 0) {
          setErrors(serverErrors)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          throw new Error('회원가입 실패')
        }
      }
    } catch (error) {
      console.error('회원가입 실패:', error)
      setErrors({
        general: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node

      // 시/도 드롭다운 바깥 클릭
      if (showStateDropdown && stateBoxRef.current && !stateBoxRef.current.contains(target)) {
        setShowStateDropdown(false)
      }
      // 구/군 드롭다운 바깥 클릭
      if (showCityDropdown && cityBoxRef.current && !cityBoxRef.current.contains(target)) {
        setShowCityDropdown(false)
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showStateDropdown) setShowStateDropdown(false)
        if (showCityDropdown) setShowCityDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [showStateDropdown, showCityDropdown])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#F3F4F6]">
      <div className="flex min-w-[400px] flex-col items-center gap-10 rounded-[20px] bg-white px-5 py-10">
        <TitleSection title="회원가입" desc="이미 계정이 있으신가요?" link="회원가입하기" linkPath={ROUTES.LOGIN} />
        <SignUpForm />
        {/* <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="signup-name" className="bodySmall text-text-primary font-medium">
              이름 *
            </label>
            <div className="relative">
              <CiUser className="absolute top-1/2 left-4 translate-y-[-50%]" size={18} />
              <input
                id="signup-name"
                placeholder="실제 이름을 입력해주세요"
                maxLength={15}
                value={userName}
                onChange={(e) => {
                  const val = e.target.value
                  handleUserName(val)
                }}
                className="border-border bg-light flex h-12 w-full rounded-xl border px-3 py-1 pl-12 transition-[color,box-shadow]"
              />
            </div>

            {errors.userName && <p className="text-xs text-red-600">{errors.userName}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="signup-nickname" className="bodySmall text-text-primary font-medium">
              닉네임 *
            </label>
            <div className="relative">
              <PiTagThin className="absolute top-1/2 left-4 translate-y-[-50%]" size={18} />
              <input
                id="signup-nickname"
                placeholder="사용할 닉네임을 입력해주세요"
                maxLength={12}
                value={userNickName}
                onChange={(e) => {
                  const val = e.target.value
                  handleUserNickName(val)
                }}
                className="border-border bg-light flex h-12 w-full min-w-0 rounded-xl border px-3 py-1 pl-12 transition-[color,box-shadow]"
              />
            </div>

            {errors.userNickName && <p className="text-xs text-red-600">{errors.userNickName}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="signup-birth-date" className="bodySmall text-text-primary font-medium">
              생년월일 *
            </label>
            <div className="relative">
              <CiCalendar className="absolute top-1/2 left-4 translate-y-[-50%]" size={18} />
              <input
                id="signup-birth-date"
                type="date"
                value={userBirth}
                onChange={(e) => {
                  const val = e.target.value
                  handleUserBirth(val)
                }}
                className="border-border bg-light flex h-12 w-full rounded-xl border px-3 py-1 pl-12 transition-[color,box-shadow]"
              />
            </div>

            {errors.userBirth && <p className="text-xs text-red-600">{errors.userBirth}</p>}
          </div>

          <div className="flex flex-col gap-4">
            <label className="bodySmall text-text-primary font-medium">거주지 *</label>

            <div className="flex flex-col gap-3">
              <div className="relative" ref={stateBoxRef}>
                <CiLocationOn className="absolute top-1/2 left-4 translate-y-[-50%]" size={18} />
                <button
                  type="button"
                  role="combobox"
                  aria-expanded={showStateDropdown}
                  onClick={() => {
                    setShowStateDropdown((prev) => !prev)
                    setShowCityDropdown(false)
                  }}
                  className={`bg-light border-border flex w-full rounded-md border py-2 pl-10 text-sm`}
                >
                  <span className="text-gray-500">
                    {selectedState ? LOCATIONS.find((location) => location.code === selectedState)?.name : '시/도를 선택해주세요'}
                  </span>
                </button>
                {showStateDropdown && (
                  <div
                    role="listbox"
                    aria-label="시/도 선택"
                    className="border-border mt-sm absolute top-full left-0 z-40 w-full rounded-md border bg-white p-1 shadow-md"
                  >
                    {LOCATIONS.map((location) => (
                      <button
                        key={location.code}
                        role="option"
                        type="button"
                        aria-selected={selectedState === location.code}
                        onClick={() => handleStateSelect(location.code)}
                        className={`bodySmall w-full rounded-md p-1 text-left transition hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                          selectedState === location.code ? 'bg-gray-100 ring-1 ring-gray-300' : ''
                        }`}
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={cityBoxRef}>
                <CiLocationOn className="absolute top-1/2 left-4 translate-y-[-50%]" size={18} />
                <button
                  type="button"
                  role="combobox"
                  aria-expanded={showCityDropdown}
                  onClick={() => {
                    if (!selectedState) return
                    setShowCityDropdown((prev) => !prev)
                    setShowStateDropdown(false)
                  }}
                  className={`bg-light border-border flex w-full rounded-md border py-2 pl-10 text-sm`}
                >
                  <span className="text-gray-500">
                    {selectedCity
                      ? cityOptions.find((city) => city.code === selectedCity)?.name
                      : selectedState
                        ? '구/군을 선택해주세요'
                        : '먼저 시/도를 선택해주세요'}
                  </span>
                </button>
                {showCityDropdown && selectedState && (
                  <div
                    role="listbox"
                    aria-label="구/군 선택"
                    className="border-border mt-sm absolute top-full left-0 z-40 w-full rounded-md border bg-white p-1 shadow-md"
                  >
                    {cityOptions.map((city) => (
                      <button
                        key={city.code}
                        role="option"
                        aria-selected={selectedCity === city.code}
                        type="button"
                        onClick={() => handleCitySelect(city.code)}
                        className={`py-xs bodySmall w-full rounded-md p-1 text-left transition hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                          selectedCity === city.code ? 'bg-gray-100 ring-1 ring-gray-300' : ''
                        }`}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {errors.location && <p className="text-xs text-red-600">{errors.location}</p>}
          </div>

          <button
            type="submit"
            className="bg-primary flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-base font-semibold shadow-lg"
          >
            <span>회원가입 하기</span>
          </button>
        </form> */}
      </div>
    </div>
  )
}

export default Signup
