import React, { useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { UserOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // 检查用户信息，如果没有则从localStorage获取
    if (!userInfo) {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
        } catch (error) {
          console.error('解析用户信息失败:', error);
          // 如果解析失败，跳转到登录页
          router.push('/login');
        }
      } else {
        // 如果没有用户信息，跳转到登录页
        router.push('/login');
      }
    }
  }, [userInfo, setUserInfo, router]);

  if (!userInfo) {
    return <div>加载中...</div>;
  }

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#f0f2f5' }}>
      <Title level={2}>欢迎回来，{userInfo.nickname || userInfo.username}！</Title>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="用户信息" value={userInfo.username} prefix={<UserOutlined />} />
            <div style={{ marginTop: '8px', color: '#666' }}>角色: {userInfo.roles}</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="系统状态"
              value="正常"
              prefix={<SettingOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="在线用户" value={1} prefix={<FileOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="快速操作" style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card
              hoverable
              onClick={() => router.push('/settings')}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <SettingOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <div style={{ marginTop: '8px' }}>系统设置</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              onClick={() => router.push('/help')}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <FileOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
              <div style={{ marginTop: '8px' }}>帮助中心</div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;
