import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { isTokenValid } from '@/utils/auth';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // 客户端检查token有效性
    if (isTokenValid()) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin size="large" tip="正在跳转..." />
    </div>
  );
};

export default Home;
