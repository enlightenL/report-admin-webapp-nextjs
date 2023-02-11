// import package modules
import { PropsWithChildren, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Layout as AntdLayout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import styled from 'styled-components';

// Import global modules

// Import local modules

export default function DefaultLayout({ children }: PropsWithChildren<{}>) {
  const router = useRouter();

  const onRoute: MenuClickEventHandler = useCallback(
    ({ key }) => {
      router.push(`/${key}`);
    },
    [router]
  );

  return (
    <StyledLayout>
      <StyledMenu
        defaultSelectedKeys={['report']}
        items={[
          {
            key: 'report',
            label: '현장 진단 보고서',
            onClick: onRoute,
          },
          {
            key: 'action',
            label: '조치 신청 내역',
            onClick: onRoute,
          },
        ]}
      />
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
}

const StyledLayout = styled(AntdLayout)({
  ['&&']: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
});

const StyledContent = styled(Content)({
  width: 'calc(100% - 200px)',
  marginLeft: 200,
});

const StyledMenu = styled(Menu)({
  position: 'fixed',
  width: 200,
  height: '100%',
});
