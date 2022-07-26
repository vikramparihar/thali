import { Card, Col, Row, PageHeader } from 'antd';
export default function dashboard() {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Welcome to Thali"
        subTitle="Your last login was"
      />
      <Row gutter={16}>
        <Col span={8}>
          <Card className='card-no-padding'>
            <div style={{padding: '5px'}}>Orders</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className='card-no-padding'>
          <div style={{padding: '5px'}}>Customers</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className='card-no-padding'>
          <div style={{padding: '5px'}}>Invoices</div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
