import { ErrorStatistics } from './api/errorMessage';

// 事件追踪名称类型
export type TrackEventName =
  | 'login'
  | 'logout'
  | 'register'
  | 'page_view'
  | 'button_click'
  | 'api_call';

export type PagingData<T> = {
  current?: number;
  size?: number;
  records: T[];
  pages: number;
  total?: number;
};

export type RequestPaging = { current: number; size: number; [key: string]: any };

export type RequestPageParams = { current?: number; size?: number };

export type ParentTreePathItemType = {
  parentId: string;
  parentName: string;
  finalParentId: string;
};

declare global {
  var errorMessageList: ErrorStatistics[];

  interface Window {
    grecaptcha: any;
    QRCode: any;
    errorMessageList: ErrorStatistics[];
    umami?: {
      track: (event: `${TrackEventName}`, data: any) => void;
    };
  }
}

export type SizeType = {
  width: number;
  height: number;
};
