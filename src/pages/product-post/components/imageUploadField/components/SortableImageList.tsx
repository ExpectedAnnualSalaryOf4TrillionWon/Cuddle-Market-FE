import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { Button } from '@src/components/commons/button/Button'
import { Plus } from 'lucide-react'
import SortableImageItem from './SortableImageItem'

interface SortableImageListProps {
  previewUrls: string[]
  onDragEnd: (event: DragEndEvent) => void
  onRemoveImage: (index: number) => void
}

export default function SortableImageList({ previewUrls, onDragEnd, onRemoveImage }: SortableImageListProps) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={previewUrls} strategy={horizontalListSortingStrategy}>
        <div className="flex items-center gap-3">
          {previewUrls.map((imgUrl, i) => (
            <SortableImageItem key={imgUrl} url={imgUrl} index={i} onRemove={() => onRemoveImage(i)} />
          ))}
          {previewUrls.length < 5 && <Button size="lg" className="bg-primary-300 flex cursor-pointer flex-col rounded-full text-white" icon={Plus} />}
        </div>
      </SortableContext>
    </DndContext>
  )
}
