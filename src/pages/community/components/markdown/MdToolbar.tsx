import { IconButton } from '@src/components/commons/button/IconButton'
import { Bold, Italic, Code2, Link as LinkIcon, List, Image } from 'lucide-react'

interface MdToolbarProps {
  tab: 'edit' | 'preview'
  setTab: (t: 'edit' | 'preview') => void
  onBold: () => void
  onItalic: () => void
  onCode: () => void
  onLink: () => void
  onH1: () => void
  onBullet: () => void
  onNumber: () => void
  onImage: () => void
}

export default function MdToolbar({ tab, setTab, onBold, onItalic, onCode, onLink, onH1, onBullet, onNumber, onImage }: MdToolbarProps) {
  return (
    <div className="flex items-center border-b border-gray-400 bg-gray-100 px-2 py-2">
      {/* 좌측 탭 */}
      <div className="flex items-center gap-1 rounded-lg bg-white p-1">
        <button
          type="button"
          onClick={() => setTab('edit')}
          className={`rounded-lg px-3 py-1 text-sm hover:cursor-pointer ${tab === 'edit' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          작성
        </button>
        <button
          type="button"
          onClick={() => setTab('preview')}
          className={`rounded-lg px-3 py-1 text-sm ${tab === 'preview' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-600 hover:cursor-pointer hover:bg-gray-50'}`}
        >
          미리보기
        </button>
      </div>

      {/* 우측 툴바 */}
      <div className="ml-auto flex items-center gap-1">
        <IconButton onClick={onBold}>
          <Bold size={16} />
        </IconButton>
        <IconButton onClick={onItalic}>
          <Italic size={16} />
        </IconButton>
        <IconButton onClick={onCode}>
          <Code2 size={16} />
        </IconButton>
        <IconButton onClick={onLink}>
          <LinkIcon size={16} />
        </IconButton>
        <IconButton onClick={onH1}>
          <span>
            <span>H</span>
            <span className="text-xs">1</span>
          </span>
        </IconButton>
        <IconButton onClick={(e) => (e.shiftKey ? onNumber() : onBullet())}>
          <List size={16} />
        </IconButton>
        <IconButton onClick={onImage}>
          <Image size={16} />
        </IconButton>
      </div>
    </div>
  )
}
