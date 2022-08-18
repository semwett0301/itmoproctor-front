import axios from "axios";
import config from "/config/axios-config";
const instance = axios.create({
    baseURL: config.baseUrl,
    headers: config.baseHeaders,
    withCredentials: config.withCredentials
})

export default instance;
