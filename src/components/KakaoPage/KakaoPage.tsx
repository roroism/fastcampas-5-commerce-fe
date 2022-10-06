import router from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, ChakraProps, Flex, Spinner, Text } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

interface KakaoPageProps extends ChakraProps {}

function KakaoPage({ ...basisProps }: KakaoPageProps) {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    // const code =
    //   'hThnDVDU_tErJis5eIcNxiWRIJKyG0TmKnETDiqkmpkBBXaliJe3r7lCBdcDQdm23NUqPgopcFAAAAGDq2XA4Q';
    // const code =
    //   'W5eYyHm4JN3dKaS_M9pw1reXE5PlpSa30GmfEEYGeExYhvPlzJiaSOILb3YU8VFAAFrQaQo9dZsAAAGDq22grg';
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
        // router.replace('/');
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
