import React from 'react';
import { Card, Typography } from 'antd';
import Layout from '@/components/Layout';

const { Title } = Typography;

const ModelChat: React.FC = () => {
  return (
    <Layout>
      <Title level={2}>模型聊天</Title>
    </Layout>
  );
};

export default ModelChat;
