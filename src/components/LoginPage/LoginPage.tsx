import React from 'react';

import { CONFIG } from '@config';

import { Box, ChakraProps, Flex, Image, Text, VStack } from '@chakra-ui/react';

import SocialButton from '@components/common/SocialButton';

import { SOCIAL } from '@constants/social';

const SOCIAL_REDIRECT_URL = `${CONFIG.DOMAIN}`;

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
          // link: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${SOCIAL.KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/login/redirect/kakao&state=kakao`,
          link: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${SOCIAL.KAKAO_CLIENT_ID}&redirect_uri=${SOCIAL_REDIRECT_URL}&state=kakao`,
          // link: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${SOCIAL.KAKAO_CLIENT_ID}&redirect_uri=${SOCIAL_REDIRECT_URL}/social_login/callback&state=kakao`,
        }}
        size="md"
      />
    </VStack>
  );
}

export default LoginPage;
