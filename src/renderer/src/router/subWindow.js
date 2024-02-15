export default [
    {
      path: '/sub/:id',
      name: 'subWindow',
      component: ()=>import('../components/sub_window/SubWindow.vue')
    }
]