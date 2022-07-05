import { Tabs, Card, Row, Col, PageHeader } from 'antd';
export default function invoice() {
  const { TabPane } = Tabs;
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Invoice"
        subTitle="Manage listing and create, edit, delete operations"
      />
      <Row>
        <Col span={24}>
          <Card>
            
          </Card>
        </Col>
      </Row>
    </>
  );
}
