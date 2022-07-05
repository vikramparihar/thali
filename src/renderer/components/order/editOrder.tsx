import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col,
  InputNumber,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
const { Option } = Select;

export default function edit(props: any) {
  const [form] = Form.useForm();
  const [recipe, setRecipe] = useState([]);
  const [ddrecipe, setDDrecipe] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const orderID = props.id;

  const getRecipes = async () => {
    let response = await window.databaseAPI.getAllRecipe();
    if (response.status == 'ok') {
      setRecipe(response.result);
      let values = response.result.map((ele) => {
        return { label: ele.name, value: ele.name };
      });
      setDDrecipe(values);
    } else {
      message.error('Sorry! Unable to fetch Recipes');
    }
  };

  const getCurrentOrder = async () => {
    let response = await window.databaseAPI.getAllOrder({ id: orderID });
    if (response.status == 'ok') {
      //   setOrders(response.result);
    //   console.log(JSON.parse(response.result.items))
      let items = JSON.parse(response.result.items)
      form.setFieldsValue({ items: items });
      calculateOrderTotal(items);
    } else {
      message.error('Sorry! Unable to fetch Orders');
    }
  };

  function getFilterRecipe(name: string) {
    return recipe.filter((ele) => ele.name == name);
  }
  const onFinish = async (values: any) => {
    if (typeof values.items != 'undefined') {
      values['id'] = orderID  
      let response = await window.databaseAPI.updateOrder(values);
      if (response.status == 'ok') {
        message.success('Order created successfully');
        form.resetFields();
      } else {
        message.error('Sorry! Unable to Create Order');
      }
    } else {
      message.error('Please add some items in order form');
    }
  };

  const handleChange = (field: any) => {
    if (typeof form.getFieldValue('items')[field.name].recipe != 'undefined') {
      let recipeObj = getFilterRecipe(
        form.getFieldValue('items')[field.name].recipe
      );
      let price = recipeObj[0].price;
      let total = eval(
        parseInt(price) *
          parseInt(form.getFieldValue('items')[field.name].quantity)
      );
      const items = form.getFieldValue('items');
      const updatedItems = items.map((item: any) => {
        if (form.getFieldValue('items')[field.name].recipe == item.recipe) {
          return {
            ...item,
            price: price,
            total: total,
          };
        }
        return item;
      });
      form.setFieldsValue({ items: updatedItems });
      calculateOrderTotal(updatedItems);
    }
  };

  const calculateOrderTotal = (items: any) => {
    let total: number = 0;
    for (const item of items) {
      total += item.total;
    }
    setOrderTotal(total);
  };

  useEffect(() => {
    getRecipes();
    getCurrentOrder();
  }, [orderID]);
  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row gutter={16}>
        <Col span={8}>Recipe</Col>
        <Col span={4}>Price</Col>
        <Col span={4}>Quantity</Col>
        <Col span={4}>Total</Col>
        <Col span={4}>Manage</Col>
      </Row>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row key={field.key} gutter={16}>
                <Col span={8}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'recipe']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing item',
                      },
                    ]}
                  >
                    <Select
                      options={ddrecipe}
                      onChange={() => handleChange(field)}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'price']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing price',
                      },
                    ]}
                    initialValue="0"
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'quantity']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing price',
                      },
                    ]}
                    initialValue="1"
                  >
                    <InputNumber min={1} onChange={() => handleChange(field)} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'total']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing total',
                      },
                    ]}
                    initialValue="0"
                  >
                    <InputNumber readOnly />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Col>
              </Row>
            ))}

            <Form.Item style={{ marginTop: '15px' }}>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add items
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>Order Total: {orderTotal}</Form.Item>
      <Form.Item>
        <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
