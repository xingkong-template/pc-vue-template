import keyValList from '@/store/modules/keyValList'
export default {
  //日期格式化
  formatDate(date, format) {
    ;
    if (!date) {
      return '';
    }
    let olddate = date;
    if (typeof date === "string") {
      let mts = date.match(/(\/Date\((\d+)\)\/)/);
      if (mts && mts.length >= 3) {
        date = parseInt(mts[2]);
      }
    }
    date = (date + '').replace(/-/g, '/');
    date = new Date(date);

    if (!date || date.toUTCString() == "Invalid Date") {
      if (olddate) {
        date.setTime(olddate);
      }
      if (!date || date.toUTCString() == "Invalid Date") {
        return "";
      }
    }
    let map = {
      "M": date.getMonth() + 1, //月份 
      "d": date.getDate(), //日 
      "h": date.getHours(), //小时 
      "m": date.getMinutes(), //分 
      "s": date.getSeconds(), //秒 
      "q": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };

    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
      let v = map[t];
      if (v !== undefined) {
        if (all.length > 1) {
          v = '0' + v;
          v = v.substr(v.length - 2);
        }
        return v;
      } else if (t === 'y') {
        return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
    });

    return format;
  },
  //金额格式化
  formatNumF(value) {
    if (!value) {
      return '0.00';
    }
    return parseFloat(value).toFixed(2);
  },
  acctNo(value) {
    if (!value) {
      return '';
    }
    if (value.length > 4) {
      return value.substring(value.length - 4, value.length);
    } else {
      return value;
    }

  },
  Tel: function (str) {
    var reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
    return reg.test(str);
  },
  formatMoney(str) {
    if (!str) {
      return '0.00';
    }
    let intVal = parseInt(str);
    let intValList = (intVal + '').split('');
    let strForm = '';
    let num = 0;
    for (let i = intValList.length - 1; i >= 0; i--) {
      num++;
      if (num % 3 == 0) {
        strForm = intValList[i] + ',' + strForm;
      } else {
        strForm = intValList[i] + strForm;
      }
    }
    strForm = strForm + '.' + parseFloat(str).toFixed(2).split('.')[1];
    return strForm;
  },
  NumToCny: function (num) {
    if(!num){
      return '零元整';
    }
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num))
      return "";
    var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
    num += "00";
    var p = num.indexOf('.');
    if (p >= 0)
      num = num.substring(0, p) + num.substr(p + 1, 2);
    unit = unit.substr(unit.length - num.length);
    for (var i = 0; i < num.length; i++)
      str += '零壹贰叁肆伍陆柒捌玖'.charAt(num.charAt(i)) + unit.charAt(i);
    return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
  },
  MoblieBlur:function(str){
    if(str.length==11){
      return str.substring(0,3)+'****'+str.substring(7,11);
    }else{
      return str;
    }
  },
  BankNumber:function(str){
    if (str.length<8) {
      return str;
    }
    let intValList = (str + '').split('');
    let strForm = '';
    let num = 0;
    for (let i = intValList.length - 1; i >= 0; i--) {
      
      if (num % 4 == 0) {
        strForm = intValList[i] + ' ' + strForm;
      } else {
        strForm = intValList[i] + strForm;
      }
      num++;
    }
    return strForm;
  },
  //状态码过滤器
  formatState(value,type) {
    if (!value&&value!=0 || !type || !keyValList.state[type]) {
      return '';
    }
    return keyValList.state[type][value]?keyValList.state[type][value]:'';
  },
}
