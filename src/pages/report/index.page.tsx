// import package modules
import { Suspense, useMemo, useState } from 'react';
import { dehydrate, DehydratedState, QueryClient, useQuery } from 'react-query';
import { GetStaticPropsResult } from 'next';
import { Button, Col, Radio, Row, Select, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';

// Import global modules
import ReportQuery from '@/graphql/queries/getReport.gql';
import { GetReportQuery } from '@/graphql/schema';
import getGraphqlQueryFn from '@/hooks/getGraphqlQueryFn';

// Import local modules
import BulkCreateModal from './BulkCreateModal';
import { values } from './configs';
import ExcelDownloadModal from './ExcelDownloadModal';
import ListTable from './ListTable';
import SearchOptions from './SearchOptions';

export interface ReportProps {
  dehydratedState: DehydratedState;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ReportProps>> {
  const client = new QueryClient();
  await client.prefetchQuery('report', getGraphqlQueryFn<GetReportQuery>(ReportQuery));
  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
}

export default function Report() {
  const [openBulkCreateModal, setOpenBulkCreateModal] = useState<boolean>(false);
  const [openExcelDownloadModal, setOpenExcelDownloadModal] = useState<boolean>(false);
  const [count, setCount] = useState<'10' | '50' | '100' | 'all'>('100');

  const { data } = useQuery('report', getGraphqlQueryFn<GetReportQuery>(ReportQuery), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const reportData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.report;
  }, [data]);

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <StyledRow
        gutter={[0, 20]}
        justify="space-between"
      >
        <Col span={24}>
          <Title level={3}>현장 진단 보고서</Title>
        </Col>
        <Col span={24}>
          <Radio.Group
            size="large"
            defaultValue="all"
            optionType="button"
            options={values.filterTabs}
          />
        </Col>
        <Col span={24}>
          <SearchOptions />
        </Col>
        <TotalCol>
          <Space
            size={10}
            align="center"
          >
            <Title level={5}>총 {reportData.length}개</Title>
            <Select
              value={count}
              options={[
                { label: '10개', value: '10' },
                { label: '50개', value: '50' },
                { label: '100개', value: '100' },
                { label: '전체', value: 'all' },
              ]}
              onChange={setCount}
            />
          </Space>
        </TotalCol>
        <Col>
          <Row
            justify="end"
            gutter={[10, 10]}
          >
            <Col>
              <Button type="primary">+ 신규등록</Button>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => setOpenBulkCreateModal(true)}
              >
                + 대량등록
              </Button>
            </Col>
            <ButtonsCol span={24}>
              <Space
                size={10}
                align="center"
              >
                <Title level={5}>선택한 발전소</Title>
                <Button type="primary">문자 발송</Button>
                <Button type="primary">이메일 발송</Button>
                <Button type="primary">발전왕 노출</Button>
                <Button>삭제</Button>
                <Button onClick={() => setOpenExcelDownloadModal(true)}>엑셀 다운로드</Button>
              </Space>
            </ButtonsCol>
          </Row>
        </Col>
        <Col span={24}>
          <ListTable
            data={reportData}
            count={count === 'all' ? null : +count}
          />
        </Col>
      </StyledRow>
      <BulkCreateModal
        open={openBulkCreateModal}
        onClose={() => setOpenBulkCreateModal(false)}
      />
      <ExcelDownloadModal
        open={openExcelDownloadModal}
        onClose={() => setOpenExcelDownloadModal(false)}
      />
    </Suspense>
  );
}

const StyledRow = styled(Row)({
  padding: 20,
});

const TotalCol = styled(Col)({
  display: 'flex',
  alignItems: 'flex-end',
});

const ButtonsCol = styled(Col)({
  ['&&']: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
