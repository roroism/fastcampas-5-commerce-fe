import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import JoinHeader from './JoinHeader';

interface JoinLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const JoinLayout = ({
  header = <JoinHeader />,
  footer,
  containerProps,
  content,
}: JoinLayoutProps) => {
  return (
    <>
      {header}
      <Container w={{ base: '375px' }} {...containerProps}>
        {content}
      </Container>
    </>
  );
};

export default JoinLayout;
