
class Variable{
  constructor(){
    if(process.env.NODE_ENV==='development'){
      this.NODE_ENV='test'
    //*开发环境变量  dev
    }
      else if(process.env.NODE_ENV==='text'){
      this.NODE_ENV='text'

    //测试环境变量
    }
    else{
      this.NODE_ENV='pro'
      //*生产环境变量
    }
  }
}
const newVariable=new Variable()
export default newVariable;
