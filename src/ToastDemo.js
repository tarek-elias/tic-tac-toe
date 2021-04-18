import { useToasts } from 'react-toast-notifications'

export const ToastDemo = () => {
  const { addToast } = useToasts()
  return (
    <div onClick={() => addToast('Developed by Tarek', {
      appearance: 'success',
      autoDismiss: true,
    })}>
      👨‍💻
    </div>
  )
}
