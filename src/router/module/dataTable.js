export default [

  {
    path: '/dataTable',
    name: 'dataTable',
    meta: { title: '表格案例', icon: 'table' },

    children: [
      {
        path: '/Table',
        name: 'Table',
        component: () => import('@/views/dataTable/Table'),
        meta: { title: '表格案例', icon: 'table' }
      },
    ]
  },

]
