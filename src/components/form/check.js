import {messges,validate} from './validate'
export default function check(rules,name,item) {

  return function (a, value, callback) {


    for(let rule of  rules){
      if(rule[0]=="*"){
        let arr=rule.replace('*','')
        let key= arr.split('?')
        let fn=validate[key[0]](value,key[1],this.error);
        let messgeKey=key[1]
        if(!fn){
          item.isSucces=false

          callback(new Error(messges[key[0]].replace(/\w*(\{messge\})\w*/,name).replace(/(\{key\})/,messgeKey)))
        }

      }
      else {
        try {
          if(!validate[rule](value)){
            item.isSucces=false
            callback(new Error(messges[rule].replace(/\w*(\{messge\})\w*/,name)))
            return
          }
        }
        catch (e) {
          continue
        }

      }

    }
    item.isSucces=true
    callback();

  }

}

