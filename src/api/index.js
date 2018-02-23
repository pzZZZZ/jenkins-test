import axios from 'axios'
import Qs from 'qs'
//post请求需用QS序列化处理

let axiosIns = axios.create({});

if (process.env.NODE_ENV == 'development') {
    axiosIns.defaults.baseURL = 'development';
} else if (process.env.NODE_ENV == '233') {
    axiosIns.defaults.baseURL = '233';
} else if (process.env.NODE_ENV == '226') {
    axiosIns.defaults.baseURL = '226';
} else if (process.env.NODE_ENV == 'production') {
    axiosIns.defaults.baseURL = 'production';
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
        url: "http://172.16.211.61:8000/WebView/GetQuestionById",
        data: Qs.stringify(params)
    })

}
export default axiosIns