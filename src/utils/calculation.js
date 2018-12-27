// var floatObj = function() {
//
//   /*
//    * 判断obj是否为一个整数
//    */
//   function isInteger(obj) {
//     return Math.floor(obj) === obj
//   }
//
//   /*
//    * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
//    * @param floatNum {number} 小数
//    * @return {object}
//    *   {times:100, num: 314}
//    */
//   function toInteger(floatNum) {
//     var ret = {times: 1, num: 0}
//     var isNegative = floatNum < 0
//     if (isInteger(floatNum)) {
//       ret.num = floatNum
//       return ret
//     }
//     var strfi  = floatNum + ''
//     var dotPos = strfi.indexOf('.')
//     var len    = strfi.substr(dotPos+1).length
//     var times  = Math.pow(10, len)
//     var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
//     ret.times  = times
//     if (isNegative) {
//       intNum = -intNum
//     }
//     ret.num = intNum
//     return ret
//   }
//
//   /*
//    * 核心方法，实现加减乘除运算，确保不丢失精度
//    * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
//    *
//    * @param a {number} 运算数1
//    * @param b {number} 运算数2
//    * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
//    * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
//    *
//    */
//   function operation(a, b, digits, op) {
//
//     let reg=/^\d+(\.[\d]+)?$/
//     if(!reg.test(a)||!reg.test(b)){
//       return ''
//     }
//     var o1 = toInteger(a)
//     var o2 = toInteger(b)
//     var n1 = o1.num
//     var n2 = o2.num
//     var t1 = o1.times
//     var t2 = o2.times
//     var max = t1 > t2 ? t1 : t2
//     var result = null
//     switch (op) {
//       case 'add':
//         if (t1 === t2) { // 两个小数位数相同
//           result = n1 + n2
//         } else if (t1 > t2) { // o1 小数位 大于 o2
//           result = n1 + n2 * (t1 / t2)
//         } else { // o1 小数位 小于 o2
//           result = n1 * (t2 / t1) + n2
//         }
//         return result / max
//       case 'subtract':
//         if (t1 === t2) {
//           result = n1 - n2
//         } else if (t1 > t2) {
//           result = n1 - n2 * (t1 / t2)
//         } else {
//           result = n1 * (t2 / t1) - n2
//         }
//         return result / max
//       case 'multiply':
//         result = (n1 * n2) / (t1 * t2)
//         return result
//       case 'divide':
//         result = (n1 / n2) * (t2 / t1)
//         return result
//     }
//   }
//
//   // 加减乘除的四个接口
//   function add(a, b, digits) {
//     return operation(a, b, digits, 'add')
//   }
//   function subtract(a, b, digits) {
//     return operation(a, b, digits, 'subtract')
//   }
//   function multiply(a, b, digits) {
//     return operation(a, b, digits, 'multiply')
//   }
//   function divide(a, b, digits) {
//     return operation(a, b, digits, 'divide')
//   }
//
//   // exports
//   return {
//     add: add,
//     subtract: subtract,
//     multiply: multiply,
//     divide: divide
//   }
// }();
var float_calculator={
    /**
     * 精确的加法运算
     *
     * @param {Number|String} s1 被加数
     * @param {Number|String} s2 加数
     * @param {String} opt 加号或减号:'+'或'-'
     * @return {Number}
     */
    add : function(s1, s2, opt) {
        if (!opt)
            opt = '+';
        s1 = this.toNumber(s1);
        s2 = this.toNumber(s2);

        if (this.isInt(s1) && this.isInt(s2))
            return eval('s1' + opt + 's2');
        s1 = this.toString(s1);
        s2 = this.toString(s2);

        var m = Math.pow(10, Math.max(this.getDigitsLength(s1), this
            .getDigitsLength(s2)));
        var n1 = this.multiply(s1, m);
        var n2 = this.multiply(s2, m);

        return (!opt || opt == '-') ? this.divide( this.toNumber(n1) - this.toNumber(n2), m) : this.divide( this.toNumber(n1)
            +  this.toNumber(n2), m);
    },
    /**
     * 精确的减法运算
     *
     * @param {Number|String} s1 被减数
     * @param {Number|String} s2 减数
     * @return {Number}
     */
    subtract : function(s1, s2) {
        return this.add(s1, s2, '-');
    },
    _insertString : function(s, ch, pos) {
        return s.substring(0, pos) + ch + s.slice(pos);
    },
    /**
     * 将数字转换为String：支持科学计数法格式的数字
     *
     * @param {Number|String} s
     * @return {String}
     */
    toString : function(s) {
        if (s == null || typeof s == 'undefined')
            return '';
        var n = this.toNumber(s);
        var t = n.toString().toLowerCase();
        if (t.indexOf('e') <= 0)
            return t;

        var sNum = Math.abs(n).toString();
        var dotP = sNum.indexOf('.');
        var eP = sNum.indexOf('e');

        var rNum = sNum.substring(0, eP);
        var power = sNum.slice(eP + 1);
        if (power == '' || power == '+' || power == '-' || this.isZero(power)) {// 如果是零则直接返回
            return (Math.abs(n) != n) ? '-' + rNum : rNum;
        }

        var tempNum = rNum.replace('.', '').replace(/0/g, '');
        var digitLen = dotP < 0 ? 0 : eP - dotP - 1;

        var zero = [];
        var pLen = Math.abs(power);
        if (this.isPlus(power)) {
            for (var i = 0; i < pLen; i++) {
                zero.push('0');
            }
            tempNum = tempNum + zero.join('');
            if (digitLen > 0)
                tempNum = this._insertString(tempNum, '.', tempNum.length
                    - digitLen);
        } else {
            for (var i = 0, len = pLen + digitLen; i < len; i++) {
                zero.push('0');
            }
            tempNum = zero.join('') + tempNum;
            tempNum = this._insertString(tempNum, '.', tempNum.length
                - digitLen - pLen);
        }
        // 去掉两头多余的零
        tempNum = tempNum.replace(/^0+\./g, '0.');
        tempNum = tempNum.replace(/0+$/g, '');
        return (Math.abs(n) != n) ? '-' + tempNum : tempNum;
    },
    /**
     * 精确的乘法运算
     *
     * @param {Number|String} s1 被乘数
     * @param {Number|String} s2 乘数
     * @return {Number}
     */
    multiply : function(s1, s2,blNum=2) {
        s1 = this.toNumber(s1);
        s2 = this.toNumber(s2);
        if (s2 == 0 || s1 == 0)
            return 0;
        if (this.isInt(s1) && this.isInt(s2))
            return s1 * s2;
        if (s1 === 1)
            return s2;
        if (s2 === 1)
            return s1;

        var m = 0;
        s1 = this.toString(s1);
        s2 = this.toString(s2);
        try {
            m += s1.split(".")[1].length;
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        } catch (e) {
        }
        ;
        return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
            / Math.pow(10, m)).toFixed(2);
    },
    /**
     * 精确的除法运算
     *
     * @param {Number|String} s1 被除数
     * @param {Number|String} s2 除数：不能为0或NULL
     * @return {Number}
     */
    divide : function(s1, s2,blNum=2) {
        s1 = this.toNumber(s1);
        s2 = this.toNumber(s2);

        if (s1 == 0)
            return 0;
        if (s2 == 0) {
            return null;//除数不能为零
        }
        s1 = this.toString(s1);
        s2 = this.toString(s2);

        var m1 = this.getDigitsLength(s1);
        var m2 = this.getDigitsLength(s2);
        var n1 = Number(s1.replace('.', ''));
        var n2 = Number(s2.replace('.', ''));
        let num=Number(this.multiply(n1 / n2, Math.pow(10, m2 - m1)))

        return num.toFixed(blNum);



    },
    /**
     * 转换为数字
     *
     * @param {Object} s
     * @return {Number}
     */
    toNumber : function(s) {
        if (!this.isNumber(s))
            return 0;
        if (typeof s == 'string') {
            var f = parseFloat(s.replace(/,/g, ""));
            return isNaN(f) ? 0 : f;
        } else {
            return Number(s);
        }
    },
    /**
     * 转换为整数。 注意：浮点数字的舍入依据参数mode的值。
     *
     * @param {Number|String} s
     * @param {Int} mode 浮点数的舍入模式（缺省=0），取值范围：0=四舍五入；1=全入；2=全舍
     * @return {Int} 整数
     */
    toInt : function(s, mode) {
        if (this.isInt(s))
            return s;
        if (!mode)
            mode = 0;

        switch (mode) {
            case 0:
                return Math.round(this.toNumber(s));
                break;
            case 1:
                return Math.ceil(this.toNumber(s));
                break;
            case 2:
                return Math.floor(this.toNumber(s));
                break;
        }
    },
    /**
     * 是否是数字
     *
     * @param {Number|String} s
     * @return {Boolean}
     */
    isNumber : function(s) {
        if (s == null || typeof s == 'undefined')
            return false;
        if (typeof s == 'number') {
            return true;
        } else if (typeof s == 'string') {
            if (s.toLowerCase().indexOf('e') >= 0)
                return !isNaN(s);

            var n = s.replace(/,/g, "");
            return (!n || isNaN(n)) ? false : true;
        }
        return false;
    },
    /**
     * 是否是浮点数
     *
     * @param {Number|String} s
     * @return {Boolean}
     */
    isFloat : function(s) {
        if (!this.isNumber(s))
            return false;

        s = s.toString();
        var f = s.replace(/,/g, "");
        if (f.indexOf('.') >= 0)
            return true;
        return false;
    },
    /**
     * 是否是整数
     *
     * @param {Number|String} s
     * @return {Boolean}
     */
    isInt : function(s) {
        if (!this.isNumber(s))
            return false;
        return !this.isFloat(s);
    },
    /**
     * 是否是零
     *
     * @param {Number|String} s
     * @return {Boolean}
     */
    isZero : function(s) {
        if (!this.isNumber(s))
            return false;
        return parseFloat(s) == 0;
    },
    /**
     * 是否是负数（零不是负数）
     *
     * @param {Number|String} s
     * @return {Boolean}
     */
    isNegative : function(s) {
        if (!this.isNumber(s))
            return false;
        var n = this.toNumber(s);
        return !this.isZero(s) && Math.abs(n) != n;
    },
    /**
     * 是否是正数（零不是正数）
     *
     * @param {Number|String} s
     * @return {Boolean}
     */
    isPlus : function(s) {
        if (!this.isNumber(s))
            return false;
        var n = this.toNumber(s);
        return !this.isZero(s) && Math.abs(n) == n;
    },
    /**
     * 取反数
     *
     * @param {Number|String} s
     * @return {Number}
     */
    reverseValue : function(s) {
        if (!this.isNumber(s))
            return 0;

        if (this.isNegative(s)) {
            return this.toNumber(s.toStirng().slice(1));
        }
        ;

        return this.toNumber('-' + s);
    },
    /**
     * 取绝对值
     *
     * @param {Number|String} s
     * @return {Number}
     */
    absValue : function(s) {
        if (!this.isNumber(s))
            return 0;
        return Math.abs(s);
    },
    /**
     * 取小数长度
     *
     * @param {Number|String} s
     * @return {Int}
     */
    getDigitsLength : function(s) {
        if (!this.isNumber(s))
            return 0;
        if (this.isInt(s))
            return 0;

        s = s.toString();
        var d = s.split('.')[1];
        return d ? d.toString().length : 0;
    },
    /**
     * 取整数位长度
     *
     * @param {Number|String} s
     * @return {Int}
     */
    getIntegersLength : function(s) {
        var arr = s?s.split("."):'';
        s = arr[0];
        s=s.replace(/,/g,'');
        if (!this.isNumber(s))
            return 0;
        return this.toInt(s).toString().length;
    },
    /**
     * 四舍五入
     *
     * @param {Number|String} s
     * @param {Int} digit 保留小数位数
     * @return {Number}
     */
    round : function(s, digit) {
        if (!this.isNumber(s))
            return 0;
        var n = this.toNumber(s);
        if (this.isInt(n))
            return n;
        // 	return n+".00";

        if (!digit) {
            digit = 0;
        } else if (!this.isInt(digit) || digit < 0) {
            digit = 3;
        }
        return this.toNumber(n.toFixed(digit));
    },
    /**
     * 格式化浮点数，小数位自动补0（为文本）
     *
     * @param {Number|String} s
     * @param {Int} digit 保留小数位数
     * @return {String}
     *	example:formatterDigit(1.125,2); return '1.13'
     *	example:formatterDigit(1.1,2); return '1.10'
     */
    formatterDigit:function(s, digit){
        var sNum=this.round(s,digit);
        var iLen=this.getDigitsLength(sNum);
        if(sNum>0&&iLen<digit){
            var len=digit-iLen;
            for(var i=0;i<len;i++){
                sNum+=(i==0&&iLen==0)?'.0':'0';
            }
        }
        return sNum;
    },
    /**
     * 格式化金额数字（为文本）
     *
     * @param {Number|String} s
     * @param {String} pattern 格式:"#,###.###"
     * @return {String}
     */
    formatMoney : function(s, pattern) {
        if (!this.isNumber(s))
            return '0';
        if (!pattern)
            pattern = '#,###.###';
        var p = pattern.split('.');
        var digit = parseInt(p[1].length);

        var sNum = this.round(s, digit).toString();
        if (p[0].indexOf(',') > 0) {
            var isNeg = false;
            if (this.isNegative(sNum)) {
                isNeg = true;
                sNum = sNum.slice(1);
            }

            var iLen = (this.isFloat(sNum)) ? sNum.indexOf('.') : sNum.length;
            if (iLen <= digit)
                return sNum;
            var arr = [];
            var pos1 = 0;
            var pos2 = iLen % 3;
            while (pos2 <= sNum.length) {
                var sSlice = sNum.slice(pos1, pos2);
                if (sSlice)
                    arr[arr.length] = sSlice;

                pos1 = pos2;
                if (pos2 == (iLen - 3)) {
                    pos2 = sNum.length;
                } else {
                    pos2 += 3;
                }
            }
            return ((isNeg) ? '-' : '') + arr.join(',');
        }
        return sNum;
    },
    /**
     * 使用"+-*\"操作符，作两数运算
     *
     * @param {Number|String} v1
     * @param {String} opt 操作符："+-*／"
     * @param {Number|String} v2
     * @return {Number}
     */
    calc : function(v1, opt, v2) {
        var rst = null;
        switch (opt) {
            case '+':
                rst = this.add(v1, v2);
                break;
            case '-':
                rst = this.subtract(v1, v2);
                break;
            case '*':
                rst = this.multiply(v1, v2);
                break;
            case '／':
                rst = this.divide(v1, v2);
                break;
        }
        return rst;
    },
    /**
     * 按照输入顺序，简单作"+-*／"四则运算 例如：NumberUtil.arth(v1, "+", v2, "-", v1, "-", v2);
     *
     * @return {Number}
     */
    arth : function() {
        if (arguments == null || arguments.length <= 0)
            return null;

        var result = null;
        for (var i = 1; i < arguments.length; i = i + 2) {
            if (i == 1) {
                result = this.calc(arguments[i - 1], arguments[i],
                    arguments[i + 1]);
            } else {
                result = this.calc(result, arguments[i], arguments[i + 1]);
            }
        }

        return result;
    }


}


export default float_calculator
