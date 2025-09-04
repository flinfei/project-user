import React from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { routes } from '@/routes';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (info: { key: string }) => {
    const route = routes.find((r) => r.key === info.key);
    if (route) {
      router.push(route.path);
    }
  };

  const menuItems = routes.map((route) => ({
    key: route.key,
    icon: route.icon,
    label: route.title,
  }));

  // 根据当前路径确定选中的菜单项
  const selectedKeys = routes.filter((route) => pathname === route.path).map((route) => route.key);

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

export default Sidebar;
