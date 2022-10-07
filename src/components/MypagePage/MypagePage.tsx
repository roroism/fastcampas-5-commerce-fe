import NextLink from 'next/link';
import React from 'react';

import {
  Box,
  ChakraProps,
  Flex,
  Image,
  Link,
  Text,
  VisuallyHidden,
  useDisclosure,
} from '@chakra-ui/react';

import { LogoutModal } from '@components/Modals';

import { LAYOUT } from '@constants/layout';

interface MypagePageProps extends ChakraProps {}

function MypagePage({ ...basisProps }: MypagePageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        mt={LAYOUT.HEADER.HEIGHT}
        {...basisProps}
        bgColor="gray.100"
        pb="30px"
      >
        <VisuallyHidden as="h2">main contents</VisuallyHidden>

        <Box bgColor="white" pb="30px" px="16px" pt="70px">
          <VisuallyHidden as="h3">my information</VisuallyHidden>
          <Flex flexDirection="column">
            {/* <Text fontSize="1.25rem" fontWeight="700">{data.name}</Text> */}
            <Text fontSize="1.25rem" fontWeight="700">
              김인코스런
            </Text>
            {/* <Text fontSize="1rem" fontWeight="400" color="gray.400">{data.email}</Text> */}
            <Text fontSize="1rem" fontWeight="400" color="gray.400">
              incourse.run@gmail.com
            </Text>
          </Flex>
        </Box>

        <Box bgColor="white" mt="10px">
          <Flex color="gray.800">
            <Box w="33.33%">
              <NextLink href="/" passHref>
                <Link
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  py="36px"
                >
                  <Box
                    w="40%"
                    pb="40%"
                    background="center / cover no-repeat url('./icons/svg/mypage/estimate.svg')"
                  ></Box>
                  <Text as="h3">회원정보수정</Text>
                </Link>
              </NextLink>
            </Box>
            <Box w="33.33%">
              <NextLink href="/" passHref>
                <Link
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  py="36px"
                >
                  <Box
                    w="40%"
                    pb="40%"
                    background="center / cover no-repeat url('./icons/svg/mypage/orderhistory.svg')"
                  ></Box>
                  <Text as="h3">주문내역</Text>
                </Link>
              </NextLink>
            </Box>
            <Box w="33.33%">
              <NextLink href="/review" passHref>
                <Link
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  py="36px"
                >
                  <Box
                    w="40%"
                    pb="40%"
                    background="center / cover no-repeat url('./icons/svg/mypage/book.svg')"
                  ></Box>
                  <Text as="h3">내 상품 리뷰</Text>
                </Link>
              </NextLink>
            </Box>
          </Flex>
        </Box>

        <Box bgColor="white" mt="10px">
          <Box borderBottom="1px solid" borderColor="gray.200">
            <NextLink href="/withdrawal" passHref>
              <Link
                display="flex"
                justifyContent="space-between"
                px="16px"
                py="16px"
              >
                <Text as="h3">회원탈퇴</Text>
                <Box
                  w="24px"
                  alignSelf="strech"
                  background="center / cover no-repeat url('./icons/svg/mypage/arrow.svg')"
                ></Box>
              </Link>
            </NextLink>
          </Box>
          <Box borderBottom="1px solid" borderColor="gray.200">
            <Link
              display="flex"
              justifyContent="space-between"
              px="16px"
              py="16px"
              onClick={onOpen}
            >
              <Text as="h3">로그아웃</Text>
              <Box
                w="24px"
                alignSelf="strech"
                background="center / cover no-repeat url('./icons/svg/mypage/arrow.svg')"
              ></Box>
            </Link>
          </Box>
        </Box>
      </Box>
      <LogoutModal title="logout modal" isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default MypagePage;
