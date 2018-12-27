import dataTable from '@com/dataTable/dataTable'
import Form from '@com/form/vForm'
import model from '@com/model/model'


const  Components={
   install:function (Vue) {
     Vue.component('DataTable',dataTable)
     Vue.component('vForm',Form)
     Vue.component('model',model)

   }
}
export default Components
