interface RequiredLabelProps {
  htmlFor: string
  children: string
}

export function RequiredLabel({ htmlFor, children }: RequiredLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-gray-900">
      <span>{children}</span>
      <span className="text-danger-500">*</span>
    </label>
  )
}
