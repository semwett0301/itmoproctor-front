import axios from "axios";
import config from "/config/axios-config";
const mainInstance = axios.create({
    baseURL: config.baseUrl,
    headers: config.baseHeaders,
    withCredentials: config.withCredentials
})

export default mainInstance;
