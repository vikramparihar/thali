import { useNavigate, Outlet, Link } from 'react-router-dom';
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
  const logout = () => {
    navigation('/');
  };
  const items = [
    { label: 'item 1', key: 'item-1' }, // remember to pass the key prop
    { label: 'item 2', key: 'item-2' }, // which is required
    {
      label: 'sub menu',
      key: 'submenu',
      children: [{ label: 'item 3', key: 'submenu-item-1' }],
    },
  ];
  return (
    <Layout>
      <Sider theme="light" className="appSidebarWrapper">
        <div className="appSidebar">
          <div className="topLogo">
            {' '}
            <DingdingOutlined /> Half-plate
          </div>
          {/* <ul>
            <li>
              <Link to="dashboard">
                <HomeOutlined /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="order">
                <UnorderedListOutlined /> Orders
              </Link>
            </li>
            <li>
              <Link to="invoice">
                <BarcodeOutlined /> Invoices
              </Link>
            </li>
            <li>
              <Link to="setting">
              <SettingOutlined /> Settings
              </Link>
            </li>
          </ul> */}
          <Menu>
            <Menu.Item className="navBarFirstItem" key="dashboard">
              <Link to="dashboard">
                <HomeOutlined /> Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="order">
              <Link to="order">
                <UnorderedListOutlined /> Orders
              </Link>
            </Menu.Item>
            <Menu.Item key="invoice">
              <Link to="invoice">
                <BarcodeOutlined /> Invoices
              </Link>
            </Menu.Item>
            <Menu.Item key="recipe">
              <Link to="recipe">
                <BlockOutlined /> Recipes
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="recipe" key="customer">
                <UsergroupAddOutlined /> Customers
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="setting" key="setting">
                <SettingOutlined /> Settings
              </Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="setting">
                <InstagramOutlined /> Profile
              </Link>
            </Menu.Item>
          </Menu>
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
