import { Search as SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
// import { useDebounce } from '@hooks/useDebounce'
import { cn } from '@src/utils/cn'
import { Input } from '@components/commons/Input'
import { useSearchParams } from 'react-router-dom'

interface SearchBarProps {
  placeholder?: string
  delay?: number // 디바운스 시간 (ms)
  className?: string
  borderColor?: string
  paramName?: string // URL 파라미터 이름 (기본값: 'keyword')
  inputClass?: string
}

export function SearchBar({
  placeholder = '원하는 반려동물 용품을 검색해보세요',
  borderColor = 'border-gray-100',
  className,
  paramName = 'keyword',
  inputClass,
}: SearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentKeyword = searchParams.get(paramName) || ''
  const [keyword, setKeyword] = useState(currentKeyword)

  function handleKeywordChange(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement
      const keyword = target.value.trim()
      setSearchParams((prev) => {
        if (keyword) {
          prev.set(paramName, keyword)
        } else {
          prev.delete(paramName)
        }
        return prev
      })
    }
  }

  // URL이 변경될 때 (뒤로가기, 앞으로가기 등) Input value 동기화
  useEffect(() => {
    setKeyword(currentKeyword)
  }, [currentKeyword])

  return (
    <div className={cn('h-5 flex-1 md:h-10 md:min-w-[480px]', className)}>
      <Input
        type="text"
        value={keyword}
        placeholder={placeholder}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeywordChange}
        icon={SearchIcon}
        border
        borderColor={borderColor}
        backgroundColor="bg-white"
        inputClass={inputClass}
      />
    </div>
  )
}
