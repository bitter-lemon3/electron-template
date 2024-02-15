export default [
    {
      path: '/sub/:id/subsub/:subid',
      name: 'subsubWindow',
      component: ()=>import('../components/sub_window/subsub_window/SubSubWindow.vue')
    }
]