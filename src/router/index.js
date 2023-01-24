import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    
    // Master
    {
      path: '/dashboard',
      name: 'dashboard',
      padding: true,
      component: defineAsyncComponent(
      () => import('../views/Dashboard.vue'))
    },
    //Barang
    {
      path : '/barang',
      children : [
        {
          path : '/barang',
          name : 'list-barang',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/BarangList.vue'))
        },
        {
          path : '/barang/add',
          name : 'add-barang',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/BarangAdd.vue'))
        },
        {
          path : '/barang/inventory-in',
          name : 'inventory-in',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/inventory/InventoryIn.vue'))
        },
        {
          path : '/barang/inventory-in/add',
          name : 'inventory-in-add',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/inventory/InventoryInAdd.vue'))
        },
        {
          path : '/barang/inventory-out',
          name : 'inventory-out',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/inventoryOut/InventoryOut.vue'))
        },
        {
          path : '/barang/inventory-out/add',
          name : 'inventory-out-add',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/inventoryOut/InventoryOutAdd.vue'))
        },
        {
          path : '/barang/retur',
          name : 'retur',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/retur/Retur.vue'))
        },
      ]
    },
    {
      path : '/checkins',
      children : [
        {
          path : '/checkins',
          name : 'list-chekin',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/chekin/Chekin.vue'))
        },
        {
          path : '/checkins/add',
          name : 'add-chekin',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/chekin/ChekinAdd.vue'))
        },
      ]
    },
    // End
    {
      path: '/etc',
      name: 'etc',
      padding: true,
      component: defineAsyncComponent(
      () => import('../views/EG.vue'))
    },
    {
      path: '/:pathMatch(.*)*',
      component: defineAsyncComponent(
      () => import('../views/ErrorPage/404.vue'))
    }
  ]
})

router.beforeEach((to, from, next) => {

  // document.title = to.name
  next()
})

export default router
