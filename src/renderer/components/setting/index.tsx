import { Tabs, Card, Row, Col, PageHeader } from 'antd';
export default function setting() {
  const { TabPane } = Tabs;
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Setting"
        subTitle="Manage basic settings like(tax, invoice, billing etc..)"
      />
      <Row>
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Tax Setting" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="General Setting" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Invoice Setting" key="3">
                Invoice Setting
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
}
