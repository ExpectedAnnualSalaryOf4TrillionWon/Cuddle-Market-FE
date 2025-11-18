import { Search as SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
// import { useDebounce } from '@hooks/useDebounce'
import { cn } from '@src/utils/cn'

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
  placeholder = '검색어 입력',
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
    <div
      className={cn(
        'focus-within:border-primary-500 relative flex h-10 min-w-[700px] items-center rounded-lg border border-gray-100 bg-white pl-9',
        className
      )}
    >
      <div className="absolute left-0 flex h-full w-9 items-center justify-center">
        <SearchIcon className="h-4 w-4 text-gray-400" strokeWidth={1.3} />
      </div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full placeholder:text-gray-400 focus:border-transparent focus:outline-none"
      />
    </div>
  )
}
