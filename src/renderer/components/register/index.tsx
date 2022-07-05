import React, { useState } from 'react';
import { Card, Form, Input, Button, Alert, message } from 'antd';
import './style.css';
import image from './background.jpg';
import { useNavigate, Link } from 'react-router-dom';
import { LockOutlined, UserOutlined, BlockOutlined } from '@ant-design/icons';

let bg = {
  backgroundImage: 'url(' + image + ')',
  backgroundRepeat: 'noRepeat',
  backgroundPosition: 'top'
};

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // const [user, setUser] = useState(0);

  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    /*  
    Call the user register api
  */
    try {
      let response = await window.databaseAPI.userRegister(values);
      console.log(response);
      if (response.status === 'ok') {
        message.success('User created successfully');
        navigate('/');
      } else {
        message.error('Sorry ! Unable to register first user');
      }
    } catch (error) {
      console.log(error)
      message.error('Sorry ! Something went wrong');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="register-page" style={bg}>
      <Card className="register-box" size="small" title="Create your account">
        <Alert
          message="Note: This is one time process, Please keep your username and password in notebook. In case of forget you want be able to recover."
          type="warning"
          showIcon
          closable
          style={{ marginBottom: '15px' }}
        />
        <Form
          form={form}
          name="register"
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

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<BlockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Register
            </Button>
            Or <Link to="/">Login</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
