// import package modules
import Link from 'next/link';
import { Col, Row } from 'antd';

// Import global modules

// Import local modules

export default function Index() {
  return (
    <Row>
      <Col span={24}>index</Col>
      <Col span={24}>
        <Link href="/hello">hello</Link>
      </Col>
    </Row>
  );
}
