<template>
  <div class="dataTable" >
    <!--<div v-if="add.url" style="padding: 20px">-->
    <!--<router-link class="inlineBlock" :to="add.url">  <el-button type="primary" >{{add.title}}</el-button></router-link>-->
    <!--</div>-->
    <div class="table" ref="dataTable" >
      <el-table border
                :data="nowList"
                border
                :show-summary="obj.hasAll||obj.autoAll"
                :summary-method="getSummaries"
                @row-dblclick="rowDblclick"
                ref="dtable"
                highlight-current-row
                :height="obj.autoHeight?height:null"
                style="width: 100%;overflow: auto"
                v-loading="obj.isLoading"
                @selection-change="handleSelectionChange"
                v-if="tableShow"
                @cell-click="cellClick"
                :header-cell-class-name="headerCellClassName"
                :cell-class-name="cellClassName"
                @select-all="selectAll"
                @header-contextmenu="headerClick"
                :row-class-name="tableRowClassName"
                :row-style="changeRowstyle"
                :max-height="height">

        <!--多选-->
        <!--序号列-2018-10-15徐莹-->
        <!--@header-click="headerClick"-->
        <!--<el-table-column v-if="showSelect"-->
        <!--type="selection"-->
        <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
                v-if="obj.showNum||obj.hasAll"
                type="index"
                label="序号"
                align="center"
                fixed="left"
                width="80"
                :index="indexMethod">
        </el-table-column>
        <el-table-column
                v-if="obj.showSelect"
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
                v-for="(column,index) in dcolumns"
                v-if="column.isShow&&!column.scope"
                align="center"
                :sortable="column.hasSort"
                :show-overflow-tooltip="tooltip"
                :key="index"
                :prop="column.prop"
                :min-width="calculationWidth(column)"
                :sort-by="column.prop"
                :sort-method="column.method"
                :fixed="column.fixed"
                :render-header="renderHeader"
                :column-key="column.$index.toString()"
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
    <!--<div class="heJi" v-if="hasAll"  >-->
    <!--<span>合计</span>-->
    <!--<div v-for="item in allColumns">-->
    <!--<span>{{item.label}}:</span>-->
    <!--<span>{{allObj |itemFilter(item)}}</span>-->
    <!--</div>-->
    <!--</div>-->

    <div class="page"v-if="obj.hasPage">

      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="obj.page.page"
              :page-sizes="[20, 50, 80, 100]"
              :page-size="obj.page.rows"
              layout="total, sizes, prev, pager, next"
              :total="parseInt(obj.page.totalCount)||0">
      </el-pagination>
      <i class="el-icon-refresh" @click="refresh"></i>
    </div>
    <checkModel v-if="obj.checkModelShow" :columns="dcolumns" v-model="checkShow" @add="checkAdd"></checkModel>
  </div>
</template>

<script type="text/ecmascript-6">

    import render from './render'
    import checkModel from './checkModel'
    import type from  '@/utils/type'
    import floatObj from '@/utils/calculation'
    import {lang} from '@/utils/lodash.js'
    import {getStorage,setStorage} from '@/utils/setStorage'
    /*向父组件传递的数据：
     * commitSelection     被选中的数据
     *
     * */
    export default {
        name: "tm-table",

        components:{
            render,

            checkModel
        },

        filters:{
            itemFilter(value,column){
                if(column.filter){
                    return column.filter(value[column.prop],value)
                }
                return value[column.prop]
            }
        },

        props: {



            tableRowClassName:{
                type:Function,
                default:function () {
                    return ""
                }
            },

          rowDblclick:{
            type:Function,
            default(){
              return function () {
                return ""
              }
            }
          },


            tooltip: {
                type: Boolean,
                default: true
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
                        size:10,
                      isLoading:false,//打开遮罩层
                      autoHeight:true,  //自适应父及高度
                      hasPage:true,  //是否开启分页
                      checkModelShow:true ,//是否开启表头筛选
                      keyId:"",          //当初出现多选 主键用来区分每条记录的唯一Key 必传
                      showSelect:false,//开启选择功能
                      showNum:false,//开启序号
                      hasAll:false,//显示合计
                      allObj:{},//手动传入合计数据
                      autoAll:false,//自动计算合计
                      name:"",//开启拖拽记忆
                      drag:false,//开启拖拽


                    }
                }
            },

            changeRowstyle:{//改变行的样式
                type:Function,
                default:function () {
                    return ''
                }
            }
        },
        created(){
          this.dcolumns=this.initColumns()
            this.$nextTick(()=>{

                //this.height=this.$refs.dataTable.offsetHeight - (this.hasPage?85:0) oncontextmenu
                this.height=this.$refs.dataTable.offsetHeight


            })
          this.nowList=this.initList()
        },
        watch:{

            columns(n){

                this.dcolumns=this.initColumns()
            },
            dcolumns(n){

                let {name}=this.obj
                let key =this.$route.path+"-"+name;
                if(!name ){
                    return
                }
                try{
                    var storage= getStorage(key,'localStorage')||{}


                }
                catch (e) {
                    var storage = []
                }



                storage=this.dcolumns
                setStorage(key,JSON.stringify(storage),'localStorage')
            },
            list(){
                this.nowList=this.initList()
            }

        },
        mounted(){

        },
        data(){
            return {
                dcolumns:[],
                autoAllObj:{},
                tableShow:true,
                BASE_URL: process.env.BASE_API,
                height:400,
                allList:[],
                nowList:[],
                checkShow:false,
                dragState:{
                    start: -9,
                    startRow:-9,
                    end: -9,
                    endRow:-9,
                    now:-9,
                    dragging: false,
                    direction: undefined
                }
            }
        },
        computed:{
            // ...mapGetters(['navStyle']),
            tdcolumns(){


            },
            list(){

              return this.obj.list
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
            },
        },
        methods: {
          initList(){
            var arr
            let {autoAll,showSelect,list,keyId}=this.obj

            arr = lang.cloneDeep(list.map((item,index) => {
              if(autoAll){
                for(let key in this.autoAllObj){

                  this.autoAllObj[key]=floatObj.add(this.autoAllObj[key],item[key])

                }
              }
              if(showSelect){
                item.isCheck = item.isCheck ? true : false

                if(keyId){
                  let isOk = false
                  for (let value of this.allList) {
                    if (item[keyId] == value[keyId]) {
                      item.isCheck=value.isCheck;
                      Object.assign(value,item)

                      isOk = true;
                      break
                    }

                  }

                  if (!isOk) {
                    this.allList.push(item)
                  }
                }
              }

              item.$index=index

              return item
            }))

            return arr
          },
          initColumns(){
            let {autoAll,name}=this.obj

            let list=this.columns.map((item,index)=>{
              if(autoAll&&item.allProp){
                this.autoAllObj[item.allProp]=0
              }
              item.$index=index;
              return item
            })


            if(!name){
              return list
            }

            try {
              let key=this.$route.path+"-"+name;
              let storage=getStorage(key,'localStorage')||{}


              let columns =[
              ]

              if(storage){


                for(let value of storage){

                  for(let item of list){
                    if(value.prop==item.prop){
                      item.isShow=value.isShow
                      columns.push(item)
                    }
                  }
                }

                return columns.map((item,index)=>{
                  item.$index=index;
                  return item
                })
              }
              return  list

            }
            catch (e) {
              return list
            }

          },
            checkAdd(item){
                this.dcolumns=lang.cloneDeep(item)
            },
            itemFilter(value,column,type='prop'){
                if(!value[column[type]]){
                    return ""
                }
                if(column.filter){
                    try {
                        return column.filter(value[column[type]],value)
                    }
                    catch (e) {
                        console.error(e)
                        return ""
                    }

                }
                return value[column[type]]
            },
            indexMethod(index){
              let {hasPage,page}=this.obj
                if(hasPage){
                    let currentPage =  Number(page.page); // 当前页
                    let pageSize = Number(page.rows);
                    return index + 1 + (currentPage-1)*pageSize
                }else {
                    return index + 1
                }

            },
            getSummaries(){
              let {autoAll,allObj,showSelect}=this.obj
                let allList=autoAll?this.autoAllObj:allObj
                let arr=this.dcolumns.map((item)=>{
                    if(item.allProp){

                        return this.itemFilter(allList,item,'allProp')
                    }
                    else {
                        if(allObj[item.prop]){
                            return this.itemFilter(allList,item,'prop')
                        }

                    }
                    return ""
                })

                if(showSelect){
                    arr.unshift("")
                }
                arr.unshift("合计")

                return arr
            },
            rowStyle({ row, rowIndex}) {
                this.changeRowstyle(row,rowIndex);
            },
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

                    let width=length*20+40;
                    return width+'px'
                }
                else {
                    return null
                }


            },
            headerClick(column, event){
              let {checkModelShow}=this.obj
                if(!checkModelShow){
                    return false
                }
                if(event.target.tagName=='DIV'){
                    this.checkShow=true
                }
                event.returnValue = false;
                return false
            },
            setCurrent(index) {

                this.$refs.dtable.setCurrentRow(this.list[index]);
            },
            selectRow(){
            let {keyId}=this.obj
                //选择的记录 配合ref取出组件里选择值
                let list =keyId?this.allList:this.nowList
                return list.filter(item=>{
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
              let {keyId}=this.obj
                if(keyId&&this.showSelect){

                    for(let value of this.allList){
                        if(item[keyId]==value[keyId]){
                            value.isCheck=item.isCheck
                        }

                    }
                }},
            renderHeader(h,params){
                let column=params.column

                return h(
                    'div', {
                        'class': ['thead-cell'],
                        on: {
                            mousedown: ($event) => {
                              if(this.obj.drag){
                                this.handleMouseDown($event, params)
                              }

                            },
                            mousemove: ($event) => {
                              if(this.obj.drag){
                                this.handleMouseMove($event, params)
                              }

                            }
                        }
                    }, [
                        // 添加 <a> 用于显示表头 label
                        h('a', column.label),
                        // 添加一个空标签用于显示拖动动画
                        h('span', {
                            'class': ['virtual'],
                        })
                    ])

            },
            // 按下鼠标开始拖动
            handleMouseDown(e,row){

                this.dragState.dragging = true
                this.dragState.start =parseInt(row.column.columnKey)
                this.dragState.startRow=row.$index





                document.addEventListener('mouseup', this.handleMouseUp);

                // console.log(e)
                // console.log(row)
            },
            // 鼠标放开结束拖动
            handleMouseUp(e){
                this.dragColumn(this.dragState)
                this.dragState = {
                    start: -9,
                    startRow:-9,
                    endRow:-9,
                    end: -9,
                    now:-9,
                    dragging: false,
                    direction: undefined
                }
                document.removeEventListener('mouseup', this.handleMouseUp);
            },
            // 拖动易位
            dragColumn({start, end, direction}){
                /*start=start-(this.showSelect?1:0);  //有多选项的，不需要减掉，这段加上会报错
                end=end-(this.showSelect?1:0);*/
                let tempData = []
                let left = direction === 'left'
                let min = left ? end : start - 1
                let max = left ? start + 1 : end
                for (let i = 0; i < this.dcolumns.length; i++) {
                    if (i === end) {
                        tempData.push(this.dcolumns[start])
                    } else if (i > min && i < max) {
                        tempData.push(this.dcolumns[ left ? i - 1 : i + 1 ])
                    } else {
                        tempData.push(this.dcolumns[i])
                    }
                }

                this.dcolumns = tempData


                //  this.tableShow=false;
                // setTimeout(()=>{
                //   this.tableShow=true
                // },0)

            },
            // 拖动中
            handleMouseMove(e,row){
                let index =parseInt(row.column.columnKey)

                if (this.dragState.dragging&&index!=this.dragState.start) {
                    // 记录起始列
                    this.dragState.now=row.$index
                    if (index - this.dragState.start !== 0) {
                        this.dragState.direction = index - this.dragState.start < 0 ? 'left' : 'right' // 判断拖动方向
                        this.dragState.end = index
                        this.dragState.endRow=row.$index
                    } else {
                        this.dragState.direction = undefined
                    }
                } else {
                    return false
                }


            },
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

            headerCellClassName ({column, columnIndex}) {

                let active = columnIndex  === this.dragState.endRow ? `darg_active_${this.dragState.direction}` : ''
                let start = columnIndex  === this.dragState.startRow|| columnIndex  === this.dragState.now? `darg_start` : ''
                return `${active} ${start}`
            },

            cellClassName ({column, columnIndex}) {
                if(columnIndex  === this.dragState.startRow){
                    return 'darg_start'
                }

                if(columnIndex  === this.dragState.now){
                    return 'darg_start'
                }
                else {
                    return ''
                }
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
              let {keyId}=this.obj
                this.allList= this.allList.filter((value)=>{
                    return value[keyId]!=item[keyId]
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

  .dataTable {
    　.el-table .darg_start {
      background-color: #f3f3f3;
    }
    .el-table th {
      padding: 0 10px;
      .virtual{
        position: fixed;
        display: block;
        width: 0;
        height: 0;
        margin-left: 10px;
        background: none;
        border: none;

      }
      &.darg_active_left {
        .virtual {
          border-left: 2px dotted #666;
          z-index: 99;
        }
      }
      &.darg_active_right {
        .virtual {
          border-right: 2px dotted #666;
          z-index: 99;
        }
      }
    }
    .thead-cell {
      padding: 0;
      display: inline-flex;
      flex-direction: column;
      align-items:flex-start;
      cursor: pointer;
      overflow: initial;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

      }
    }
    &.w-table_moving {
      .el-table th .thead-cell{
        cursor: move !important;
      }
      .el-table__fixed {
        cursor: not-allowed;
      }
    }
  }

</style>
