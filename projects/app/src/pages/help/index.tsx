import React from 'react';
import { Card, Typography, Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Box, Text } from '@chakra-ui/react';

const { Title } = Typography;

const Help: React.FC = () => {
  const faqItems = [
    {
      key: '1',
      label: '如何登录系统？',
      children: <p>使用您的用户名和密码在登录页面进行登录。如果忘记密码，请联系管理员。</p>,
    },
    {
      key: '2',
      label: '如何修改个人信息？',
      children: <p>进入系统设置页面，在用户设置部分可以修改您的个人信息。</p>,
    },
    {
      key: '3',
      label: '系统支持哪些功能？',
      children: <p>系统包含用户管理、权限控制、数据统计等功能，具体功能请查看相应模块。</p>,
    },
  ];

  return (
    <Box>
      <Title level={2}>帮助中心</Title>

      <Card
        title={
          <Text>
            <QuestionCircleOutlined style={{ marginRight: '8px' }} />
            常见问题
          </Text>
        }
        style={{ marginBottom: '16px' }}
      >
        <Collapse items={faqItems} />
      </Card>

      <Card title="联系我们">
        <Text>如果您在使用过程中遇到问题，请通过以下方式联系我们：</Text>
        <ul>
          <Text>邮箱: support@example.com</Text>
          <Text>电话: 400-123-4567</Text>
          <Text>在线客服: 工作日 9:00-18:00</Text>
        </ul>
      </Card>
    </Box>
  );
};

export default Help;
