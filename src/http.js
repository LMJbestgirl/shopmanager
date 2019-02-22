import axios from 'axios'
const httpServer = {}
httpServer.install = function (Vue) {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

    axios.interceptors.request.use(function (config) {
        if (config.url !== 'login') {
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers["Authorization"] = AUTH_TOKEN;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        const { meta: { msg, status } } = response.data;
        if (status !== 200 && status !== 201) {
            Message.error(msg)
        }
        return response;
    }, function (error) {

        return Promise.reject(error);
    });
    Vue.prototype.$http = axios;

}
export default httpServer