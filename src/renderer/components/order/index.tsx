import { useState, useEffect, useId } from 'react';
import Moment from 'react-moment';
import {
  Card,
  Row,
  Col,
  PageHeader,
  Button,
  Drawer,
  Form,
  message,
  Table,
  Space,
  Popconfirm,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import Create from './createOrder';
import Edit from './editOrder';

export default function order() {
  const [visible, setVisible] = useState(false);
  const [editvisible, setEditvisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const showEditDrawer = (record: any) => {
    setEditId(record.id);
    setEditvisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onEditClose = () => {
    setEditvisible(false);
  };
  const getOrders = async () => {
    let response = await window.databaseAPI.getAllOrder();
    if (response.status == 'ok') {
      console.log(response.result)
      setOrders(response.result);
    } else {
      message.error('Sorry! Unable to fetch Orders');
    }
  };
  const tdPrice = (record: any) => {
    let items = JSON.parse(record.items);
    let orderAmount: Number = 0;
    if (items.length) {
      for (const item of items) {
        orderAmount += item.total;
      }
    }
    return orderAmount;
  };
  /* Populate order tables data */
  interface DataType {
    key: string;
    name: string;
    price: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      render: (text) => <span>ORD#{text}</span>,
    },
    {
      title: 'Table Number',
      dataIndex: 'tableNumber',
      key: 'tableNumber',
      render: (text) => <span>{text ? text : 'N/A'}</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <span className="toTitleCase" >{text ? text : 'N/A'}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      // defaultSortOrder: 'descend',
      render: (_, record) => <span><i className="bi bi-currency-rupee"></i>{tdPrice(record)}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'ascend',
      render: (text) => <Moment format="YYYY-MM-DD hh:mm:ss">{text}</Moment>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this task?"
            // onConfirm={() => {
            //   confirm(record);
            // }}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            {/* <a href="#">Delete</a> */}
            <Button
              type="default"
              size="small"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
          <Button
            onClick={() => {
              showEditDrawer(record);
            }}
            type="default"
            size="small"
            shape="circle"
            icon={<EditOutlined />}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getOrders();
  }, [visible, editvisible]);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Order"
        subTitle="Manage listing and create, edit, delete operations"
        extra={[
          <Button key="1" icon={<PlusCircleOutlined />} onClick={showDrawer}>
            Create Order
          </Button>,
        ]}
      />
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={orders} size="middle" />
        </Col>
      </Row>

      <Drawer
        title="New Order"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={768}
      >
        <Create />
      </Drawer>

      <Drawer
        title="Edit Order"
        placement="right"
        onClose={onEditClose}
        visible={editvisible}
        width={768}
      >
        <Edit id={editId} />
      </Drawer>
    </>
  );
}
