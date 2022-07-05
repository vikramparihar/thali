import { useEffect, useState } from 'react';
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
} from 'antd';
import { UnorderedListOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import List from './list';

export default function recipe() {
  
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [timestamp, setTimestamp] = useState(+new Date())
   
  const onChange = (key: string) => {
    setTimestamp(+new Date());
    // console.log(timestamp)
  };

  const onFinish = async (values: any) => {
    try {
      let res_already_exists = await window.databaseAPI.isRecipeExists(values);
      if (!res_already_exists.count) {
        let response = await window.databaseAPI.saveRecipe(values);
        if (response.status == 'ok') {
          message.success('Recipe added successfully');
          form.resetFields();
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

  useEffect(()=> {
    // console.log(timestamp)
  }, [timestamp])
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Recipe"
        subTitle=""
      />
      <Row>
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane
                tab={
                  <span>
                    <UnorderedListOutlined />
                    List
                  </span>
                }
                key="1"
              >
                <List timestamp={timestamp}></List>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <PlusCircleOutlined />
                    Create
                  </span>
                }
                key="2"
              >
                <Form
                  form={form}
                  name="basic"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 10 }}
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

                  <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    <SaveOutlined /> Save
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="History" key="3">
                Invoice Setting
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
}
