/**
 * data-table使用到
 */

const paging={
  data(){
    return {
      res:{
        isLoading:false,
        list:[],
        page:{
          page:1,
          rows:10,
        },
      },

    }
  },
  created(){
  this._getList()
  },
  methods: {
    _getList(){
      if(typeof this.getList ==='function'){
        this.getList()
      }

    },
   async getList(){
      if(typeof this.getListFn==='function'){
        this.res.isLoading=true
        try {
          await this.getListFn(...this.params).then(res=>{
            this.res.list=res.rows;
            this.res.page.totalCount=res.total

          })
        }
        catch (e) {
          console.log(e)
        }


        this.res.isLoading=false
      }

    },
    _refresh(){
      if(typeof this.getList ==='function'){
        this.getList()
      }
    },
    _select(item){
      this.res.page=item
      if(typeof this.getList ==='function'){
        this.getList()
      }
    }
  },


}
export default paging
