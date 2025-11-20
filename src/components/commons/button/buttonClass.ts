import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva('flex items-center justify-center rounded-lg font-medium transition-colors', {
  variants: {
    size: {
      xs: 'h-7 w-7 p-0',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    iconPosition: {
      none: '',
      left: 'gap-2.5',
      only: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
    },
  },
  defaultVariants: {
    size: 'md',
    iconPosition: 'none',
  },
})

export const iconSizeMap = {
  xs: 16, // 4 * 4 = 16px (w-4 h-4)
  sm: 16, // 4 * 4 = 16px (w-4 h-4)
  md: 20, // 5 * 4 = 20px (w-5 h-5)
  lg: 24, // 6 * 4 = 24px (w-6 h-6)
} as const

export type ButtonVariants = VariantProps<typeof buttonVariants>
