const validate = {
  Email: function (str) {
    const reg = /^([a-zA-Z0-9]|[._])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  },
  Tel: function (str) {
    const reg = /^(0\d{2,3}-\d{7,8})$/;
    return reg.test(str);
  },
  Mobile: function (str) {
    const reg = /^(1[345789]\d{9})$/;
    return reg.test(str);
  },
  IdCard: function (str) {
    const reg = /^\d{17}([0-9]|X|x)$/;
    return reg.test(str);
  },
  BankCard: function (str) {
    const reg = /^(\d)*$/;
    return reg.test(str);
  },
  CreditCode: function (str) {
    const reg = /^([a-zA-Z0-9]{18})*$/;
    return reg.test(str);
  },
  NumD: function (str) {
    const reg = /^\d+(\.\d+)?$/;
    return reg.test(str);
  },
  NumDTwo: function (str) {
    const reg = /^\d+(\.\d{2})?$/;
    return reg.test(str);
  },
  Num: function (str) {
    const reg = /^\d+?$/;
    return reg.test(str);
  },
  Password: function (str) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    return reg.test(str);
  }
}

export default {
  ...validate
}