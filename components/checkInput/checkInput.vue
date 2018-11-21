<template>
  <div class="checkInput">
  <el-input :value="value"  placeholder="请输入内容" @blur="changeFoucus" @change="change" @focus="checkFocus" :class="erro?'erroInput':''" ></el-input>
    <el-tooltip class="item" effect="dark" :content="title" placement="top-start" v-if="erro">
      <i class="el-icon-warning" style="color: red"></i>
    </el-tooltip>

  </div>
</template>

<script>
  import {messges,validate} from '../form/validate'
  export default {
    name: 'checkInput',
    data(){
      return {
        title:"",
        erro:false,
        elemtValue:""
      }
    },
watch:{
  value(n){
    this.ruleFn(n)
  }
},
    props:{
      value:{

      },
      validator:{
        default(){
         return []
        },

      },
      name:{
        default(){
          return "姓名"
        }
      }

    },
    created(){
      this.ruleFn(this.value)
    },
    methods:{
      checkFocus(){
        this.erro=false
      },
      blur(){
        // this.$refs.chekInput.focus()
        console.log(this)

        // return  this.ruleFn(this.$refs.chekInput.$el)
      },
      focus(){
        this.$refs.chekInput.focus()
      },
      changeFoucus(e){
        let value =e.target.value;

        this.ruleFn(value)

        this.$emit('input',value)
        this.$emit('change',value)

      },
      change(value){
        this.ruleFn(value)
          this.$emit('input',value)
          this.$emit('change',value)

      },
      ruleFn(value){

          let rules=this.validator;
          let name=this.name;
            for(let rule of  rules){
              if(rule[0]=="*"){
                let arr=rule.replace('*','')
                let key= arr.split('?')
                let fn=validate[key[0]](value,key[1],this.error);
                let messgeKey=key[1]
                if(!fn){
                  this.erro=true
                this.title=messges[rule].replace(/\w*(\{messge\})\w*/,name)
                  return false
                }

              }
              else {
                if(!validate[rule](value)){

                  this.erro=true
                    this.title=messges[rule].replace(/\w*(\{messge\})\w*/,name)
                  return false
                }
              }

            }

        this.erro=false

        return true





      }
    }
  }
</script>

<style  lang="less">
  .checkInput{
    width: 100%;
    position: relative;
    i{
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
    .erroInput{

      >.el-input__inner{
      border-color: red;
      }
    }
  }

</style>
