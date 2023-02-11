// import package modules
import { ReactNode, useEffect } from 'react';
import { Hydrate, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import { ThemeProvider } from 'styled-components';

// Import global modules
import { fonts } from '@/assets/fonts';
import DefaultLayout from '@/components/DefaultLayout';
import { Provider as AppProvider } from '@/contexts/Provider';
import { client } from '@/graphql/apollo';
import { useAuthStore } from '@/store/auth.state';
import theme from '@/styles/theme.json';

import '@/styles/globals.scss';

// Import local modules

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?(page: ReactNode): JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache(),
    defaultOptions: {
      queries: {
        retry: 0,
        suspense: true,
      },
    },
  });

  const authToken = useAuthStore((value) => value.authToken);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/login' && !authToken) {
      router.replace('/login');
    }
  }, [router, authToken]);

  const getLayout = Component.getLayout ?? ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <ConfigProvider locale={koKR}>
              <AppProvider>
                <style
                  jsx
                  global
                >{`
                  * {
                    font-family: ${fonts.style.fontFamily} !important;
                  }
                `}</style>
                {getLayout(<Component {...pageProps} />)}
              </AppProvider>
            </ConfigProvider>
          </ThemeProvider>
        </ApolloProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
