import NextLink from 'next/link';

import {
  Box,
  Container,
  Flex,
  Link,
  VisuallyHidden,
  useDisclosure,
} from '@chakra-ui/react';

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
          w="inherit"
        >
          <BasicIcon
            w="24px"
            h="24px"
            _hover={{ cursor: 'pointer' }}
            onClick={onOpen}
          />
          <Box as="h1" w="120px">
            <NextLink href="/">
              <Link
                display="block"
                width="100%"
                h="16px"
                backgroundImage="url('./icons/svg/main_logo.svg')"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
              >
                <VisuallyHidden>incourse run commerce logo</VisuallyHidden>
              </Link>
            </NextLink>
          </Box>
          <CartIcon w="24px" h="24px" _hover={{ cursor: 'pointer' }} />
        </Flex>
      </Container>
      <MobileNav isOpen={isOpen} onClose={onClose} size="sm" />
    </>
  );
};

export default Header;
