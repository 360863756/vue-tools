import axios from "axios";

const service = axios.create({
    timeout: 4000
})

service.interceptors.request.use(config=>config,error=>Promise.reject(error))

service.interceptors.response.use(response=>{
    const res= response.data

    return res
},error=>Promise.reject(error))

export default service