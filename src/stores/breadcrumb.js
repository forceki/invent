import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore({
  id: 'breadcrumb',
  state: () => ({
    section: "Penampungan",
    view: ""
  }),
  actions: {

  }
})
