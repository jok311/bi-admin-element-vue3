import axios from 'axios'
import router from '../router/index.js'
import {useNotify} from 'element3'
let notify = useNotify()

// import store from '@/store'

import Cookies from 'js-cookie'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 120000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  config.headers['Authorization'] =  `Bearer ${Cookies.get('Authorization')}`
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  (response) => {


    // if( response.data.code != 0 ) {
    //   Message({
    //     message: response.data.msg,
    //     type: 'error',
    //     duration: 3000
    //   })      
    //   return
    // }
    
    return response.data;

  },
  error => {
    console.log('err' + error) // for debug
    const data = error.response.data
    //401状态吗，token过期
    if (data.code == '401' ) {
      notify.error({
        title: '登录过期',
        message: '请重新登录'
      });      
      Cookies.remove('Authorization');
      router.push("/login")
    }    
    return Promise.reject(data)
  })


  export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  }
  
  export function get(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url,data)
        .then( response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
    })
  }

  export function getRequest(url, params) {
    return service({
      url: url,
      method: 'get',
      params
    })
  }
  
  export function postRequest(url, data) {
    return service({
      url: url,
      method: 'post',
      data
    })
  }  

export default service