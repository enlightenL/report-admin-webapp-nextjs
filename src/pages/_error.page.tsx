// import package modules
import { ReactNode, useCallback } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { Button, Col, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';

// Import global modules
import { values } from '@/configs';

// Import local modules

export interface ErrorProps {
  statusCode: number;
}

export default function Error({ statusCode }: ErrorProps) {
  const router = useRouter();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const goIndex = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <ErrorLayout
      justify="center"
      align="middle"
    >
      <Col>
        <Space
          direction="vertical"
          align="center"
          size={20}
        >
          <>
            <Title>
              {statusCode}: {values.errorConfigs[statusCode]?.title}
            </Title>
            <Title level={3}>{values.errorConfigs[statusCode]?.subTitle}</Title>
            <Title level={5}>{values.errorConfigs[statusCode]?.description}</Title>
            {(values.errorConfigs[statusCode]?.backButton || values.errorConfigs[statusCode]?.indexButton) && (
              <Space size={40}>
                {values.errorConfigs[statusCode]?.backButton && (
                  <Button
                    size="large"
                    onClick={goBack}
                  >
                    뒤로가기
                  </Button>
                )}
                {values.errorConfigs[statusCode]?.indexButton && (
                  <Button
                    size="large"
                    type="primary"
                    onClick={goIndex}
                  >
                    홈으로 돌아가기
                  </Button>
                )}
              </Space>
            )}
          </>
        </Space>
      </Col>
    </ErrorLayout>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

Error.getLayout = (page: ReactNode) => page;

const ErrorLayout = styled(Row)({
  height: '100%',
});
