// 重新导出所有类型定义
export * from './api/errorMessage';

// 分页数据类型
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

export type SizeType = {
  width: number;
  height: number;
};
