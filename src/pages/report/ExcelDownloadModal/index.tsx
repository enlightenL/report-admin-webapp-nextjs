// import package modules
import { Button, Card, Checkbox, Col, Divider, Modal, Row, Space, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';

import { values } from '../configs';

// Import global modules

// Import local modules

export interface ExcelDownloadModalProps {
  open: boolean;
  onClose(): void;
}

export default function ExcelDownloadModal({ open, onClose }: ExcelDownloadModalProps) {
  return (
    <Modal
      centered
      title="데이터 다운로드"
      open={open}
      onCancel={onClose}
      footer={
        <DownloadButton
          type="primary"
          onClick={() => {
            onClose();
          }}
        >
          다운로드
        </DownloadButton>
      }
    >
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <SubTitle>{'조회된 정보를 다운로드 합니다. 다운로드 받을 데이터를 선택해주세요.'}</SubTitle>
        </Col>
        <Col span={24}>
          <Checkbox>전체</Checkbox>
        </Col>
        <StyledDivider />
        {values.excelDownloadConfigs.map(({ title, groupList }, i) => (
          <Col
            key={i}
            span={24}
          >
            <StyledSpace
              direction="vertical"
              style={{ width: '100%' }}
            >
              <Title level={5}>{title}</Title>
              {groupList.map(({ group, itemList }, j) => (
                <Card
                  key={j}
                  size="small"
                  title={<Checkbox value={group.value}>{group.label}</Checkbox>}
                >
                  <CheckboxGroup
                    key={j}
                    options={itemList.map((item, key) => ({ ...item, key }))}
                  />
                </Card>
              ))}
            </StyledSpace>
          </Col>
        ))}
      </Row>
    </Modal>
  );
}

const DownloadButton = styled(Button)({
  ['&&']: {
    width: '100%',
    height: 40,
  },
});

const StyledDivider = styled(Divider)({
  ['&&']: {
    margin: 0,
  },
});

const SubTitle = styled(Typography)({
  ['&&']: {
    fontSize: 14,
    color: '#6C6565',
    whiteSpace: 'pre-line',
  },
});

const StyledSpace = styled(Space)({
  width: '100%',
});

const CheckboxGroup = styled(Checkbox.Group)({
  flexWrap: 'wrap',
});
