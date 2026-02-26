import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

let notyfInstance: Notyf | null = null

function getNotyf(): Notyf {
  if (!notyfInstance) {
    notyfInstance = new Notyf({
      duration: 3000,
      position: { x: 'right', y: 'top' },
      ripple: true,
      dismissible: true
    })
  }
  return notyfInstance
}

/**
 * Composable for displaying toast notifications
 * Uses Notyf library for clean, modern notifications
 */
export function useNotifications() {
  const notyf = getNotyf()

  return {
    success: (message: string) => notyf.success(message),
    error: (message: string) => notyf.error(message)
  }
}
