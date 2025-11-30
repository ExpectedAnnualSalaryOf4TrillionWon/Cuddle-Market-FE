import { Button } from '@src/components/commons/button/Button'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface MyPageTitleProps {
  heading: string
  count?: number
  description: string
  buttonLabel?: string
  navigateTo?: string
}

export default function MyPageTitle({ heading, count, description, buttonLabel, navigateTo }: MyPageTitleProps) {
  const navigate = useNavigate()
  const goToProductPost = () => {
    if (navigateTo) {
      navigate(navigateTo)
    }
  }
  return (
    <div className="flex justify-between">
      <div>
        <h4 className="flex items-center gap-2">{heading}</h4>
        {description && <p>{count !== undefined ? `총 ${count}${description}` : description}</p>}
      </div>
      {buttonLabel && (
        <Button size="sm" icon={Plus} className="bg-primary-200 h-fit cursor-pointer font-bold text-white" onClick={goToProductPost} type="button">
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}
