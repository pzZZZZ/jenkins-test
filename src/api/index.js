import axios from 'axios'
import Qs from 'qs'
//post请求需用QS序列化处理

let axiosIns = axios.create({});
let env = process.env.NODE_ENV
//根据process.env.NODE_ENV配置不同的BaseUrl
if (process.env.NODE_ENV == 'development') {
    axiosIns.defaults.baseURL = 'http://development'
} else if (process.env.NODE_ENV == 233) {
    axiosIns.defaults.baseURL = 'http://233.miscom'
} else if (process.env.NODE_ENV == 226) {
    axiosIns.defaults.baseURL = 'http://226.miscom'
} else if (process.env.NODE_ENV == 'production') {
    axiosIns.defaults.baseURL = 'http://production'
}

export function getUser(params) {
    return axiosIns({
        method: 'post',
        url: 'http://mock.mistong.cn/mock/59bf74a3809bb814a342412a/example/upload',
        data: params
    })
}
export function getDefault(params) {
    return axiosIns({
        method: 'get',
        url: "http://mock.mistong.cn/mock/59bf74a3809bb814a342412a/example/default",
        params: params
    })
}
export function get360(params) {
    return axiosIns({
        method: 'post',
        url: "/WebView/GetQuestionById",
        data: Qs.stringify(params)
    })

}
// export default axiosIns