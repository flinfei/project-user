import {
  DashboardOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
} from '@ant-design/icons';

export interface RouteItem {
  key: string;
  path: string;
  title: string;
  icon?: React.ReactNode;
  children?: RouteItem[];
}

export const routes: RouteItem[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    title: '仪表板',
    icon: <DashboardOutlined />,
  },
  {
    key: 'settings',
    path: '/settings',
    title: '系统设置',
    icon: <SettingOutlined />,
  },
  {
    key: 'help',
    path: '/help',
    title: '帮助中心',
    icon: <QuestionCircleOutlined />,
  },
  {
    key: 'chat',
    path: '/chat',
    title: '聊天测试',
    icon: <MessageOutlined />,
  },
];

export const findRouteByPath = (path: string): RouteItem | undefined => {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }
    if (route.children) {
      for (const child of route.children) {
        if (child.path === path) {
          return child;
        }
      }
    }
  }
  return undefined;
};

export const getBreadcrumbItems = (pathname: string) => {
  const route = findRouteByPath(pathname);
  if (!route) return [];

  return [
    {
      title: '首页',
      href: '/dashboard',
    },
    {
      title: route.title,
    },
  ];
};
