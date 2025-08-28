import { loginOut } from '@/api/auth';
import { getErrorMessageList } from '@/api/errorMessage';

const tokenKey = 'token';
export const clearToken = async () => {
  try {
    if (localStorage.getItem(tokenKey)) {
      return loginOut().finally(() => {
        localStorage.removeItem(tokenKey);
      });
    }
  } catch (error) {
    error;
  }
};
/**
 * 设置token
 * @param token
 * @param isGetErrorMessageList 是否获取错误信息列表, 默认获取
 * @returns
 */
export const setToken = (token: string, isGetErrorMessageList: boolean = true) => {
  if (typeof window === 'undefined') return '';
  localStorage.setItem(tokenKey, token);

  if (isGetErrorMessageList) {
    setTimeout(() => {
      getErrorMessageList().then((data: any) => {
        (window as any).errorMessageList = data;
      });
    }, 100);
  }
};

export const getToken = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(tokenKey) || '';
};
