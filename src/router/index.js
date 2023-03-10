import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/checkins",
    },
    {
      path: '/login',
      name: 'login',
      component: defineAsyncComponent(() => import('../layout/auth/SignIn.vue')),
      meta:{NON_LOGGER:true}
    },
    // Master
    {
      path: '/dashboard',
      name: 'dashboard',
      padding: true,
      component: defineAsyncComponent(
      () => import('../views/Dashboard.vue'))
    },
    {
      path: '/retur',
      name: 'Retur',
      padding: true,
      component: defineAsyncComponent(
      () => import('../views/retur/Retur.vue'))
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
        },
        {
          path : '/item/detail/:id',
          name : 'detail-item',
          padding : true,
          component : defineAsyncComponent(
            () => import('../views/barang/BarangDetail.vue'))
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

    if(!to.meta.NON_LOGGER && !Cookies.get('access_token')) router.push('/login')

  next()
})

export default router
