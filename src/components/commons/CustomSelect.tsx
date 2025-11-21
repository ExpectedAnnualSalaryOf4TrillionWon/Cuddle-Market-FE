import { useEffect, useRef, useState } from 'react'
import { cn } from '@src/utils/cn'
import { ChevronDown as DownArrow } from 'lucide-react'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
  disabled?: boolean
  className?: string
  id?: string
}

export function CustomSelect({ value, onChange, options, placeholder, disabled = false, id }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev)
    }
  }

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (isOpen && selectRef.current && !selectRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={handleToggle}
        id={id}
        className="relative flex w-full cursor-pointer rounded-lg border border-gray-400 px-3 py-3 pr-10 text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100/30 disabled:text-gray-300"
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>{selectedOption ? selectedOption.label : placeholder}</span>
        <div className="absolute top-0 right-3 flex h-full w-9 items-center justify-end">
          <DownArrow className="h-4 w-4 text-gray-400" strokeWidth={2} />
        </div>
      </button>
      {isOpen && !disabled && (
        <div
          role="listbox"
          aria-label={placeholder}
          className="absolute top-full left-0 z-40 mt-0.5 w-full rounded-md border border-gray-400 bg-white p-1 shadow-md"
        >
          {options.map((option) => (
            <button
              key={option.value}
              role="option"
              type="button"
              aria-selected={value === option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full rounded-md p-2 text-left text-sm transition hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                value === option.value && 'bg-gray-100 ring-1 ring-gray-300'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
