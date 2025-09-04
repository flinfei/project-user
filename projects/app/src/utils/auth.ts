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
    console.error('清除token失败:', error);
  }
};
/**
 * 设置token
 * @param token
 * @param expiresIn 过期时间（秒），默认2天
 * @param isGetErrorMessageList 是否获取错误信息列表, 默认获取
 * @returns
 */
export const setToken = (
  token: string,
  expiresIn: number = 2 * 24 * 60 * 60,
  isGetErrorMessageList: boolean = true
) => {
  if (typeof window === 'undefined') return '';
  localStorage.setItem(tokenKey, token);

  // 保存登录时间和过期时间
  const now = Date.now();
  localStorage.setItem('loginTime', now.toString());
  localStorage.setItem('expiresAt', (now + expiresIn * 1000).toString());

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

/**
 * 检查token是否有效（未过期）
 */
export const isTokenValid = (): boolean => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem(tokenKey);
  const expiresAt = localStorage.getItem('expiresAt');

  if (!token || !expiresAt) {
    return false;
  }

  const now = Date.now();
  const expiration = parseInt(expiresAt);

  return now < expiration;
};
