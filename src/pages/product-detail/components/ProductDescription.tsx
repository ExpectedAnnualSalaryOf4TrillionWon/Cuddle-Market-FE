interface ProductDescriptionProps {
  description: string
}
export default function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-h4 text-gray-600">상품 설명</p>
      <div className="min-h-[22vh] rounded-lg border border-gray-300 p-3.5 whitespace-pre-line text-gray-900">{description}</div>
    </div>
  )
}
