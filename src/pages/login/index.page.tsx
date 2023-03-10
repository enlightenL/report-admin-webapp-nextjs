// import package modules
import { ReactNode, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { Button, Col, Form, Input, Row } from 'antd';
import request from 'graphql-request';
import styled from 'styled-components';
import { v1 } from 'uuid';

// Import global modules
import ENlightenLogo from '@/assets/images/enlighten-logo.svg';
import HeukhyeongImg from '@/assets/images/흑형.jpeg';
import LoginDocument from '@/graphql/mutations/login.gql';
import AuthQuery from '@/graphql/queries/isAuthenticated.gql';
import { LoginMutation, LoginMutationVariables } from '@/graphql/schema';
import getGraphqlQueryFn from '@/hooks/getGraphqlQueryFn';
import { useAuthStore } from '@/store/auth.state';

// Import local modules

export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();
  const authToken = useAuthStore((value) => value.authToken);
  const setAuthToken = useAuthStore((value) => value.setAuthToken);

  const mutation = useMutation(
    (variables: LoginMutationVariables) =>
      request<LoginMutation>(process.env.NEXT_PUBLIC_GRAPHQL_API_URL, LoginDocument, variables),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );
  const [isAuthenticated] = useLazyQuery(AuthQuery, {
    onCompleted(data) {
      console.log('response:', data);
    },
  });

  useEffect(() => {
    if (authToken) {
      router.push('/report');
    }
  }, [router, authToken]);

  const onLogin = useCallback(
    ({ code }: { code: string }) => {
      isAuthenticated();
      // mutation.mutate({ code: '1234' });
      // setAuthToken(v1());
      // router.push('/report');
    },
    [setAuthToken, router]
  );

  return (
    <>
      <StyledRow gutter={[0, 30]}>
        <Col>
          <Image
            priority
            src={HeukhyeongImg}
            alt="sample"
          />
        </Col>
        <Col>
          <Form>
            <Form.Item
              name="phone"
              label="연락처"
            >
              <Row gutter={[10, 0]}>
                <Col span={12}>
                  <Form.Item name="phone">
                    <Input
                      type="phone"
                      placeholder="000-0000-0000"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="submit">
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      코드 전송
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Form>
          <Form
            form={form}
            onFinish={onLogin}
          >
            <Form.Item
              name="code"
              label="인증코드"
              rules={[
                {
                  type: 'string',
                  message: '휴대폰으로 전송된 인증코드 4자리를 입력해주세요.',
                },
              ]}
            >
              <Row gutter={[10, 0]}>
                <Col span={12}>
                  <Form.Item
                    name="code"
                    rules={[
                      {
                        type: 'string',
                        message: '휴대폰으로 전송된 인증코드 4자리를 입력해주세요.',
                      },
                    ]}
                  >
                    <Input placeholder="인증코드 4자리" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="submit">
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      로그인
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </StyledRow>
      <Logo />
    </>
  );
}

Login.getLayout = (page: ReactNode) => page;

const StyledRow = styled(Row)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const Logo = styled(ENlightenLogo)({
  position: 'absolute',
  right: 50,
  bottom: 50,
});
