import React, { useEffect, useState } from 'react';

import { Box, ChakraProps, Flex, Spinner, Text } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

interface KakaoPageProps extends ChakraProps {}

function KakaoPage({ ...basisProps }: KakaoPageProps) {
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    const code1 = new URL(window.location.href).searchParams.get('code');
    const state1 = new URL(window.location.href).searchParams.get('state');
    setCode(code1);
    setState(state1);
    console.log('code : ', code);
    console.log('state : ', state);
    console.log(
      'post : ',
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/social_login`,
    );
    instance
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/social_login`, {
        code: code1,
        state: 'kakao',
      })
      .then((res) => {
        console.log('res : ', res);
      });
  }, []);

  return (
    <>
      {console.log('code : ', code)}
      {console.log('state : ', state)}
      {console.log(
        'post : ',
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/social_login`,
      )}

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
