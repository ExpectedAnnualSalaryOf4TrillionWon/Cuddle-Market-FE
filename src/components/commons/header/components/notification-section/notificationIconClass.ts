// import { cva, type VariantProps } from 'class-variance-authority'

// export const notificationIconClass = cva(
//   'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
//   {
//     variants: {
//       type: {
//         ADD_APPLICATION: 'bg-blue-100',
//         APPLICATION_ACCEPT: 'bg-green-100',
//         APPLICATION_REJECT: 'bg-red-100',
//         STUDY_JOIN: 'bg-purple-100',
//         STUDY_NOTE_CREATE: 'bg-[#CCFBF1]',
//         STUDY_REVIEW_REQUEST: 'bg-orange-100',
//         TODAY_SCHEDULE: 'bg-[#FCE7F3]',
//         UPCOMING_SCHEDULE: 'bg-[#E0E7FF]',
//       },
//     },
//     defaultVariants: {
//       type: 'ADD_APPLICATION',
//     },
//   }
// )

// export const notificationIconStrokeClass = cva('', {
//   variants: {
//     type: {
//       ADD_APPLICATION: 'stroke-[#2563EB]',
//       APPLICATION_ACCEPT: 'stroke-[#16A34A]',
//       APPLICATION_REJECT: 'stroke-[#DC2626]',
//       STUDY_JOIN: 'stroke-[#9333EA]',
//       STUDY_NOTE_CREATE: 'stroke-[#0D9488]',
//       STUDY_REVIEW_REQUEST: 'stroke-[#EA580C]',
//       TODAY_SCHEDULE: 'stroke-[#DB2777]',
//       UPCOMING_SCHEDULE: 'stroke-[#4F46E5]',
//     },
//   },
//   defaultVariants: {
//     type: 'ADD_APPLICATION',
//   },
// })
// export type NotificationIconClassProps = VariantProps<
//   typeof notificationIconClass
// >
// export const tabClass = cva(
//   'flex w-2/3 items-center justify-center pt-3 pb-3.5 text-sm border-b-2 transition-colors cursor-pointer',
//   {
//     variants: {
//       active: {
//         true: 'border-primary-500 text-primary-600',
//         false: 'border-transparent text-gray-500',
//       },
//     },
//   }
// )
