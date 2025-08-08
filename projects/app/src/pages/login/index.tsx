import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

interface LoginParams {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const handleLogin = async (values: LoginParams) => {
    try {
      setLoading(true);
      const response = await request.post('/api/auth/login', values);

      if (response.success) {
        // 保存token和用户信息
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));

        message.success('登录成功');

        // 跳转到首页
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      }
    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请检查账号密码是否正确');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Card
          bordered={false}
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '420px',
          }}
          bodyStyle={{
            padding: '30px 35px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <Title
              level={2}
              style={{
                marginTop: '20px',
                color: '#333',
                fontWeight: 600,
              }}
            >
              系统登录
            </Title>
          </div>

          <Spin spinning={loading} tip="登录中...">
            <Form
              form={form}
              name="login"
              onFinish={handleLogin}
              autoComplete="off"
              layout="vertical"
              size="large"
            >
              <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  placeholder="请输入账号"
                  allowClear
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password
                  prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  placeholder="请输入密码"
                  allowClear
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    </div>
  );
};

export default Login;
