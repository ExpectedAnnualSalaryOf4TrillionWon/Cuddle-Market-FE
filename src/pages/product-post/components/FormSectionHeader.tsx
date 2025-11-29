interface FormSectionHeaderProps {
  heading?: string
  description?: string
}

export default function FormSectionHeader({ heading, description }: FormSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="heading-h3">{heading}</h4>
      <p>{description}</p>
    </div>
  )
}
