
import { useNavigate, Outlet, Link } from 'react-router-dom';
import React, { useState, useId } from "react";
import { Menu } from 'antd';
import {
  LogoutOutlined,
  HomeOutlined,
  BarcodeOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  DingdingOutlined,
  BlockOutlined,
  UsergroupAddOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

import { Layout } from 'antd';

import './home.css';
export default function layout() {
  const navigation = useNavigate();
  const { Header, Footer, Sider, Content } = Layout;
  const [current, setCurrent] = useState("dashboard");
  const logout = () => {
    navigation('/');
  };
  const onClick = (e:any) => {
    setCurrent(e.key);
    navigation(e.key)
  };
  const items = [
    { label: 'Dashboard', key: 'dashboard', icon: <HomeOutlined /> },
    { label: 'Orders', key: 'order', icon: <UnorderedListOutlined /> }, // which is required
    { label: 'Invoices', key: 'invoice', icon: <BarcodeOutlined /> }, // which is required
    { label: 'Recipes', key: 'recipe', icon: <BlockOutlined /> }, // which is required
    // { label: 'Customers', key: 'customer', icon: <UsergroupAddOutlined /> }, // which is required
    // { label: 'Settings', key: 'setting', icon: <SettingOutlined /> }, // which is required
    // { label: 'Profile', key: 'profile', icon: <InstagramOutlined /> }, // which is required
  ];
  return (
    <Layout>
      <Sider theme="light" className="appSidebarWrapper">
        <div className="appSidebar">
          <div className="topLogo">
            {' '}
            <DingdingOutlined /> Half-plate
          </div>
          <Menu onClick={onClick} items={items} />
        </div>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: '#ffffff', height: 50, padding: 0 }}>
          <div className="top-nav-bar">
            <div>Your last order was a dummy cake</div>
            <span className="pointer" onClick={logout}>
              <LogoutOutlined />
            </span>
          </div>
        </Header>
        <Content className="contentWrapper">
          <Outlet />
        </Content>
        <Footer>All Rights Reserved</Footer>
      </Layout>
    </Layout>
  );
}
