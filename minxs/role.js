import {mapGetters} from 'vuex'

export default {
  data(){

    return {


    }
  },

  computed:{
    ...mapGetters(['btnRole'])
  },

  methods:{
    returnIcon(item){
      if(item.roleKey){
        let path=this.$route.path;

        let list=this.btnRole[path]
        for(let value of list ){
          if(value.actionid==item.roleKey){
            return value.iconcls||item.icon
          }
        }

      }
      return item.icon
    },
    authorityJudgment(key){
      if(key){
        let path=this.$route.path;

        let list=this.btnRole[path]

        if(!list){
          return false
        }

        for(let value of list ){
          if(value.actionid==key){
                return true
          }
        }
        return false
      }
      return true
    }
  }


}
