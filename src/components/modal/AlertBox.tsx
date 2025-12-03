import { TriangleAlert } from 'lucide-react'

interface AlertBoxProps {
  alertList: string[]
}

export default function AlertBox({ alertList }: AlertBoxProps) {
  return (
    <div className="bg-danger-100/30 border-danger-100 flex flex-col gap-2 rounded-lg border p-2.5">
      <div className="flex items-center gap-2">
        <TriangleAlert className="text-danger-800" size={20} />
        <p className="text-danger-800 font-medium">주의사항</p>
      </div>
      <ul className="flex flex-col gap-1">
        {alertList.map((alertIem, i) => (
          <li key={i} className="text-danger-600 text-sm leading-none">
            • {alertIem}
          </li>
        ))}
      </ul>
    </div>
  )
}
