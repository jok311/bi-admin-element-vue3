
import { createRouter, createWebHashHistory } from 'vue-router'
// const routerHistory = createWebHistory(process.env.BASE_URL)
const routerHistory = createWebHashHistory()



/* Layout */
import Layout from '../views/layout/index.vue'

//不需要权限控制的路由
// const AllRoutes = [
//   // 登陆页面路由
//   {
//     path: '/login',
//     component: import('../views/login/index'),
//   },
// ];


// const routes = [
//   { path:"", redirect:{ name:"login" } },
//   { path:"/login", name:"login", component: login },
// ];


// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });


const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
      // children: [{
      //   path: '/',
      //   component: () => import('../views/pages/home/index.vue'),
      // }],
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
      name: 'login'
    },
    {
      // path: '/dash',
      component: Layout,
      // redirect: '/dash/template',
      children: [
        {
          path: '/dash/template',
          component: () => import('../views/pages/dash-template/index.vue'),
          name: 'DashTemplate',
          meta: { title: 'DashTemplate', affix: true }
        },
        {
          path: '/dash/box',
          component: () => import('../views/pages/dash/index.vue'),
          name: 'DashBox',
          meta: { title: 'DashBox', affix: true }
        },

      ]
    },
    {
      // path: '/draggable',
      component: Layout,
      children: [
        {
          path: '/draggable/index',
          component: () => import('../views/pages/vue-draggable/index.vue'),
          name: 'Draggable',
          meta: { title: 'draggable', affix: true }
        },
      ]
    },
    {
      path: '/vue-grid-out',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('../views/pages/vue-grid-out/index.vue'),
          name: 'Vuegridout',
          meta: { title: 'Vuegridout', affix: true }
        }]
    },
        
    {
      // path: '',
      component: Layout,
      children: [
        {
          path: '/side/index',
          component: () => import('../views/pages/side-bar-test/index.vue'),
          name: 'SideBar',
          meta: { title: 'SideBar', affix: true }
        },
      ]
    },
    {
      path: '',
      component: Layout,
      children: [
        {
          path: '/costumclone/index',
          component: () => import('../views/pages/costum-clone/index.vue'),
          name: 'CostumColone',
          meta: { title: 'CostumColone', affix: true }
        },
      ]
    },
    {
      // path: '',
      component: Layout,
      children: [
        {
          path: '/vue-drag-resize/index',
          component: () => import('../views/pages/vue-drag-resize/index.vue'),
          name: 'vue-drag-resize',
          meta: { title: 'vue-drag-resize', affix: true }
        },
      ]
    },
    {
      component: Layout,
      children: [
        {
          path: '/user/index',
          component: () => import('../views/pages/user/index.vue'),
          name: 'user',
          meta: { title: 'user', affix: true }
        },
      ]
    },
    {
      component: Layout,
      children: [
        {
          path: '/vue-grid-out/index',
          component: () => import('../views/pages/vue-grid-out/index.vue'),
          name: 'vue-grid-out',
          meta: { title: 'vue-grid-out', affix: true }
        },
      ]
    },
    {
      component: Layout,
      children: [
        {
          path: '/interact/index',
          component: () => import('../views/pages/interact/index.vue'),
          name: 'interact',
          meta: { title: 'interact', affix: true }
        },
      ]
    },

  ]
})


export default router



