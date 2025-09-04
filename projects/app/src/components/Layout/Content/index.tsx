import React from 'react';
import { Layout } from 'antd';

const { Content: AntContent } = Layout;

interface ContentProps {
  children: React.ReactNode;
  collapsed: boolean;
}

const Content: React.FC<ContentProps> = ({ children, collapsed }) => {
  return (
    <AntContent
      style={{
        marginLeft: collapsed ? 80 : 200,
        marginTop: 64,
        padding: '24px',
        minHeight: 'calc(100vh - 64px)',
        background: '#f0f2f5',
        transition: 'margin-left 0.2s',
      }}
    >
      {children}
    </AntContent>
  );
};

export default Content;
