import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-dataForm-urlencoded'
  },
  responseType:'json',
  withCredentials: true,
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    let newStr = ''
    for (let item in data){
      newStr += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
    }
    newStr = newStr.slice(0, -1)
    return newStr
  }],
})

// request拦截器
service.interceptors.request.use(
  config => {

    if (store.getters.token) {
     // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(

  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data

    if (res.error!=201) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.error == 403) {
        MessageBox.alert(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
            showClose:false,
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(res)
    } else {
      // let reg=/成功/
      // if(response.data.data==''&&reg.test(response.data.msg)){
      //
      //   Message({
      //     message: response.data.msg,
      //     type: 'success',
      //     duration: 5 * 1000
      //   })
      // }
      return response.data.data || response.data.object
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

function request(params) {
    let reg=/action/
  let isLoad=false
    for(let key in params.data){

      if(reg.test(key)){
        isLoad=true
      }
  }
  return new Promise((res,ref)=>{
    if(isLoad){
      var loadingInstance = Loading.service({ fullscreen: true });
    }

    service(params).then(data=>{
  if(isLoad){
    loadingInstance.close()
  }

      res(data)
    }).catch((e)=>{
      if(isLoad){
        loadingInstance.close()
      }

        ref(e)
    })


  })
}

export default request
