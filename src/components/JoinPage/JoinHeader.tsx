import { Container, Flex, Image } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

const JoinHeader = () => {
  return (
    <Container as="header" w={{ base: '375px' }}>
      <Flex h={LAYOUT.HEADER.HEIGHT} alignItems="center" w="inherit">
        <Image src="/icons/svg/join_LOGO.svg" alt="logo" />
      </Flex>
    </Container>
  );
};

export default JoinHeader;
