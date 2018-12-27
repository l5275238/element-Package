/**
 * data-table使用到
 */

const paging={
  data(){
    return {
      res:{
        isLoading:false,
        autoHeight:true,
        name:"list",
        hasAll:false,
        autoAll:false,
        showNum:false,
        showSelect:false,
        drag:false,
        hasPage:true,
        checkModelShow:false,
        allObj:{},
        list:[],
        page:{
          page:1,
          rows:20,
        },
      },

    }
  },
  computed:{
    params(){
      return {}
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
          await this.getListFn(Object.assign(this.res.page,this.params)).then(res=>{

            this.res.list=res.list;
            console.log(this.res.list);
            this.res.page.totalCount=res.total
            if(this.hasAll){
              this.allObj=res
            }

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
