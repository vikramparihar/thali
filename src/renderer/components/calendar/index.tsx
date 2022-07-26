import { Tabs, Card, Row, Col, PageHeader } from 'antd';
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
export default function CCalendar() {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Calendar"
        subTitle="Manage listing and create, edit, delete operations"
      />
      <Row>
        <Col span={24}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </Col>
      </Row>
    </>
  );
}
