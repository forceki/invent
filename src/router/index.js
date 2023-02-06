import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: '/login',
      name: 'login',
      component: defineAsyncComponent(
      () => import('../layout/auth/SignIn.vue'))
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
      path : '/item',
      children : [
        {
          path : '/item',
          name : 'list-item',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/BarangList.vue'))
        },
        {
          path : '/item/add',
          name : 'add-item',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/BarangAdd.vue'))
        },
        {
          path : '/item/edit/:id',
          name : 'edit-item',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/BarangEdit.vue'))
        }
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
        {
          path : '/checkins/edit/:id',
          name : 'edit-chekin',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/chekin/ChekinEdit.vue'))
        },
      ]
    },
    {
      path : '/gudang',
      children : [
        {
          path : '/gudang',
          name : 'list-gudang',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/gudang/Gudang.vue'))
        }
      ]
    },
    {
      path : '/supplier',
      children : [
        {
          path : '/supplier',
          name : 'list-supplier',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/supplier/Supplier.vue'))
        }
      ]
    },
    {
      path : '/kategori',
      children : [
        {
          path : '/kategori',
          name : 'list-kategori',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/kategori/Kategori.vue'))
        }
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
