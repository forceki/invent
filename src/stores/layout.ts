import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    absoluteLoading: false,
    loadingStatement: '',
    sideside: false,
    padding: useStorage('padding',true),
    collapse: useStorage('collapse',true),
    asideHover: false,
    mestionora: false,
    loading: false,
    dark: useStorage('dark',false),
    asideSection: useStorage('asec',0),
    asideSub: useStorage('asub',-1),
    toasts: []
  }),
  actions: {
    async addToast(toast: any){
      this.toasts.push(toast)
    },
    async clearToast(id: any){
      const index = this.toasts.findIndex((toast: { id: any }) => toast.id === id)
      this.toasts.splice(index, 1)
    } 
  }
})
