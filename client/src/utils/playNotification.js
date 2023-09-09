import toast from 'react-hot-toast'

export const playNotification = () => {
  new Audio('/notification.mp3').play()
  .catch(() => toast.success('Таймер обратного отсчета завершился', { id: 'countdownMessage' }))
}