import { Button } from '../commons/button/Button'

interface ModalButtonGroupProps {
  onCancel: () => void
  onConfirm: () => void
  cancelText?: string
  confirmText: string
  disabled?: boolean
}

function ModalButtonGroup({ onCancel, onConfirm, cancelText = '취소', confirmText, disabled = false }: ModalButtonGroupProps) {
  return (
    <div className="flex justify-end gap-3">
      <Button type="button" onClick={onCancel} size="sm" className="cursor-pointer rounded-lg border border-gray-300 bg-white">
        {cancelText}
      </Button>
      <Button
        type="submit"
        onClick={onConfirm}
        disabled={disabled}
        size="sm"
        className="bg-danger-600 cursor-pointer rounded-lg text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {confirmText}
      </Button>
    </div>
  )
}

export default ModalButtonGroup
