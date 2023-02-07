// import package modules
import { ElementType, useCallback } from 'react';
import { Button, Card, Checkbox, Col, Divider, Form, Modal, Row, Space, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';

import { ExcelDownloadFormDataType, values } from '../configs';

// Import global modules

// Import local modules

export interface ExcelDownloadModalProps {
  open: boolean;
  onClose(): void;
}

export default function ExcelDownloadModal({ open, onClose }: ExcelDownloadModalProps) {
  const [form] = Form.useForm<ExcelDownloadFormDataType>();

  const onFinish = useCallback((fields: ExcelDownloadFormDataType) => {
    console.log('fields:', fields);
  }, []);

  const onValuesChange = useCallback(
    (changedValues: Partial<ExcelDownloadFormDataType>, formValues: ExcelDownloadFormDataType) => {
      const [changedKey] = Object.keys(changedValues);

      if (changedKey === 'all') {
        const checkedAllValue = changedValues[changedKey];
        form.setFieldsValue(
          values.excelDownloadConfigs
            .map(({ groupList }) => groupList)
            .flat()
            .reduce((result, { group: { value: key }, itemList }) => {
              return {
                ...result,
                [`${key}-all`]: checkedAllValue,
                [key]: checkedAllValue ? itemList.map(({ value }) => value) : [],
              };
            }, {})
        );
      } else if (changedKey.includes('-all')) {
        const key = changedKey.replace('-all', '');
        const checkedAllValues = values.excelDownloadConfigs.reduce((result, current) => {
          const index = current.groupList.findIndex(({ group: { value } }) => value === key) ?? null;
          if (index !== -1) {
            return current.groupList[index].itemList.map(({ value }) => value);
          }
          return result;
        }, null as string[] | null);
        form.setFieldValue(key, formValues[changedKey as keyof ExcelDownloadFormDataType] ? checkedAllValues : []);
      }
    },
    [form]
  );

  return (
    <Modal
      centered
      title="데이터 다운로드"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <StyledForm
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <SubTitle>{'조회된 정보를 다운로드 합니다. 다운로드 받을 데이터를 선택해주세요.'}</SubTitle>
          </Col>
          <Col span={24}>
            <Form.Item
              name="all"
              valuePropName="checked"
            >
              <Checkbox>전체</Checkbox>
            </Form.Item>
          </Col>
          <StyledDivider />
          {values.excelDownloadConfigs.map(({ title, groupList }, i) => (
            <ConfigCol
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
                    title={
                      <Form.Item
                        name={`${group.value}-all`}
                        valuePropName="checked"
                      >
                        <Checkbox>{group.label}</Checkbox>
                      </Form.Item>
                    }
                  >
                    <Form.Item name={group.value}>
                      <CheckboxGroup options={itemList} />
                    </Form.Item>
                  </Card>
                ))}
              </StyledSpace>
            </ConfigCol>
          ))}
          <Col span={24}>
            <Form.Item>
              <DownloadButton
                type="primary"
                htmlType="submit"
                onClick={() => {
                  onClose();
                }}
              >
                다운로드
              </DownloadButton>
            </Form.Item>
          </Col>
        </Row>
      </StyledForm>
    </Modal>
  );
}

const DownloadButton = styled(Button)({
  ['&&']: {
    width: '100%',
    height: 40,
  },
});

const StyledForm = styled<ElementType>(Form)({
  ['.ant-form-item']: {
    marginBottom: 0,
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

const ConfigCol = styled(Col)({
  paddingBottom: 20,
});

const CheckboxGroup = styled(Checkbox.Group)({
  flexWrap: 'wrap',
});
