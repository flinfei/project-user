import { POST } from '@/utils/request';

// 登录接口
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email?: string;
    roles: string;
  };
}

export const login = (data: LoginRequest) => POST<LoginResponse>('/auth/login', data);

// 登出接口
export const loginOut = () => POST<boolean>('/auth/logout');
