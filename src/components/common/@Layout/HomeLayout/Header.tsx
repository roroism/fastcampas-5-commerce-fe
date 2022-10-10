import NextLink from 'next/link';

import {
  Box,
  Button,
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
        <VisuallyHidden as="h2">navigation area</VisuallyHidden>
        <Flex
          h={LAYOUT.HEADER.HEIGHT}
          alignItems="center"
          justifyContent="space-between"
          position="fixed"
          px="16px"
          zIndex="999"
          w="inherit"
        >
          <Box>
            <VisuallyHidden as="h3">카테고리</VisuallyHidden>
            <Button variant="unstyled" onClick={onOpen}>
              <BasicIcon w="24px" h="24px" />
            </Button>
          </Box>

          <Box as="h3" w="120px">
            <NextLink href="/" passHref>
              <Link
                display="block"
                width="100%"
                h="16px"
                backgroundImage="url('/icons/svg/main_logo.svg')"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
              >
                <VisuallyHidden>incourse run commerce logo</VisuallyHidden>
              </Link>
            </NextLink>
          </Box>
          <Box>
            <VisuallyHidden as="h3">장바구니</VisuallyHidden>
            <NextLink href="/cart" passHref>
              <Link>
                <CartIcon w="24px" h="24px" _hover={{ cursor: 'pointer' }} />
              </Link>
            </NextLink>
          </Box>
        </Flex>
      </Container>
      <MobileNav isOpen={isOpen} onClose={onClose} size="sm" />
    </>
  );
};

export default Header;
