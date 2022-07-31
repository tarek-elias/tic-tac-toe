import React, { Component }  from 'react';
import { useToasts } from 'react-toast-notifications'

export const ToastDemo = () => {
  const { addToast } = useToasts()
  return (
    <div onClick={() => addToast('Developed by Tarek\ntarek.elias97@gmail.com', {
      appearance: 'success',
      autoDismiss: true,
    })}>
      👨‍💻
    </div>
  )
}
