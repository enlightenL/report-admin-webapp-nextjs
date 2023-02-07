// import package modules
import { Fragment, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import { ThemeProvider } from 'styled-components';

// Import global modules
import Layout from '@/components/Layout';
import { Provider as AppProvider } from '@/contexts/Provider';
import { client } from '@/graphql/apollo';
import { useAuthStore } from '@/store/auth.state';
import theme from '@/styles/theme.json';

import '@/styles/globals.scss';

// Import local modules

export default function App({ Component, pageProps }: AppProps) {
  const authToken = useAuthStore((value) => value.authToken);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/login' && !authToken) {
      router.replace('/login');
    }
  }, [router, authToken]);

  const Wrapper = router.pathname !== '/login' ? Layout : Fragment;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ConfigProvider locale={koKR}>
          <AppProvider>
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          </AppProvider>
        </ConfigProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
