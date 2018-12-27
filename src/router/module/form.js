export default [

  {
    path: '/dataForm',
    name: 'form',
    meta: { title: '表格案例', icon: 'table' },

    children: [
      {
        path: '/dataForm',
        name: 'form',
        component: () => import('@/views/dataForm/dataForm'),
        meta: { title: '表格案例', icon: 'table' }
      },
    ]
  },

]
