import request from '@/utils/request'

//登录
export function login(params) {
  const data = params
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

//图片验证码
export function captcha() {
  return request({
    url: '/common/captcha',
    method: 'post'
  })
}

//发送短信验证码
export function getSms(params) {
  const data = params
  return request({
    url: '/sms/find_password',
    method: 'post',
    data
  })
}
//验证短信验证码
export function smsVerify(params) {
  const data = params
  return request({
    url: '/sms/verify_find_password',
    method: 'post',
    data
  })
}
//重置密码
export function resetPassword(params) {
  const data = params
  return request({
    url: '/reset_password',
    method: 'post',
    data
  })
}



