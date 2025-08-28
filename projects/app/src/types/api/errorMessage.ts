// 报错提示语-创建请求
export type ErrorMessageCreateRequest = {
  errorMessage: string;
  errorType: string;
  value?: string;
  tenantAppId?: string;
  tenantId?: number;
  tmbId?: number;
};

// 报错信息统计表
export type ErrorStatistics = {
  createTime: string;
  errorMessage: string;
  errorNum: number;
  errorType: string;
  id: number;
  modifiedErrorMessage?: string;
  updateTime: string;
};
