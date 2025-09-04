import React from 'react';
import { Layout, Button, Breadcrumb, Dropdown, Avatar, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { getBreadcrumbItems } from '@/routes';
import { clearToken } from '@/utils/auth';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo, clearUserInfo } = useUserStore();

  const breadcrumbItems = getBreadcrumbItems(pathname);

  const handleLogout = async () => {
    try {
      await clearToken();
      clearUserInfo();
      localStorage.removeItem('userInfo');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('expiresAt');
      router.push('/login');
    } catch (error) {
      console.error('退出登录失败:', error);
      // 即使失败也清理本地数据并跳转
      clearUserInfo();
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('expiresAt');
      router.push('/login');
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
      onClick: () => {
        // 可以跳转到个人信息页面
        console.log('查看个人信息');
      },
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader
      style={{
        padding: '0 16px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
        position: 'fixed',
        top: 0,
        right: 0,
        left: collapsed ? 80 : 200,
        zIndex: 1000,
        transition: 'left 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{ marginRight: '16px' }}
        />
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <Space>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: '8px' }} />
            <span>{userInfo?.nickname || userInfo?.username || '用户'}</span>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
