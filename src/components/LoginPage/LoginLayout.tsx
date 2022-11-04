import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

interface LoginLayoutProps {
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const LoginLayout = ({ containerProps, content }: LoginLayoutProps) => {
  return (
    <Container
      w={{ base: '375px' }}
      {...containerProps}
      px={0}
      position="relative"
      zIndex="2000"
    >
      {content}
    </Container>
  );
};

export default LoginLayout;
