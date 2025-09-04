import React, { useMemo, useCallback } from 'react';
import { Layout, Button, Breadcrumb, Dropdown, Avatar, Space } from 'antd';
import { Box, Flex, Text } from '@chakra-ui/react';
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

  // 使用useMemo缓存面包屑数据
  const breadcrumbItems = useMemo(() => getBreadcrumbItems(pathname), [pathname]);

  // 使用useCallback优化登出函数
  const handleLogout = useCallback(async () => {
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
  }, [router, clearUserInfo]);

  // 使用useMemo缓存用户菜单项
  const userMenuItems = useMemo(
    () => [
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
    ],
    [handleLogout]
  );

  // 使用useMemo缓存Header样式
  const headerStyle = useMemo(
    () => ({
      padding: '0 16px',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #f0f0f0',
      position: 'fixed' as const,
      top: 0,
      right: 0,
      left: collapsed ? 80 : 200,
      zIndex: 1000,
      transition: 'left 0.2s',
    }),
    [collapsed]
  );

  return (
    <AntHeader style={headerStyle}>
      <Flex alignItems="center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{ marginRight: '16px' }}
        />
        <Breadcrumb items={breadcrumbItems} />
      </Flex>

      <Space>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Flex cursor="pointer" alignItems="center">
            <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: '8px' }} />
            <Text>{userInfo?.username || '用户'}</Text>
          </Flex>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

// 使用React.memo优化Header组件
export default React.memo(Header);
