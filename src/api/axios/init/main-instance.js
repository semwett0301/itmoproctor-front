import axios from "axios";
import config from "@/config/axios-config";
import errors from "@/api/axios/init/errors";
const mainInstance = axios.create({
    baseURL: config.baseUrl,
    headers: config.baseHeaders,
    withCredentials: config.withCredentials
})

mainInstance.interceptors.response.use((response) => response, (error => {
    return Promise.reject(errors[error.response.status]())
}))

export default mainInstance;
