
import floatObj from '@/utils/calculation'
var   gettype=Object.prototype.toString
  var  isEmpty =function (str){

    if(gettype.call(str)!='[object String]') return true;
    return str.length <= 0;
  }
  //正则判定
  var _validateByReg = function (str,sRegexp){
    if(gettype.call(str)=='[object Number]'){
      str+="";
    }

    str = str?str.trim():'';

    if(isEmpty(str)) return true;
    if(str && (new RegExp (sRegexp) ) && (new RegExp (sRegexp)).test(str)) return true ;
    return false;
  };

export  let validate= {
    /**
     * 是否不为空
     * @param {String} str
     * @return {Boolean}
     */
    isNotEmpty :function (str){
      if(gettype.call(str)=='[object Number]'){
        str+="";
      }

      if(gettype.call(str)!='[object String]') return false;
      return str.length > 0;
    },
    /**
     * 是否为空
     * @param {String} str
     * @return {Boolean}
     */
    isEmpty:isEmpty,

    isTel:function (str) {
      return _validateByReg(str,/^[1][3,4,5,7,8,6,9][0-9]{9}$/)
    },

    isEmai:function (str) {
      return _validateByReg(str,/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
    },
    isNumber:function(str){
      return  _validateByReg(str,/^\d+([\.]\d+)*$/)
    },
    isOnlyNumber:function(str){
      return _validateByReg(str,/^[1-9]+[0-9]*$/)
    },
    isInteger:function(str){
      return _validateByReg(str,/^\d*/)
    },
    minLengh:function(str,lenght){//*minlenth?7
      return str.length>lenght;
    },
    maxNum:function(str,num) {
      return floatObj.subtract(str,num)<=0

    },
    xiaoShuLenght:function(str,lenght){
      let arr = str.split('.')
      if(!arr[1]||arr[1].length<=parseInt(lenght)){
        return true
      }
      return false
    },
    maxLengh:function(str,lenght){//*maxLengh?7
      if(str && str.length){
        str=str.replace('.','');
        return str.length<=parseInt(lenght);
      }
      return true
    },

  }
 export let messges={
    isNotEmpty:'请输入{messge}',
    isTel:"请输入正确的手机号码",
    isEmai:"请输入正确的邮箱",
    ajax:"{messge}已存在",
    minLengh:"{messge}最小长度为{key}",
    isNumber:"请输入数字",
   maxNum:"{messge}最大不可超过{key}",
   isOnlyNumber:"请输入不为0的整数",
   maxLengh:"{messge}最大长度为{key}",
   isInteger:"请输入整数",
   xiaoShuLenght:"小点后最多{key}位",
 }
