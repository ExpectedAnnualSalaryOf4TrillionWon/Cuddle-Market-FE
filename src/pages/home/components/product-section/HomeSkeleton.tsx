export default function HomeSkeleton() {
  return (
    // 상품 그리드 스켈레톤
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-xl bg-gray-200" />
          <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-1 h-4 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  )
}
