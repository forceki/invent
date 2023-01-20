import {useLayoutStore} from '../../stores/layout'
import { randomId } from '../../utils'

const layout = useLayoutStore()

const createToast = ( {message = '', duration = 3000, type = 'info'}: { message?: any; duration?: number; type?: 'info' | 'success' | 'warning' | 'error' }) => {
    let toastData = {
        id: randomId(),
        data: {
            message,
            duration,
            type
        }
    }
    layout.addToast(toastData)
}

export default createToast 