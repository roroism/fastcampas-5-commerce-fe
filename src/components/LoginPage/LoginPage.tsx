import React from 'react';

import { Box, ChakraProps, Flex, Image, Text, VStack } from '@chakra-ui/react';

import SocialButton from '@components/common/SocialButton';

interface LoginPageProps extends ChakraProps {}

function LoginPage({ ...basisProps }: LoginPageProps) {
  return (
    <VStack
      w="full"
      py="50px"
      bg="primary.500"
      h="812px"
      justify="space-between"
      {...basisProps}
    >
      <Flex h="100%">
        <Image src="/icons/svg/LOGO.svg" alt="logo" />
      </Flex>

      <SocialButton
        data={{
          social: 'kakao',
          link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/login/kakao`,
        }}
        size="md"
      />
    </VStack>
  );
}

export default LoginPage;
