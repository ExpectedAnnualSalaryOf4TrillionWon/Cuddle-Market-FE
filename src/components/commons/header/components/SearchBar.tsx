import { Search as SearchIcon } from 'lucide-react'
import { useState } from 'react'
// import { useDebounce } from '@hooks/useDebounce'
import { cn } from '@src/utils/cn'
import { Input } from '@components/commons/Input'

interface SearchBarProps {
  value?: string // 초기값
  // onSearch: (keyword: string) => void // 디바운스 후 검색 실행
  placeholder?: string
  delay?: number // 디바운스 시간 (ms)
  className?: string
}

export function SearchBar({
  value = '',
  // onSearch,
  placeholder = '원하는 반려동물 용품을 검색해보세요',
  // delay = 500,
  className,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState(value)
  // const debouncedKeyword = useDebounce(keyword, delay)

  // 디바운스된 키워드가 변경되면 검색 실행
  // useEffect(() => {
  //   onSearch(debouncedKeyword)
  // }, [debouncedKeyword, onSearch])
  return (
    <div className={cn('h-10 max-w-[700px] flex-1', className)}>
      <Input
        type="text"
        value={keyword}
        placeholder={placeholder}
        onChange={(e) => setKeyword(e.target.value)}
        icon={SearchIcon}
        border
        borderColor="border-gray-100"
        backgroundColor="bg-white"
      />
    </div>
  )
}
