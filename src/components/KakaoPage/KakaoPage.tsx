import router from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, ChakraProps, Flex, Spinner, Text } from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';

import { setToken } from '@utils/localStorage/token';

interface ISocialLogin {
  isRegister: boolean;
  socialToken: string;
  access?: string;
  refresh?: string;
}

interface KakaoPageProps extends ChakraProps {}

function KakaoPage({ ...basisProps }: KakaoPageProps) {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');

    console.log('code : ', code);
    console.log('state : ', state);
    console.log(
      'post : ',
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/social_login/`,
    );
    instance
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/social_login/`, {
        code: code,
        state: state,
      })
      .then((res) => {
        console.log('res : ', res);
        const socialLoginInfo: ISocialLogin = res.data;

        if (socialLoginInfo.isRegister) {
          setToken({
            isRegister: socialLoginInfo.isRegister,
            access: socialLoginInfo.access as string,
            refresh: socialLoginInfo.refresh as string,
          });
          setAuthHeader(socialLoginInfo.access as string);
          router.push('/');
        } else {
          router.push({
            pathname: '/join',
            query: { socialToken: socialLoginInfo.socialToken },
          });
        }
      })
      .catch((err) => {
        console.log('err : ', err);
        // router.replace('/');
      });
  }, []);

  return (
    <>
      <Box {...basisProps} h="100%">
        <Flex w="full" h="full" justify="center" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </Flex>
      </Box>
    </>
  );
}

export default KakaoPage;
