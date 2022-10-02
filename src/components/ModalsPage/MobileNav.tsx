import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Image,
  Link,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { LogoutModal } from '@components/Modals';

import { LogoutIcon } from 'generated/icons/MyIcons';

const TitleText = {
  fontWeight: 700,
  fontSize: '1.25rem',
};

const MenuText = {
  fontWeight: 700,
  fontSize: '1rem',
};

interface MobileNavProps extends DrawerProps {}

function MobileNav(props: Omit<MobileNavProps, 'children'>) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Drawer placement="left" {...props}>
        <DrawerOverlay />
        <DrawerContent borderRight="62px solid rgba(26, 26, 26, 0.2)">
          <DrawerCloseButton />
          {/* <DrawerHeader></DrawerHeader> */}
          <DrawerBody>
            <Box as="h2" {...TitleText} px="1rem" mt="80px">
              카테고리
            </Box>
            <VStack as="ul" spacing={0} pt="30px" alignItems="flex-start">
              <Flex
                as="li"
                alignItems="center"
                borderY="1px solid #F2F3F4"
                w="full"
              >
                <NextLink href="/">
                  <Link
                    p="16px"
                    _hover={{ cursor: 'pointer' }}
                    display="block"
                    w="full"
                  >
                    <Button variant="unstyled" minWidth={0} {...MenuText}>
                      홈
                    </Button>
                  </Link>
                </NextLink>
              </Flex>
              <Flex
                as="li"
                alignItems="center"
                borderY="1px solid #F2F3F4"
                w="full"
              >
                <NextLink href="/products">
                  <Link
                    p="16px"
                    _hover={{ cursor: 'pointer' }}
                    display="block"
                    w="full"
                  >
                    <Button variant="unstyled" {...MenuText}>
                      상품보기
                    </Button>
                  </Link>
                </NextLink>
              </Flex>
              <Flex
                as="li"
                alignItems="center"
                borderY="1px solid #F2F3F4"
                w="full"
              >
                <NextLink href="/mypage">
                  <Link
                    p="16px"
                    _hover={{ cursor: 'pointer' }}
                    display="block"
                    w="full"
                  >
                    <Button variant="unstyled" {...MenuText}>
                      마이페이지
                    </Button>
                  </Link>
                </NextLink>
              </Flex>
            </VStack>
          </DrawerBody>
          <DrawerFooter p={0} justifyContent="flex-start">
            <Flex mb="25px" ml="16px">
              <Image src="/icons/svg/logout.svg" alt="logout" mr="4px" />
              <Button variant="unstyled" {...TitleText} onClick={onOpen}>
                로그아웃
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <LogoutModal title="logout modal" isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default MobileNav;
