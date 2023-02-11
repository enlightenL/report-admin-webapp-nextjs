// import package modules
import { DownloadOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import styled from 'styled-components';

// Import global modules

// Import local modules

export interface BulkCreateModalProps {
  open: boolean;
  onClose(): void;
}

export default function BulkCreateModal({ open, onClose }: BulkCreateModalProps) {
  return (
    <Modal
      centered
      title="데이터 대량 등록"
      open={open}
      onCancel={onClose}
      footer={
        <SubmitButton
          type="primary"
          onClick={() => {
            onClose();
          }}
        >
          등록하기
        </SubmitButton>
      }
    >
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <SubTitle>{`등록할 데이터를 업로드 해주세요.
엑셀 파일(csv, xls, xlsx)만 업로드 가능합니다.`}</SubTitle>
        </Col>
        <Col span={24}>
          <DownloadButton icon={<DownloadOutlined />}>예제파일 내려받기</DownloadButton>
        </Col>
        <Col span={24}>
          <Dragger height={100}>
            <Space size={20}>
              <Typography>파일 끌어오기 또는 찾기</Typography>
              <FolderIcon />
            </Space>
          </Dragger>
        </Col>
      </Row>
    </Modal>
  );
}

const SubmitButton = styled(Button)({
  ['&&']: {
    width: '100%',
    height: 40,
  },
});

const SubTitle = styled(Typography)({
  ['&&']: {
    fontSize: 14,
    color: '#6C6565',
    whiteSpace: 'pre-line',
  },
});

const DownloadButton = styled(Button)({
  ['&&']: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    height: 50,
  },
});

const FolderIcon = styled(FolderOpenOutlined)({
  fontSize: 36,
});
