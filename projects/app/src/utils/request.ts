import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { message } from 'antd';

// 定义接口类型
export interface ConfigType extends AxiosRequestConfig {
  showErrorMessage?: boolean; // 是否显示错误信息
  skipTokenCheck?: boolean; // 是否跳过token检查
}

// 定义响应数据类型
export interface ResponseDataType {
  code: number;
  message: string;
  data: any;
  success: boolean;
}

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 如果不需要跳过token检查，则添加token
    const customConfig = config as any;
    if (!customConfig.skipTokenCheck) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 请求成功，判断业务状态码
    const res = response.data;

    // 如果后端约定返回格式为 { code, data, message, success }
    if (res.code !== undefined) {
      if (res.code === 200 || res.success) {
        return res;
      } else {
        // 业务逻辑错误
        showErrorMessage(res.message || '请求失败');
        return Promise.reject(new Error(res.message || '请求失败'));
      }
    }

    // 如果后端没有约定特定格式，直接返回数据
    return res;
  },
  (error: AxiosError) => {
    const { response } = error;
    // 根据HTTP状态码处理不同的错误
    if (response) {
      const status = response.status;
      let errorMsg = '未知错误';

      switch (status) {
        case 400:
          errorMsg = '请求错误(400)';
          break;
        case 401:
          errorMsg = '未授权，请重新登录(401)';
          handleUnauthorized();
          break;
        case 403:
          errorMsg = '拒绝访问(403)';
          handleUnauthorized();
          break;
        case 404:
          errorMsg = '请求资源不存在(404)';
          break;
        case 500:
          errorMsg = '服务器错误(500)';
          break;
        default:
          errorMsg = `连接出错(${status})!`;
      }

      // 显示错误消息
      showErrorMessage(errorMsg);
    } else {
      // 处理网络错误或请求被取消的情况
      if (error.message?.includes('timeout')) {
        showErrorMessage('请求超时！');
      } else {
        showErrorMessage('网络连接异常！');
      }
    }
    return Promise.reject(error);
  }
);

// 处理未授权错误（401/403）
const handleUnauthorized = () => {
  if (typeof window !== 'undefined') {
    // 清除本地存储的登录信息
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');

    // 跳转到登录页
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  }
};

// 显示错误信息
const showErrorMessage = (msg: string) => {
  message.error(msg);
};

// 封装请求方法
const request = {
  // GET 请求
  get<T = any>(
    url: string,
    params?: any,
    config?: ConfigType
  ): Promise<ResponseDataType & { data: T }> {
    return instance.get(url, { params, ...config });
  },

  // POST 请求
  post<T = any>(
    url: string,
    data?: any,
    config?: ConfigType
  ): Promise<ResponseDataType & { data: T }> {
    return instance.post(url, data, config);
  },

  // PUT 请求
  put<T = any>(
    url: string,
    data?: any,
    config?: ConfigType
  ): Promise<ResponseDataType & { data: T }> {
    return instance.put(url, data, config);
  },

  // DELETE 请求
  delete<T = any>(url: string, config?: ConfigType): Promise<ResponseDataType & { data: T }> {
    return instance.delete(url, config);
  },
};

// 导出具名方法以便更灵活的使用
export const GET = request.get;
export const POST = request.post;
export const PUT = request.put;
export const DELETE = request.delete;

export default request;
