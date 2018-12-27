<template>
  <div class="table">
    <div>
      <el-checkbox v-model="res.hasAll">开启合计</el-checkbox>
      <el-checkbox v-model="res.autoAll">开启自动合计</el-checkbox>
      <el-checkbox v-model="res.drag">开启拖拽(如需要记忆拖拽后顺序 需要设置"Name")</el-checkbox>
      <el-checkbox v-model="res.showNum">开启序列号</el-checkbox>
      <el-checkbox v-model="res.checkModelShow">开启表头筛选(右击表头)</el-checkbox>

      <el-checkbox v-model="res.showSelect">开启选择列表</el-checkbox>
      <el-checkbox v-model="res.hasPage">开启分页</el-checkbox>
    </div>
    <div style="display: flex;flex: 1">
    <DataTable :obj="res" :columns="columns" @refresh="_refresh" @select="_select"></DataTable>
    </div>
  </div>
</template>

<script>
  import page from '@/minxs/page'

  let getList=function () {
    let obj={

    }
    return function ({page,rows}) {
      return new Promise((res, ref)=> {

        if (!obj[page]) {


          obj[page] = []
          for (let i = 0; i <rows; i++) {
            obj[page].push(getBean())
          }
        }

        res({
          list: obj[page],
          total: 100,
        })
    })
    }
    }

  function getBean() {
    let bean={
      id:rand(10),
      num:rand(2),
      money:rand(4)
    }
    return bean
  }
  function rand(m) {
    m = m > 16 ? 16 : m;
    var num = Math.random().toString();
    if(num.substr(num.length - m, 1) === '0') {
      return rand(m);
    }
    return num.substring(num.length - m);
  }

    export default {
    mixins:[page],
        name: "Table",
      created(){

      },
      methods:{
      tableInit(){

        }
      },
      data(){
      return{
        getListFn:getList(),
        columns:[
          {
            prop:"id",
            isShow:true,
            label:"我是ID",
          },
          {
            prop:"num",
            isShow:true,
            label:"数量",
            allProp:"money"
          },
          {
            prop:"money",
            isShow:true,
            label:"金钱",
            allProp:"money"
          },
          {
            prop:"action",
            isShow:true,
            label:"自定义内容",
            render:(h,params)=>{

              return h('el-input',{
                props:{
                  value:params.row.id
                }
              })
            }
          },
        ]
      }
      }

    }
</script>

<style scoped>

</style>
<style>
  .table{
    display: flex;
    height: 100%;
    flex-direction: column;
  }
</style>
