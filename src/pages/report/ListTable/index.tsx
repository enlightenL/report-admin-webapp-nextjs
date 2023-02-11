// import package modules
import { ElementType, Key, useMemo } from 'react';
import { Button, Switch, Table } from 'antd';
import styled from 'styled-components';

// Import global modules
// Import local modules
import { values } from '../configs';

export interface ListTableProps<DataType> {
  data: DataType[];
  count: number | null;
}

export default function ListTable<DataType>({ data, count }: ListTableProps<DataType>) {
  const columns = useMemo(() => {
    return values.columns.map((column) => {
      const dataIndex = column.dataIndex as string;

      if (dataIndex === 'step') {
        return {
          ...column,
          render(value: number) {
            return value ? `${value}회차` : '-';
          },
        };
      }

      if (['smsSend', 'emailSend'].includes(dataIndex)) {
        return {
          ...column,
          render(value: 'send' | 'resend' | 'disabled') {
            return value === 'send' ? (
              <Button type="primary">발송</Button>
            ) : value === 'resend' ? (
              <Button type="primary">재발송</Button>
            ) : (
              <Button
                type="primary"
                disabled
              >
                발송
              </Button>
            );
          },
        };
      }

      if (dataIndex === 'show') {
        return {
          ...column,
          render(value: boolean) {
            return <Switch defaultChecked={value} />;
          },
        };
      }

      if (dataIndex === 'remove') {
        return {
          ...column,
          render() {
            return <Button>삭제</Button>;
          },
        };
      }

      return {
        ...column,
        render(value: any) {
          return value ?? '-';
        },
      };
    });
  }, []);

  const rowSelection = {
    onChange(selectedRowKeys: Key[], selectedRows: DataType[]) {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <StyledTable
      bordered
      size="small"
      columns={columns}
      rowKey={(item: any) => item.no}
      rowSelection={rowSelection}
      dataSource={data}
      pagination={
        count == null
          ? false
          : {
              pageSize: count,
              showSizeChanger: false,
            }
      }
      scroll={{ x: 3600 }}
    />
  );
}

const StyledTable = styled<ElementType>(Table)({
  ['.ant-table-tbody .ant-table-cell:not(.ant-table-selection-column)']: {
    cursor: 'pointer',
  },
});
