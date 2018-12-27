import Vue from 'vue'
import Router from 'vue-router'
import loadJs from './loadJs'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
let routes=[];
let childList=[]
loadJs().keys().forEach(key=>{
  let item =loadJs()(key)
  getRoute(item.default,'',childList)
  routes= routes.concat(item.default)

})
console.log(routes);


function getRoute(arr,basePath='',list) {
  for(let value of arr){
    if(value.children){

      getRoute(value.children,basePath+value.path,list)
    }
    else {
      // if(!value.component&&basePath==''){
      //   value.component=layout
      // }
      value.href=value.path
      value.path=basePath+value.path;
      list.push(value)
    }
  }
}
export default new Router({
  routes: childList
})
