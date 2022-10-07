import { useRouter } from 'next/router';
import React from 'react';

import { ChakraProps } from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';

import { setToken } from '@utils/localStorage/token';

import customUseForm from './CustomUseForm';
import JoinPageView from './JoinPage.view';

interface IRegister {
  socialToken: string;
  email: string;
  phone: string;
  name: string;
  nickname: string;
  profile: string;
  gender: 'male' | 'female';
  age: number;
  marketingAdAgree: boolean;
}

interface JoinPageProps extends ChakraProps {}

function JoinPage({ ...basisProps }: JoinPageProps) {
  const formData = customUseForm();
  const { handleSubmit } = formData;

  const router = useRouter();

  console.log('socialToken : ', router.query.socialToken);
  const onSubmit = handleSubmit((data) => {
    console.log(
      data.email,
      data.phone.replace(/-/g, ''),
      data.name,
      data.nickname,
      data.gender,
      data.age,
      data.agreeMarketing,
      data.profile,
    );

    // const form = new FormData();
    // form.append();

    instance
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/register/`, {
        socialToken: router.query.socialToken,
        email: data.email,
        phone: data.phone.replace(/-/g, ''),
        name: data.name,
        nickname: data.nickname,
        profile: data.profile,
        gender: data.gender,
        age: data.age,
        marketingAdAgree: data.agreeMarketing,
      })
      .then((res) => {
        console.log('회원가입 성공! res : ', res.data);
        setToken({
          isRegister: true,
          access: res.data.access as string,
          refresh: res.data.refresh as string,
        });
        setAuthHeader(res.data.access as string);

        router.push('join/success');
      })
      .catch((res) => {
        console.log('회원가입에 실패했습니다. res ; ', res);
      });
  });

  return <JoinPageView formData={formData} onSubmit={onSubmit} />;
}

export default JoinPage;
