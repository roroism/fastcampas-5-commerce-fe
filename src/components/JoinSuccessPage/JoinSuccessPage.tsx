import NextLink from 'next/link';
import React from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Container,
  ContainerProps,
  Link,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';

interface JoinSuccessPageProps extends ChakraProps {
  containerProps?: ContainerProps;
}

function JoinSuccessPage({ ...containerProps }: JoinSuccessPageProps) {
  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      w={{ base: '375px' }}
      minH="812px"
      {...containerProps}
      background="center / 216px no-repeat url(/icons/svg/hands_clapping.svg)"
    >
      <VisuallyHidden as="h1">인코스런 커머스</VisuallyHidden>
      <VisuallyHidden as="h2">회원가입 완료</VisuallyHidden>
      <Box>
        <Text fontWeight="700" fontSize="1.625rem" lineHeight="1.5em" mt="80px">
          회원가입이 <br /> 완료되었습니다.
        </Text>
        <Text fontSize="12px" color="gray.600" pt="5px">
          관심사별로 자유롭게 소통해보세요!
        </Text>
      </Box>
      <NextLink href="/">
        <Link w="full" mb="30px">
          <Button
            fontSize="1rem"
            fontWeight="700"
            colorScheme="primary"
            w="343px"
            h="50px"
            borderRadius="25px"
            py="11px"
          >
            시작하기
          </Button>
        </Link>
      </NextLink>
    </Container>
  );
}

export default JoinSuccessPage;
