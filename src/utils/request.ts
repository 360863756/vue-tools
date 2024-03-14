import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
const URL = '';
enum RequestEnums {
    TIMEOUT = 20000,
    OVERDUE = 600, // 登录失效
    FAIL = 1, // 请求失败
    SUCCESS = 0 // 请求成功
}
const config = {
    // 默认地址
    baseURL: URL as string,
    // 设置超时时间
    timeout: RequestEnums.TIMEOUT as number,
    // 跨域时候允许携带凭证
    withCredentials: true
};

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);
        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                return {
                    ...config
                };
            },
            (error: AxiosError) => {
                // 请求报错
                Promise.reject(error);
            }
        );
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data, config } = response; // 解构
                if (data.code === RequestEnums.OVERDUE) {
                    return Promise.reject(data);
                }
                if (data.code && data.code !== RequestEnums.SUCCESS) {
                    ElMessage.error(data);
                    return Promise.reject(data);
                }
                return data.data;
            },
            (error: AxiosError) => {
                const { response } = error;
                if (response) {
                    this.handleCode(response.status);
                }
                if (!window.navigator.onLine) {
                    ElMessage.error('网络连接失败');
                }
            }
        );
    }
    handleCode(code: number): void {
        switch (code) {
            case 401:
                ElMessage.error('登录失败，请重新登录');
                break;
            default:
                ElMessage.error('请求失败');
                break;
        }
    }

    // 常用方法封装
    get<T>(url: string, params?: object): Promise<T> {
        return this.service.get(url, { params });
    }
    post<T>(url: string, params?: object): Promise<T> {
        return this.service.post(url, params);
    }
    put<T>(url: string, params?: object): Promise<T> {
        return this.service.put(url, params);
    }
    delete<T>(url: string, params?: object): Promise<T> {
        return this.service.delete(url, { params });
    }
}

export default new RequestHttp(config);