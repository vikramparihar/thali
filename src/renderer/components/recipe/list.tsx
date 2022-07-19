import react, { useEffect, useState } from 'react';
import {
  Space,
  Table,
  message,
  Popconfirm,
  Modal,
  Row,
  Col,
  PageHeader,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { RedoOutlined } from '@ant-design/icons';

export default function list(props: any) {
  const [form] = Form.useForm();

  const [tabindex, setTabindex] = useState(props.timestamp);

  const [data, setData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record: any) => {
    console.log(record);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      id: record.id,
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      // console.log(values);
      let res_already_exists = await window.databaseAPI.isRecipeExists(values);
      if (!res_already_exists.count) {
        let response = await window.databaseAPI.updateRecipe(values);
        if (response.status == 'ok') {
          message.success('Recipe updated successfully');
          form.resetFields();
          setIsModalVisible(false);
          onLoad();
        } else {
          message.error('Sorry unable to update recipe');
        }
      } else {
        message.error('Sorry ! This Recipe name is already exists');
      }
    } catch (error) {
      console.log(error);
      message.error('Sorry ! something went wrong');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const confirm = (record: any) => {
    removeRecipe(record.id);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    // message.error('Click on No');
  };

  interface DataType {
    key: string;
    name: string;
    price: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      render: (text) => <span className="toTitleCase">{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              confirm(record);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
          <a
            onClick={() => {
              showModal(record);
            }}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  const removeRecipe = async (id: number) => {
    try {
      let response = await window.databaseAPI.removeRecipe({ id: id });
      if (response.status == 'ok') {
        onLoad();
        message.success('This Recipe removed successfully');
      } else {
        message.error('Sorry ! Unable to remove this recipe');
      }
    } catch (error) {
      message.error('Sorry ! Something went wrong');
    }
  };

  //   const data: DataType[] = [];
  const onLoad = async () => {
    let response = await window.databaseAPI.getAllRecipe();
    console.log(response);
    if (response.status == 'ok') {
      setData(response.result);
    } else {
      message.error('Sorry! Unable to fetch Recipes');
    }
  };
  useEffect(() => {
    onLoad();
    console.log(tabindex);
  }, [tabindex]);
  return (
    <>
      <Table columns={columns} dataSource={data} size="middle" />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ display: 'none' }}
            label="id"
            name="id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="hidden" />
          </Form.Item>

          <Form.Item
            label="Recipe Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your price!',
              },
            ]}
          >
            <InputNumber min={1} max={1000} className="w-100" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button type="primary" htmlType="submit">
              <RedoOutlined /> Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
