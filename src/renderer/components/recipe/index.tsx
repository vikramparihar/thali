import { useEffect, useState, useRef} from 'react';
import {
  Tabs,
  Card,
  Row,
  Col,
  PageHeader,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
} from 'antd';
import {
  UnorderedListOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import List from './list';

export default function recipe() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [timestamp, setTimestamp] = useState(+new Date());
  // const previousTimestamp = useRef();
  const [reset, setReset] = useState(true);

  const onChange = (key: string) => {
    setTimestamp(+new Date());
    // console.log(timestamp)
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setTimestamp(+new Date());
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTimestamp(+new Date());
  };
  const onFinish = async (values: any) => {
    try {
      let res_already_exists = await window.databaseAPI.isRecipeExists(values);
      if (!res_already_exists.count) {
        let response = await window.databaseAPI.saveRecipe(values);
        if (response.status == 'ok') {
          message.success('Recipe added successfully');
          form.resetFields();
          setIsModalVisible(false);
          setReset(false)
          setReset(true)
        } else {
          message.error('Sorry unable to added recipe');
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

  useEffect(() => {
    setReset(true)
  }, [reset]);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Recipe"
        subTitle="Sub title here"
        extra={[
          <Button
            key="1"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              setIsModalVisible(true); setTimestamp(+new Date());
            }}
          >
            Create
          </Button>,
        ]}
      />
      
      <Row>
        <Col span={24}>
          { reset ? 
            <List timestamp={timestamp}></List> : ''
          }
        </Col>
      </Row>
      <Modal
        title="Add Recipe"
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
              <SaveOutlined /> Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
