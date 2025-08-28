import { createErrorMessage } from '@/api/errorMessage';
import { PagingData, RequestPageParams, ErrorMessageCreateRequest, ErrorStatistics } from '@/types';
import { getToken } from './auth';

export const getListFromPage = async <QueryType extends RequestPageParams, DataType>(
  api: (query: QueryType) => Promise<PagingData<DataType>>,
  query?: Omit<QueryType, keyof RequestPageParams>,
  size = 100
) => {
  let current = 1;
  let total = -1;
  const list: DataType[] = [];
  const params = { ...query, current, size };
  while (true) {
    const res = await api(params as QueryType);
    if (total < 0) {
      total = res.total || 0;
    } else if (total !== res.total) {
      params.current = 1;
      total = -1;
      list.length = 0;
      continue;
    }
    if (!res.records.length) {
      break;
    }
    list.push(...res.records);
    if (list.length >= total) {
      break;
    }
    params.current++;
  }
  return list;
};

export const getUrlMapName: Record<string, string> = {
  '/client/schoolDeptSubjectManage': '学科教学管理',
  '/client/schoolDeptManage': '年班级教学管理',
  '/client/semester': '租户学期管理',
  '/client/student': '租户学生管理',
  '/client/menu': '菜单管理',
  '/client/error/message': '错误信息管理',
  '/system/fast': 'FastGPT相关',
  '/app/cloud/space/download': 'APP端学校资料库、个人资料库文件夹下载',
  '/app/cloud/transmission': 'APP端网盘下载传输管理',
  '/app/cloud/folder': 'APP端网盘个人资料库文件夹管理',
  '/app/cloud/recycle': 'APP端网盘回收站管理',
  '/app/cloud/dynamic': 'APP端网盘操作动态',
  '/app/cloud/file/share': 'APP端网盘文件共享管理',
  '/app/cloud/file/version': 'APP端网盘文件历史版本管理',
  '/app/cloud/file': 'APP端网盘文件管理',
  '/app/cloud/label': 'APP端网盘标签管理',
  '/app/cloud/space/share': 'APP端网盘空间共享管理',
  '/app/cloud/space/auditor': 'APP端网盘空间审核人管理',
  '/app/cloud/space/audit': 'APP端网盘空间审核管理',
  '/app/cloud/space': 'APP端网盘空间管理',
  '/app/cloud/notice': 'APP端网盘通知',
  '/stt': 'STT相关',
  '/toc/wx': 'TOC微信相关',
  '/cloud/folder': '个人资料库文件夹管理',
  '/qywx': '企业微信相关',
  '/evalua/homework': '作业管理',
  '/evalua/homeworkEvaluate': '作业评价管理',
  '/system/init': '初始化数据',
  '/admin/tenant/user': '后台租户人员管理',
  '/admin/tenant': '后台租户管理',
  '/admin/dept': '后台租户部门管理',
  '/admin/menu': '后台菜单管理',
  '/cloud/recycle': '回收站管理',
  '/system/dict': '字典管理',
  '/admin/workflow': '官方后台工作流管理',
  '/admin/workflow/process': '官方后台工作环节管理',
  '/app/tenant/scene': '小程序场景管理',
  '/app/tenant/label': '小程序子场景管理',
  '/app/prompt/center': '小程序快捷指令中心',
  '/app/tenant/app': '小程序应用',
  '/app/feedback': '小程序用户反馈管理',
  '/admin/scene': '平台后台场景管理',
  '/admin/label': '平台后台子场景管理',
  '/admin/prompt': '平台后台快捷指令管理',
  '/admin/app/label': '平台后台应用子场景管理',
  '/admin/app': '平台后台应用管理',
  '/admin/feedback': '平台后台用户反馈管理',
  '/admin/dataset': '平台后台知识库管理',
  '/admin/tenant/scene': '平台后台租户场景管理',
  '/admin/tenant/label': '平台后台租户子场景管理',
  '/admin/tenant/dataset': '平台后台租户知识库管理',
  '/schoolDept/manage': '年班级教学管理',
  '/wx': '微信相关',
  '/client/prompt/center': '快捷指令中心',
  '/client/my/dataset': '我的知识库管理',
  '/aes': '教科院聊天管理',
  '/system/file': '文件上传管理',
  '/cloud/file/version': '文件历史版本管理',
  '/cloud/file': '文件管理',
  '/system/convert': '文件转换',
  '/client/app/center': '应用中心',
  '/clazz/student': '班级学生管理',
  '/client/user/tenantWorkflow': '用户前台工作流管理',
  '/client/user/tenantWorkflowProcess': '用户前台工作环节管理',
  '/app/user': '用户管理',
  '/admin/auth': '登录授权管理',
  '/app/auth': 'APP端登录授权管理',
  '/client/auth': 'C端登录授权管理',
  '/client/tenant/user': '租户人员管理',
  '/client/tenantWorkflow': '租户后台工作流管理',
  '/client/tenantWorkflowProcess': '租户后台工作环节管理',
  '/client/tenant/prompt': '租户后台快捷指令管理',
  '/client/tenant/appLabel': '租户后台应用子场景管理',
  '/client/tenant/app': '租户后台应用管理',
  '/client/tenant/dataset': '租户后台知识库管理',
  '/client/tenant/scene': '租户场景管理',
  '/client/tenant/label': '租户子场景管理',
  '/client/tenant/dataset/user': '租户知识库用户管理',
  '/client/tenant': '租户管理',
  '/app/chat': '租户聊天管理',
  '/client/chat': '租户聊天管理',
  '/client/chat/once': '聊天标题生成',
  '/client/chat/completions': '用户聊天',
  '/tenant/evaluateIcon': '租户评价指标图标',
  '/admin': '管理员管理',
  '/admin/cloud/space/download': '管理端学校资料库、个人资料库文件夹下载',
  '/admin/cloud/space': '管理端资料管理',
  '/cloud/transmission': '网盘下载传输管理(C端)',
  '/admin/cloud/transmission': '网盘下载传输管理(管理端)',
  '/cloud/dynamic': '网盘操作动态',
  '/cloud/file/share': '网盘文件共享管理',
  '/cloud/label': '网盘标签管理',
  '/cloud/space/share': '网盘空间共享管理',
  '/cloud/space/auditor': '网盘空间审核人管理',
  '/cloud/space/audit': '网盘空间审核管理',
  '/cloud/space': '网盘空间管理',
  '/cloud/notice': '网盘通知',
  '/admin/chats/demo': '聊天Demo管理',
  '/admin/chat/items/demo': '聊天内容Demo管理',
  '/system/menu': '菜单管理',
  '/admin/industry': '行业管理',
  '/system/region': '行政区域管理',
  '/admin/role': '角色管理',
  '/client/role': '角色管理(C端)',
  '/admin/role/menu': '角色选择权限管理',
  '/client/role/menu': '角色选择权限管理(C端)',
  '/evalua/indactor': '评价指标管理',
  '/evalua/view': '评价数据管理',
  '/evalua/dimenType': '评价维度归属管理',
  '/evalua/rule': '评价规则管理',
  '/evalua/scoreLevel': '评分等级管理',
  '/evalua/scoreLevelValue': '评分等级设置管理',
  '/evalua/classEvaluate': '课堂表现评价管理',
  '/client/dept': '部门管理',
  '/ding': '钉钉相关',
  '/client/ding': '钉钉相关',
};

export const handleErrorMessage = async ({
  errorMessage,
  url,
  tenantAppId,
  value,
}: {
  errorMessage: string;
  url: string;
  tenantAppId: string;
  value: string;
}) => {
  // 创建报错记录
  let errorType = '系统错误'; // 示例报错类型
  Object.keys(getUrlMapName).find((key: string) => {
    if (url.includes(key)) {
      errorType = getUrlMapName[key];
    }
  });

  const errorData: ErrorMessageCreateRequest = {
    errorMessage,
    errorType,
    value,
    tenantAppId,
  };

  if (!url?.includes('client/error/message/create') && getToken()) {
    await createErrorMessage(errorData);
  }
};

export const getErrorMessage = (msg: any, url: string): string => {
  // 特殊报错
  const specialMsg = 'maximum context length';

  // 创建报错记录
  let errorType = '系统错误'; // 示例报错类型
  Object.keys(getUrlMapName).find((key: string) => {
    if (url.includes(key)) {
      errorType = getUrlMapName[key];
    }
  });
  // 查找 window.errorMessageList 中的信息
  const errorMessageList = (window as any).errorMessageList as ErrorStatistics[];

  const matchedError = errorMessageList?.find((error) => {
    return (
      error.errorMessage === msg ||
      (msg.includes('(') && msg.includes(')') && msg.split('(')[0] === error.errorMessage) ||
      (msg.includes(specialMsg) && error.errorMessage.includes(specialMsg))
    );
  });
  // console.log(msg, matchedError, errorMessageList);
  let modifiedData = '';

  // 如果匹配到报错信息一样，用修改后的报错信息替换
  if (matchedError && matchedError.modifiedErrorMessage && matchedError.errorType === errorType) {
    modifiedData = matchedError.modifiedErrorMessage;
  }
  return modifiedData;
};
