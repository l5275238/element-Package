var   gettype=Object.prototype.toString

var    utility={

  isObj:function(o){

    return    gettype.call(o)=="[object Object]";

  },
  isFunc:function(o){
    return    gettype.call(o)=="[object Function]";
  },

  isArray:function(o){

    return    gettype.call(o)=="[object Array]";

  },
  isString:function(o){
    return    gettype.call(o)=="[object String]";
  },
  isNumber:function(o){
    return    gettype.call(o)=="[object Number]";
  },

  isNULL:function(o){

    return    gettype.call(o)=="[object Null]";

  },

  // isDocument:function(){
  //
  //   return    gettype.call(o)=="[object Document]"|| [object HTMLDocument];
  //
  // }
  //


}

export default utility;
