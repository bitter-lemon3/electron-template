import { createRouter, createWebHashHistory } from 'vue-router'
import subWindow from './subWindow'
import subsubWindow from './subsubWindow'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...subWindow,
    ...subsubWindow,
    {
      path: '/',
      name: 'landing-page',
      component: ()=>import('../components/MainPage.vue')
    }
    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ]
})

export default router