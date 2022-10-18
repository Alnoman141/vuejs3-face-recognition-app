import axios from 'axios'
import store from '@/store'
// create an axios instance
const service = axios.create({
  baseURL: "http://localhost:3001/api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.state.userStore.token) {
      // let each request carry token
      config.headers['Access-Control-Allow-Headers'] = '*',
      config.headers['Access-Control-Allow-Origin'] = '*',
      config.headers['Accept'] = 'application/json',
      config.headers['Content-Type'] = 'application/json'
    } else {
      return config
    }
    return {
      ...config,
      cancelToken: axios.CancelToken((cancel) => cancel('Cancel repeated request'))
    }
  },
  error => {
    // do something with request error
    console.log('error', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async response => {
    const res = response.data
    // if the custom status_code is not 200, it is judged as an error.
    if (res.status_code !== 200) {
      if (res.status_code === 508 || res.status_code === 512 || res.status_code === 514 || res.status_code === 401) {
        // to re-login
        console.log('login error')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  async error => {
    
    return Promise.reject(error)
  }
)

export default service