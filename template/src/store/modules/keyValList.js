const keyValList = {
  state: {
    //借款状态
    borrowStatus: {
      REVIEWING: "审核中",
      TRANSFERING: "打款中",
      TRANSFERRED: "已经打款/待还款",
      CLOSED: "关闭",
      FINISHED: "已结清"
    },
    //借款审核状态
    reviewStatus: {
      FKREVIEWING: "风控审核中",
      FKREVIEWFAIL: "风控审核不通过",
      THIRDREVIEWING: "三方商户审核中",
      THIRDREVIEWED: "商户审核通过(已放款)",
      THIRDREVIEWFAIL: "三方商户审核失败"
    },
    //CPA认证状态
    cpaAuthStatus: {
      INIT: "初始化",
      PUSHING: "推送中",
      PUSHFAIL: "推送失败",
      PUSHSUCCESS: "推送成功即审核中",
      VERIFYPASS: "认证通过",
      VERIFYREJECT: "认证拒绝"
    },
    //还款方式
    repaymentMethods: {
      ACPI: "等额本息",
      AC: "等额本金",
      AINI: "等本等息"
    },
    credstatus: {
      '1': '待充值',
      '2': '充值成功',
      '3': '已关闭',
    },
    cycleUnit:{
      MONTH: "月",
      DAY: "天"
    },
    paySource: {
      '1': '商户',
      '2': '管理员',
    },
    balanceTypes: {
      '1': '充值',
      '2': '消费'
    },
    //产品状态
    productStatus: {
      Y: "正常",
      N: "冻结"
    },
    //合作模式
    cooperationModel: {
      WHOLE: "全流程",
      H5: "h5模式"
    },
    //当期还款状态
    periodStatus: {
      AWAIT_REPAY:  "待还款",
      REPAYING: "还款中",
      PART_REPAY: "部分还款",
      FINISHED: "已还清"
    },
    //是否允许提前结清
    earlySettlement: {
      Y: "允许",
      N: "不允许"
    },
    //支付通道
    payRoute: {
      CHANGJIE: "畅捷(绿由)"
    }
  }
}

export default keyValList
