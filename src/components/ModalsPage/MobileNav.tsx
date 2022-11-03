import NextLink from 'next/link';
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
  Text,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Drawer placement="left" {...props}>
        <DrawerOverlay />
        <DrawerContent borderRight="62px solid rgba(26, 26, 26, 0.2)">
          <DrawerCloseButton />
          {/* <DrawerHeader></DrawerHeader> */}
          <DrawerBody>
            <Box {...TitleText} px="1rem" mt="80px">
              <Text as="h2">카테고리</Text>
            </Box>
            <VStack as="ul" spacing={0} pt="30px" alignItems="flex-start">
              <Flex
                as="li"
                alignItems="center"
                borderY="1px solid #F2F3F4"
                w="full"
              >
                <NextLink href="/" passHref>
                  <Link p="16px" display="block" w="full">
                    <Button variant="unstyled" minWidth={0} {...MenuText}>
                      <Text as="h3">홈</Text>
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
                <NextLink href="/products" passHref>
                  <Link p="16px" display="block" w="full">
                    <Button variant="unstyled" {...MenuText}>
                      <Text as="h3">상품보기</Text>
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
                <NextLink href="/mypage" passHref>
                  <Link p="16px" display="block" w="full">
                    <Button variant="unstyled" {...MenuText}>
                      <Text as="h3">마이페이지</Text>
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
                <Text as="h3">로그아웃</Text>
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
