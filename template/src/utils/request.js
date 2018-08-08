import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = getToken()
  }
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  (error) => {
    if(error.response==undefined){
      Message({
        message: '网络异常',
        type: 'error',
        duration: 5 * 1000
      })
    }else if (error.response.status == 401) {
      if (router.currentRoute.fullPath != '/') {
        store.dispatch('FedLogOut').then(() => {
          router.replace({
            name: 'login',
            query: { redirect: (router.currentRoute.fullPath && router.currentRoute.fullPath != undefined ? router.currentRoute.fullPath : '') }
          })
        })
      }


      return Promise.reject(error);
    }
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  })


var formatUrl = (url, data) => {
  if (!data) return url;
  if (typeof (data) === "string") {
    return url + data;
  }
  if (typeof (data) === "object") {
    for (var key in data) {
      var value = data[key];
      if (value === null) continue;
      var mark = "{" + key + "}";
      if (url.indexOf(mark) === -1) continue;
      url = url.replace(mark, value);
    };
    return url;
  }
  return url;
};
var request = (resource, query, data, method) => {
  resource = formatUrl(resource, query);
  return service({
    url: resource,
    method: method,
    data,
    params: query
  });
};
service.get = (resource, query) => {
  return request(resource, query, null, "get");
}
service.post = (resource, data, query) => {
  return request(resource, query, data, "post");
}
service.put = (resource, data, query) => {
  return request(resource, query, data, "put");
}

export default service
