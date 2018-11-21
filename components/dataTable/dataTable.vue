<template>
  <div class="dataTable" >
    <!--<div v-if="add.url" style="padding: 20px">-->
    <!--<router-link class="inlineBlock" :to="add.url">  <el-button type="primary" >{{add.title}}</el-button></router-link>-->
    <!--</div>-->
    <div class="table" ref="dataTable">
      <el-table border
                :data="nowList"
                ref="dtable"
                highlight-current-row
                :height="autoHeight?height:null"
                style="width: 100%;overflow: auto"
                v-loading="obj.isLoading"
                @selection-change="handleSelectionChange"
                @cell-click="cellClick"
                @select-all="selectAll"
                :row-class-name="tableRowClassName"
                :max-height="height">

        <!--多选-->
        <!--序号列-2018-10-15徐莹-->
        <!--<el-table-column v-if="showSelect"-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          v-if="showSelect"
          align="center"
          prop="isShow"
          width="55"
          label="多选框"
          fixed="left"
          :render-header="renderCheckBox">
        >

          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isCheck" @change="changeOne(scope.row)" ></el-checkbox>
          </template>
        </el-table-column>


        <!--数据源-->
        <el-table-column
          v-for="column in columns"
          v-if="column.isShow&&!column.scope"
          align="center"
          :sortable="column.hasSort"
          :show-overflow-tooltip="tooltip"
          :key="column.prop"
          :prop="column.prop"
          :width="calculationWidth(column)"
          :sort-by="column.prop"
          :sort-method="column.method"
          :fixed="column.fixed"
          :label="column.label">
          <template slot-scope="scope">
            <div v-if="column.render">
              <render :render="column.render" :params="scope"></render>
            </div>
            <div v-else>
              {{scope.row | itemFilter(column)}}
            </div>
          </template>

        </el-table-column>

      </el-table>
    </div>
    <div class="heJi" v-if="hasAll">
      <span>合计</span>
      <div v-for="item in allColumns">
        <span>{{item.label}}:</span>
        <span>{{allObj |itemFilter(item)}}</span>
      </div>
    </div>
    <div class="page"v-if="hasPage">

      <el-pagination
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="obj.page.page"
                       :page-sizes="[10, 20, 30, 40,50,100]"
                       :page-size="obj.page.rows"
                       layout="total, sizes, prev, pager, next"
                       :total="parseInt(obj.page.totalCount)||0">
      </el-pagination>
      <i class="el-icon-refresh" @click="refresh"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import render from './render'
  import type from  '../../utils/type'
  import {mapGetters} from "vuex"
  import {lang} from '../../utils/lodash.js'
  /*向父组件传递的数据：
   * commitSelection     被选中的数据
   *
   * */
  export default {
    name: "tm-table",

    components:{
      render,

    },

    filters:{
      itemFilter(value,column){
        if(column.filter){
          return column.filter(value[column.prop])
        }
        return value[column.prop]
      }
    },

    props: {
      keyId:{            //当初出现多选 主键用来区分每条记录的唯一Key 必传
        type:String,
        default:function() {
          return  ""
        }
      },
      tableRowClassName:{
        type:Function,
        default:function () {
          return ""
        }
      },
      hasAll:{
        type:Boolean,
        default() {
          return false
        }
      },
      allObj:{

      },
      allColumns:{
        type:Array,
        default(){
          return []
        }
      },

      tooltip: {
        type: Boolean,
        default: true
      },

      hasPage:{
        type:Boolean,
        default:function () {
          return true
        }
      },
      //自适应父及高度
      autoHeight:{
        type:Boolean,
        default:function () {
          return true
        }
      },

      // 这是相应的字段展示
      columns: {
        type: Array,
        default: function() {
          return [];
        }
      },
      // 这是数据源
      obj: {
        type: Object,
        default: function() {
          return {
            list:[],
            page:1,
            size:10
          }
        }
      },
      showSelect: {
        type:Boolean,
        default:function () {
          return false
        }
      }
    },
    created(){
      this.$nextTick(()=>{

        //this.height=this.$refs.dataTable.offsetHeight - (this.hasPage?85:0)
        this.height=this.$refs.dataTable.offsetHeight

      })
      this.nowList=lang.cloneDeep(this.list);
    },
    watch:{
      navStyle(){
        this.$nextTick(()=>{

          this.height=this.$refs.dataTable.offsetHeight

        })

      },
      list(){
        this.nowList=lang.cloneDeep(this.list);
      }

    },
    mounted(){

    },
    data(){
      return {
        BASE_URL: process.env.BASE_API,
        height:400,
        allList:[],
        nowList:[],

      }
    },
    computed:{
      ...mapGetters(['navStyle']),
      list(){


        var list
        if(this.keyId&&this.showSelect) {
          list = lang.cloneDeep(this.obj.list.map(item => {
            item.isCheck = item.isCheck ? true : false
            let isOk = false
            for (let value of this.allList) {
              if (item[this.keyId] == value[this.keyId]) {

                item.isCheck = value.isCheck
                value = item
                isOk = true;
                break
              }

            }

            if (!isOk) {
              this.allList.push(item)
            }

            return item
          }))
        }
        else{
          list=lang.cloneDeep(this.obj.list)
        }
        return list
      },
      checkAll(){
        if(this.list.length==0){
          return false
        }
        for(let value of this.nowList){
            if(!value.isCheck){
              return false
            }
        }
        return true
      }
    },
    methods: {
      //筛选
      filterList(fn){
        this.nowList=lang.cloneDeep(this.list).filter((item)=>{
          if(type.isFunc(fn)){
           return fn(item)
          }
          return item
        })
      },
      calculationWidth(item){
        let name =item.label;
        let widthNAuto=item.widthNAuto
        if(widthNAuto){
          return item.width||''
        }
        if(name){
          let length=name.length;

          let width=length*20+20;
          return width+'px'
        }
        else {
          return ""
        }


      },
      setCurrent(index) {

        this.$refs.dtable.setCurrentRow(this.list[index]);
      },
      selectRow(){

        //选择的记录 配合ref取出组件里选择值
        return this.allList.filter(item=>{
          return item.isCheck==true
        })
      },
      emptySelectRow(){//清空选中项，查询条件更改时会出现原来的选中项还是选中的
        this.allList =  this.allList.map(item=>{
           item.isCheck=false;
          return item;
        })
      },
      //将选中的行发送到父组件
      changeOne(item,bin){
        this.allChange(item)
      },
      allChange(item){
        if(this.keyId&&this.showSelect){

          for(let value of this.allList){
            if(item[this.keyId]==value[this.keyId]){
              value.isCheck=item.isCheck
            }

          }
        }},
      renderCheckBox(h,params){
        return h('el-checkbox',{
          props:{
            value:this.checkAll
          },
          on:{
            change:(item)=>{
                  let a =this.checkAll;

              for(let value of this.nowList){
                    value.isCheck=!a
                 this.allChange(value)
                 }

            }
          }
        })

      },
      sortFn(a,b){

        // let ref=/^\d+(\.\d+)?\%?$/;
        // if(ref.test(a)&&ref.test(b)){
        //    a=parseFloat(a.replace(/(\%)/,''));
        //    b=parseFloat(a.replace(/(\%)/,''));
        //    return a-b;
        // }
        //    return a-b;
      },
      handleSelectionChange(val) {//多选 项发生改变
        const selectionArr = [];
        val.forEach(function(el) {
          selectionArr.push(el);
        });
        this.$emit("handleSelectionChange", selectionArr);
      },
      handleSizeChange(pageSize){
        this.obj.page.rows = pageSize;
        this.$emit('select',this.obj.page)
      },
      handleCurrentChange(pageChange){
        this.obj.page.page= pageChange;
        this.$emit('select',this.obj.page)
      },
      cellClick(value) {
        //行点击事件
        this.$emit("commitClick", value);
      },
      delet(item){

        this.allList= this.allList.filter((value)=>{
        return value[this.keyId]!=item[this.keyId]
      })


      },
      refresh(){
        //刷新事件
        this.$emit("refresh");
      },
      selectAll:function(selection){//用户全选时触发
       this.$emit('selectAll',selection)
      },
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .el-table {
    width: 100%;

  }
  .table{
    width: 100%;
    overflow: auto;
    display: flex;
    flex: 1;
  }
  .heJi{
    padding: 10px;
    color: #606266;
    display: flex;
    >span{
      padding: 0;
    }
    >div{
      padding: 0 20px;
    }
  }
  .page{
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    align-items: center;
    >i{
      cursor: pointer;
    }
  }
</style>
<style lang="less">
  .dataTable{
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
  .el-table th{

    background-color: #f9f9f9
  }
  .el-table th>.cell{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #004986;
  }
  /*.el-table .warning-row {*/
  /*background: oldlace;*/
  /*}*/

  .el-table .success-row {
    background: #7d94ed;
    color: #ffffff;
  }
  .el-table .erro-row {
    background: #bbc7f8;
    color: #ffffff;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f5f7fa;
    color:#606266;
  }
  }
  .el-table__empty-block{
    text-align: left!important;
  }

</style>
