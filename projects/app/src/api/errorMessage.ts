import { POST } from '@/utils/request';
import { ErrorMessageCreateRequest, ErrorStatistics } from '@/types';

// 创建报错提示语
export const createErrorMessage = (data: ErrorMessageCreateRequest) =>
  POST<boolean>('/client/error/message/create', data);

// 获取报错提示语列表
export const getErrorMessageList = () => POST<ErrorStatistics[]>('/client/error/message/list');
