import axios from 'axios';
import router from '../router/index';
import { Toast } from 'vant';
import store from '../store/index';
// import { Message } from 'element-ui';

axios.defaults.timeout = 100000;
axios.defaults.baseURL ='';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data);
    // config.headers = {
    //   'Content-Type':'application/x-www-form-urlencoded'
    // }
    // if(token){
    //   config.params = {'token':token}
    // }
    // if(!window.sessionStorage.getItem('uid')){
    //   router.push({
    //     path:"/login",
    //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    //   })
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.result ==2){
      window.sessionStorage.setItem("uid","");
      store.commit("setuid","");
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

export function get(url={},data = {}){
  return new Promise((resolve,reject) => {
   // console.log(this) 
   //  axios.post(url,data)
    axios.get('service?json='+JSON.stringify(url),{})
         .then(response => {
           if(response.data.result==2){
             Toast.clear();
             return;
           }
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url={},data = {}){
   return new Promise((resolve,reject) => {
    // console.log(this)
    //  axios.post(url,data)
     axios.post('service?json='+JSON.stringify(url),{})
          .then(response => {
            if(response.data.result==2){
              Toast.clear();
              return;
            }
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post1(url,data = {}){
  
 let config = {
  headers: {
     'Content-Type': 'multipart/form-data'
  }
}
  return new Promise((resolve,reject) => {
    axios.post(url,data,config)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         }).catch((err)=>{
           console.log(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}