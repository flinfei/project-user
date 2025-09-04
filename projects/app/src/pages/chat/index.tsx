import React, { useState } from 'react';
import { Card, Input, Button, List, Typography, Space, Avatar } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/userStore';

const { Title } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { userInfo } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '您好！我是AI助手，有什么可以帮助您的吗？',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    // 模拟AI回复
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `收到您的消息："${inputValue}"。这是一个模拟回复，实际项目中这里可以接入真实的AI接口。`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <Title level={2}>聊天测试</Title>

      <Card
        style={{ height: '600px', display: 'flex', flexDirection: 'column' }}
        styles={{
          body: { flex: 1, display: 'flex', flexDirection: 'column', padding: 0 },
        }}
      >
        {/* 消息列表 */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          <List
            dataSource={messages}
            renderItem={(message) => (
              <List.Item style={{ border: 'none', padding: '8px 0' }}>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <Avatar
                      size="small"
                      icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                      style={{
                        backgroundColor: message.sender === 'user' ? '#1890ff' : '#52c41a',
                      }}
                    />
                    <div
                      style={{
                        background: message.sender === 'user' ? '#1890ff' : '#f0f0f0',
                        color: message.sender === 'user' ? 'white' : '#333',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        lineHeight: '1.4',
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
          {loading && (
            <div style={{ textAlign: 'left', color: '#999', padding: '8px 0' }}>
              <Avatar
                size="small"
                icon={<RobotOutlined />}
                style={{ backgroundColor: '#52c41a', marginRight: '8px' }}
              />
              AI正在思考中...
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div style={{ borderTop: '1px solid #f0f0f0', padding: '16px' }}>
          <Space.Compact style={{ width: '100%' }}>
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入您的消息..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              style={{ resize: 'none' }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              loading={loading}
              disabled={!inputValue.trim()}
            >
              发送
            </Button>
          </Space.Compact>
          <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
            按 Enter 发送，Shift + Enter 换行
          </div>
        </div>
      </Card>

      <Card title="聊天功能说明" style={{ marginTop: '16px' }}>
        <ul>
          <li>这是一个聊天测试页面，展示了基本的聊天界面</li>
          <li>支持发送文本消息和换行输入</li>
          <li>AI回复目前是模拟的，可以接入实际的AI接口</li>
          <li>消息显示用户头像和时间戳</li>
          <li>支持实时滚动和加载状态</li>
        </ul>
      </Card>
    </div>
  );
};

export default Chat;
