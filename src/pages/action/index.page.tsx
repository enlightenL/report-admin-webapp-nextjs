// import package modules
import { Layout } from 'antd';
import styled from 'styled-components';

// Import global modules

// Import local modules

export default function Action() {
  return <StyledLayout>Action</StyledLayout>;
}

const StyledLayout = styled(Layout)({
  width: 'calc(100% - 200px)',
  padding: 20,
});
