import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { isTokenValid } from '@/utils/auth';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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

  // 使用useCallback优化折叠处理函数
  const handleToggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} onToggle={handleToggle} />
        <Content collapsed={collapsed}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
