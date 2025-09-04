import React, { useState, useEffect } from 'react';
import { Layout as AntLayout } from 'antd';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { isTokenValid } from '@/utils/auth';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserStore();

  // 检查用户登录状态
  useEffect(() => {
    if (!isTokenValid()) {
      router.push('/login');
      return;
    }

    // 如果没有用户信息，尝试从localStorage获取
    if (!userInfo) {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
        } catch (error) {
          console.error('解析用户信息失败:', error);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [userInfo, setUserInfo, router]);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  // 如果没有用户信息，显示加载状态
  if (!userInfo) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        加载中...
      </div>
    );
  }

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <AntLayout>
        <Header collapsed={collapsed} onToggle={handleToggle} />
        <Content collapsed={collapsed}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
