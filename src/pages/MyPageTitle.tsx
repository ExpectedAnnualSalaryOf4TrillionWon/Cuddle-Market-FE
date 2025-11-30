interface MyPageTitleProps {
  heading: string
  count?: number
  description: string
}

export default function MyPageTitle({ heading, count, description }: MyPageTitleProps) {
  return (
    <div>
      <h4 className="flex items-center gap-2">{heading}</h4>
      {description && <p>{count !== undefined ? `총 ${count}${description}` : description}</p>}
    </div>
  )
}
