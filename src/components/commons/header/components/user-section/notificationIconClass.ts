import { cva, type VariantProps } from 'class-variance-authority'

export const notificationIconClass = cva(
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      type: {
        application: 'bg-blue-100',
        approval: 'bg-green-100',
        rejection: 'bg-red-100',
        join: 'bg-purple-100',
        study_end: 'bg-orange-100',
        reminder: 'bg-gray-100',
      },
    },
    defaultVariants: {
      type: 'reminder',
    },
  }
)

export const notificationIconStrokeClass = cva('', {
  variants: {
    type: {
      application: 'stroke-[#2563EB]',
      approval: 'stroke-[#16A34A]',
      rejection: 'stroke-[#DC2626]',
      join: 'stroke-[#9333EA]',
      study_end: 'stroke-[#EA580C]',
      reminder: 'stroke-gray-400',
    },
  },
  defaultVariants: {
    type: 'reminder',
  },
})

export type NotificationIconClassProps = VariantProps<
  typeof notificationIconClass
>

export const tabClass = cva(
  'flex w-2/3 items-center justify-center pt-3 pb-3.5 text-sm border-b-2 transition-colors cursor-pointer',
  {
    variants: {
      active: {
        true: 'border-primary-500 text-primary-600',
        false: 'border-transparent text-gray-500',
      },
    },
  }
)
