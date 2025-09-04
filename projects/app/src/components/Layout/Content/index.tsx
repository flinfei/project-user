import React, { useMemo } from 'react';
import { Layout } from 'antd';

const { Content: AntContent } = Layout;

interface ContentProps {
  children: React.ReactNode;
  collapsed: boolean;
}

const Content: React.FC<ContentProps> = ({ children, collapsed }) => {
  // 使用useMemo缓存样式对象，避免每次重新创建
  const contentStyle = useMemo(
    () => ({
      marginLeft: collapsed ? 80 : 200,
      marginTop: 64,
      padding: '24px',
      minHeight: 'calc(100vh - 64px)',
      background: '#f0f2f5',
      transition: 'margin-left 0.2s',
    }),
    [collapsed]
  );

  return <AntContent style={contentStyle}>{children}</AntContent>;
};

// 使用React.memo优化组件
export default React.memo(Content);
