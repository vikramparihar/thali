import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import './style.css';
import image from './background.jpg';
import { useNavigate, Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

let bg = {
  backgroundImage: 'url(' + image + ')',
  backgroundRepeat: 'noRepeat',
  backgroundPosition: 'top',
};

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState(0);

  const onFinish = async (values: any) => {
    let response = await window.databaseAPI.checkUserExists(values);
    if (!response.count) {
      message.error('No User registered with this credientials');
    } else {
      navigate('/home');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const getUserInfo = async () => {
    try {
      let hasUser = await window.databaseAPI.getUsers();
      setUser(hasUser.count);
    } catch (error) {
      console.log('getUserInfo::Error', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="login-page" style={bg}>
      <Card className="login-box" size="small" title="Login Here">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
            <div style={{ paddingTop: '10px' }}>
              {!user ? <Link to="/register">Or Register now</Link> : ''}
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
