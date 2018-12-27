<template>
  <el-dialog
    :title="title"
    :visible.sync="value"
    :width="width"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :append-to-body="model">
    <div style="width: 100%">
      <slot ></slot>
    </div>

    <span slot="footer" class="dialog-footer" v-if="isReset||isCancel||isOk">
    <el-button @click="reset" v-if="isReset">重置</el-button>
        <el-button @click="onCancel" v-if="isCancel">取消</el-button>
    <el-button type="primary" @click="submit" v-if="isOk">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>

  export default {
    name: "model",
    data() {
      return {
        dialogVisible: false,



      }

    },
    props:{
      value:{
        type:Boolean,
        default(){
          return false
        }
      },
      width:{
        type:String,
        default(){
          return "80%"
        }
      },
      title:{
        type:String,
        default(){
          return "提示"
        }
      },
      isOk:{
        type:Boolean,
        default(){
          return true
        }
      },
      isReset:{
        type:Boolean,
        default(){
          return true
        }
      },
      isCancel:{
        type:Boolean,
        default(){
          return false
        }
      },
      model:{
        //遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
        //适用于model内嵌套model
        type:Boolean,
        default(){
          return true
        }
      },
      showTip:{ // 点右上角叉时，是否弹出确认关闭提示，默认弹出
        type:Boolean,
        default(){
          return false
        }
      },
    },
    methods: {
      handleClose(done) {
        if(this.showTip){
          this.$confirm('确认关闭？')
            .then(_ => {
              this.$emit('handleClose',done)
              // this.$emit('input',false)

            })
            .catch(_ => {});
        }else {

          this.$emit('handleClose',done)
        }

      },
      reset(){
        this.$emit('reset')
      },
      onCancel(){
        // this.$emit('input',false);


          this.$confirm('确认关闭？')
            .then(_ => {

              this.$emit('handleClose')
              // this.$emit('input',false)

            })
            .catch(_ => {


            });


      },
      submit(){
        this.$emit('submit')
      },
      no(){
          this.$emit('input',false)
      }
    }
  }
</script>

<style >
  .el-dialog__body{
    padding: 10px 20px;
  }

</style>
