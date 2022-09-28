import { Container, Flex, useDisclosure } from '@chakra-ui/react';

import MobileNav from '@components/ModalsPage/MobileNav';

import { LAYOUT } from '@constants/layout';

import { BasicIcon, CartIcon } from 'generated/icons/MyIcons';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
          <BasicIcon
            w="24px"
            h="24px"
            _hover={{ cursor: 'pointer' }}
            onClick={onOpen}
          />
          <CartIcon w="24px" h="24px" _hover={{ cursor: 'pointer' }} />
        </Flex>
      </Container>
      <MobileNav isOpen={isOpen} onClose={onClose} size="sm" />
    </>
  );
};

export default Header;
