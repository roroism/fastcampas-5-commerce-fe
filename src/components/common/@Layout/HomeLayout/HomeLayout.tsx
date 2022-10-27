import React from 'react';

import { Box, Container, ContainerProps, Flex } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import Footer from './Footer';
import Header from './Header';

interface HomeLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const HomeLayout = ({
  header = <Header />,
  footer = <Footer />,
  containerProps,
  content,
}: HomeLayoutProps) => {
  return (
    <Flex minH="100vh" flexDirection="column">
      {header}
      <Container
        flexGrow="1"
        display="flex"
        flexDirection="column"
        as="main"
        pt={LAYOUT.HEADER.HEIGHT}
        w={{ base: '375px' }}
        {...containerProps}
        p={0}
      >
        {content}
      </Container>
      {footer}
    </Flex>
  );
};

export default HomeLayout;
