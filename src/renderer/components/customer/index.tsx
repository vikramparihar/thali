import { Tabs, Card, Row, Col, PageHeader } from 'antd';
export default function Customer() {
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Customers"
        subTitle="Manage listing and create, edit, delete operations"
      />
      <Row>
        <Col span={24}>
          <Card></Card>
        </Col>
      </Row>
    </>
  );
}
