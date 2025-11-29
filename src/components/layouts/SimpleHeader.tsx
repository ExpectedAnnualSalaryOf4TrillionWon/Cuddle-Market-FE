interface SimpleHeaderProps {
  title: string
  description?: string
}

export function SimpleHeader({ title, description }: SimpleHeaderProps) {
  return (
    <div className="mx-auto flex max-w-[var(--container-max-width)] flex-col gap-2 bg-white px-3.5 py-2.5">
      <h2 className="heading-h2">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
