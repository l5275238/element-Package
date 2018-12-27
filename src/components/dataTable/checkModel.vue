<template>
    <model v-model="value" title="筛选表头" :isReset="false" @submit="submit" @handleClose="submit" :showTip="false">
      <div class="checkList">

        <el-checkbox v-model="item.isShow" v-for="(item,index) in columns " :key="index" v-if="!item.fixed">{{item.label}}</el-checkbox>

      </div>

    </model>
</template>

<script>
  export default {
    name: 'checkModel',
    methods:{
      submit(){
        this.$emit('add',this.columns)
        this.$emit('input',false)
      }
    },
    props:{
      columns:{
          type:Array,
        default(){
            return []
        }
      },
      value:{
        default(){
          return true
        }
      }
    }
  }
</script>

<style scoped lang="less">
.checkList{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  >label{
    margin: 0;
    padding:10px 20px;
  }
}
</style>
