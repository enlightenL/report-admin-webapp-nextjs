// import package modules
import { Button, Card, Col, DatePicker, Divider, Form, Input, Row, Select } from 'antd';
import styled from 'styled-components';

// Import global modules

// Import local modules

export default function SearchOptions() {
  const [form] = Form.useForm();

  return (
    <Card headStyle={{ display: 'none' }}>
      <StyledForm form={form}>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="회원명"
            >
              <Input placeholder="회원명" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="연락처"
            >
              <Input
                type="tel"
                placeholder="연락처"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="siteId"
              label="발전소 ID"
            >
              <Input placeholder="발전소 ID" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="siteName"
              label="발전소명"
            >
              <Input placeholder="발전소명" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <AddressFormItem label="주소">
              <Form.Item name="region">
                <Select
                  placeholder="지역"
                  options={[]}
                />
              </Form.Item>
              <Form.Item name="addressDetail">
                <Input placeholder="상세주소" />
              </Form.Item>
            </AddressFormItem>
          </Col>
          <Col span={12}>
            <Form.Item
              name="step"
              label="회차"
            >
              <Input
                type="number"
                placeholder="회차"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="period"
              label="작성기간"
            >
              <DatePicker.RangePicker placeholder={['YYYY-MM-DD', 'YYYY-MM-DD']} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="requestYn"
              label="조치 신청 여부"
            >
              <Select
                placeholder="전체"
                options={[
                  { label: 'Y', value: 'Y' },
                  { label: 'N', value: 'N' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider />
          </Col>
          <CardFooter span={24}>
            <Button htmlType="reset">초기화</Button>
            <Button
              type="primary"
              htmlType="submit"
            >
              검색
            </Button>
          </CardFooter>
        </Row>
      </StyledForm>
    </Card>
  );
}

const StyledForm = styled(Form)({
  ['.ant-form-item-label']: {
    textAlign: 'left',
    width: 100,
  },
  ['.ant-input']: {
    maxWidth: 180,
  },
  ['&& .ant-select']: {
    width: 100,
  },
  ['.ant-picker']: {
    width: 300,
  },
});

const AddressFormItem = styled(Form.Item)({
  ['.ant-form-item']: {
    marginBottom: 0,
    [':nth-child(2)']: {
      width: '100%',
    },
  },
  ['.ant-form-item-control-input-content']: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    ['.ant-input']: {
      maxWidth: 400,
    },
  },
});

const CardFooter = styled(Col)({
  ['&&']: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
