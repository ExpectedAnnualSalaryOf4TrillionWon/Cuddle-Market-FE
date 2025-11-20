import { LOCATIONS, type CityCode, type StateCode } from '@constants/constants'
import { useUserStore } from '@store/userStore'
import { useEffect, useRef, useState } from 'react'
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F3F4F6] py-10">
      <div className="flex min-w-[530px] flex-col items-center gap-9 rounded-[20px] bg-white px-5 py-10">
        <TitleSection title="회원가입" desc="이미 계정이 있으신가요?" link="로그인하기" linkPath={ROUTES.LOGIN} />
        <SignUpForm />
      </div>
    </div>
  )
}

export default Signup
