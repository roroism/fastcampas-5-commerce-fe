import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import HomeHeader from './_fragments/HomeHeader';

interface HomeLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const HomeLayout = ({
  //
  // header = <HomeHeader />,
  header,
  footer,
  containerProps,
  content,
}: HomeLayoutProps) => {
  return (
    <>
      {header}
      <Container
        pt={LAYOUT.HEADER.HEIGHT}
        w={{ base: '375px', md: '600px' }}
        {...containerProps}
        backgroundColor="red"
      >
        {content}
      </Container>
      {footer}
    </>
  );
};

export default HomeLayout;
