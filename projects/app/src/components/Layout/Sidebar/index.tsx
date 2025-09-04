import React, { useMemo, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { routes } from '@/routes';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

// 创建路由映射表，避免每次都要find（在组件外部创建，只计算一次）
const routeMap = routes.reduce(
  (map, route) => {
    map[route.key] = route.path;
    return map;
  },
  {} as Record<string, string>
);

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  // 使用useCallback优化点击处理函数
  const handleMenuClick = useCallback(
    (info: { key: string }) => {
      const path = routeMap[info.key];
      if (path) {
        router.push(path);
      }
    },
    [router]
  );

  // 使用useMemo缓存menuItems，避免每次重新计算
  const menuItems = useMemo(() => {
    return routes.map((route) => ({
      key: route.key,
      icon: route.icon,
      label: route.title,
    }));
  }, []);

  // 使用useMemo优化selectedKeys计算
  const selectedKeys = useMemo(() => {
    return routes.filter((route) => pathname === route.path).map((route) => route.key);
  }, [pathname]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          borderBottom: '1px solid #f0f0f0',
          background: '#001529',
        }}
      >
        {collapsed ? 'MS' : '管理系统'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

// 使用React.memo优化组件，避免不必要的重新渲染
export default React.memo(Sidebar);
