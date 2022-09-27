import { Container, Flex } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import { BasicIcon, CartIcon } from 'generated/icons/MyIcons';

const Header = () => {
  return (
    <Container px={0} as="header" w={{ base: '375px' }}>
      <Flex
        h={LAYOUT.HEADER.HEIGHT}
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        px="16px"
        zIndex="999"
        backgroundColor="yellow"
        w="inherit"
      >
        <BasicIcon w="24px" h="24px" />
        <CartIcon w="24px" h="24px" />
      </Flex>
    </Container>
  );
};

export default Header;
