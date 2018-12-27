<template>
  <div class="form">
    <v-form :form="form" :vform="vForm" :formSet="formSet" @subMit="subMit">

    </v-form>
  </div>
</template>

<script>
    export default {
        name: "dataForm",
      methods:{
        subMit(res){

        }
      },
        data(){
          return {
            form:{},
            formSet:{
              isFilterBar:false,
              isSeach:false,
              isExport:false,
              isImport:false,
              submitShow:true
            },
            vForm:[

              {
                key:"name",

                trigger:'blur',

                name:"姓名",
                width:'80px',
                validator:['isNotEmpty','*maxLengh?5'],


              },
              {
                key:"tel",

                trigger:'blur',

                name:"电话",
                width:'80px',
                validator:['isNotEmpty','isTel'],


              },
              {
                key:"num",

                trigger:'blur',

                name:"数量",
                width:'80px',
                validator:['isNotEmpty','isNumber','*maxNum?5'],


              },
              {
                key:"money",

                trigger:'blur',

                name:"金额",
                width:'80px',
                validator:['isNotEmpty','isNumber'],

              },
              {
                key:"customize",

                trigger:'blur',

                name:"我是自定义的哦",
                width:'80px',
                render:(h,params)=>{

                  return h('el-checkbox',{
                    props:{
                        value:this.form.customize
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
  .form{
    width: 800px;
    margin: 0 auto;
    padding: 10px;
  }

</style>

