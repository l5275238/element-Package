<!--
2018-10-15 王哲
新增el-input
    type：输入框类型 可选值：text，textarea 和其他 原生 input 的 type 值  默认值为text
**********************
2018-10-15徐莹
新增formSet：表单样式设置信息{}
    isFilterBar：是否是筛选栏
**********************
该公用组件包含以下自定义参数
form:表单数据对象即mode,JSON对象{}
vform: 表单内组件信息，数组形式[]
      可自定义参数
      name:即表单label
      key:即表单prop，为model里传入的参数名
      render:默认不传为input输入框，如需其它组件需通过此参数自定义，具体可查看ww里的表单用法（该用法是根据这个封装）
--->
<template>
  <div class="vForm">
  <el-form  :model="form" :rules="rules" ref="ruleForm" :inline="true" size="mini"  >
    <el-form-item :style="{width:formSet.isFilterBar?'':item.itemWidth||'50%',marginRight:0}"
                  :label="item.name"
                  :label-width="formSet.isFilterBar?item.width||'80px':formSet.width||'140px'"
                  :prop="item.key"
                  :key="item.key"
                  v-for="item in vform"
                  v-if="!hidenShow(item.isHidden)">
      <el-input v-model="form[item.key]"
                :type="item.type"
                v-if="!item.render"
                style="width: 100%"  size="mini"
                :disabled="hidenShow(item.disabled)"
                @change="change(item)"
                :maxlength="item.maxlength"
                :minlenght="item.minlength"
                >
      </el-input>
      <render v-else :render="item.render"  :params="form" style="width: 100%"></render>
    </el-form-item>
  </el-form>
  <div class="subBtn" v-if="formSet.submitShow">
      <el-button type="primary" @click="onSubmit">保存</el-button>

    </div>
  </div>
</template>

<script>
  import check from './check'
  import type from  '../../utils/type'
  import render from './render'
    export default {
      name: "vForm",
      props:{
        form:{
          type:Object,
          default:function () {
            return{}
          }
        },
        /*isSeach:{
          type:Boolean,
          default:function () {
            return false
          }
        },*/
        vform:{
          type:Array,
          default:function () {
            return []
          }
        },
        formSet:{/* 新加--xuying*/
          type:Object,
          default:function(){
            return{
              isFilterBar:false,
              isSeach:false,
              isExport:false,
              isImport:false,
              submitShow:true
            }
          }
        }
      },
      components:{
        render
      },
      watch:{
        form:function () {

        }
      },
      data(){
        return{

        }
      },
      methods:{
        autoWidth(name){
          name =name.replace(/(^\s*)|(\s*$)/g, "")
          return name.length*20+'px'

        },
        resetField(){
          this.$refs.ruleForm.resetFields()
        },
        clearValidate(arr){//移除某个表单项的校验结果  ,传入待移除的表单项key 例['customer_name']
          if(type.isString(arr)){
            this.$refs.ruleForm.clearValidate([arr]);

          }
         else if(type.isArray(arr)){
            this.$refs.ruleForm.clearValidate(arr);
          }
          else {
            console.error('请输入字符串或者数组')
          }


        },
        change(item){

          if(typeof item.change=='function'){

            item.change(this.form[item.key],item)
          }
        },
        hidenShow(isHidden){
          if(typeof isHidden=='function'){
           return isHidden()
          }
          else {
            return isHidden
          }
        },
        onSubmit:function () {
          return new Promise((res,ref)=>{

            this.$refs.ruleForm.validate((valid) => {
              if (valid) {
                this.$emit('subMit',this.form)
                res(this.form)
              } else {
                this.$message.error('输入有误');
                return false;
              }
            });
          })


        },



      },
      computed:{
        rules:function () {
          let obj={}
          for (let value of this.vform){


           let required = false;
            if(!value.validator||this.hidenShow(value.disabled)){
              continue
            }

            if(value.validator.indexOf('isNotEmpty')!=-1)
              required = true;
            if(type.isString(value.validator[0])){

              obj[value.key]=[
                 {
                   validator:check(value.validator,value.name,value),
                   trigger:value.trigger|'blur',
                   required:required

                 }
               ]
            }
            else {
               obj[value.key]=value.validator.map(item=>{

                 if(type.isFunc(item)){
                   var validator=item
                 }
                 if(type.isArray(item)){

                   var validator=check(item,value.name,value)
                 }
                 return {
                   validator:validator,
                   trigger:'change',
                   required:required
                 }
               })
            }


          }
          return obj
        }
      }
    }
</script>

<style scoped>
  .subBtn{
    text-align: center;
    width: 100%;
  }


</style>
<style lang="less">
  /*.el-form--inline .el-form-item{*/
    /*margin: 0;*/
  /*}*/
  .vForm{
    .el-form{
      display: flex;
      width: 100%;
      flex-wrap: wrap;

    }
    .el-form--inline .el-form-item{
      display: flex;

    }
    .el-form--inline .el-form-item__content{

      display: flex;
      flex: 1;
      >div{
        width: 100%;
        display: block;
        >div{
          width: 100%;
        }
      }
    }
  }

</style>
