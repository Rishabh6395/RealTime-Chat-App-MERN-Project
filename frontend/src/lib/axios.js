import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://loaclhost:5001/api",
    withCredentials: true,
})