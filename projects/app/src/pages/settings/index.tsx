import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Settings: React.FC = () => {
  return (
    <div>
      <Title level={2}>系统设置</Title>

      <Card title="基本设置" style={{ marginBottom: '16px' }}>
        <p>系统设置页面正在开发中...</p>
        <p>这里将包含各种系统配置选项。</p>
      </Card>

      <Card title="用户设置">
        <p>用户个人设置选项将在这里显示。</p>
      </Card>
    </div>
  );
};

export default Settings;
