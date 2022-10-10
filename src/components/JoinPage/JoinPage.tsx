import { useRouter } from 'next/router';
import React from 'react';

import axios from 'axios';

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
  const onSubmit = handleSubmit(async (data) => {
    console.log('onSubmit : ', {
      socialToken: router.query.socialToken,
      email: data.email,
      phone: data.phone.replace(/-/g, ''),
      name: data.name,
      nickname: data.nickname,
      profile: data.profile,
      gender: data.gender,
      age: Number(data.age),
      marketingAdAgree: data.agreeMarketing,
    });

    const form = new FormData();
    form.append('socialToken', router.query.socialToken as string);
    form.append('email', data.email);
    form.append('phone', data.phone.replace(/-/g, ''));
    form.append('name', data.name);
    form.append('nickname', data.nickname);
    if (data.profile && data.profile.length > 0) {
      form.append('profile', data.profile);
    }
    if (data.gender && data.gender.length > 0) {
      form.append('gender', data.gender as string);
    }
    if (data.age && String(data.age).length > 0) {
      form.append('age', String(data.age));
    }
    form.append('marketingAdAgree', data.agreeMarketing.toString());

    console.log('form : ', form);

    await instance
      .post(`/v1/user/register/`, form, {
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })

      // const joinResult = await axios({
      // const joinResult = instance({
      //   method: 'POST',
      //   url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/register/`,
      //   data: {
      //     socialToken: router.query.socialToken,
      //     email: data.email,
      //     phone: data.phone.replace(/-/g, ''),
      //     name: data.name,
      //     nickname: data.nickname,
      //     profile: data.profile,
      //     gender: data.gender,
      //     age: Number(data.age),
      //     // age: data.age,
      //     marketingAdAgree: data.agreeMarketing,
      //   },
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // })
      // const joinResult = await axios
      //   .post(
      //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/register/`,
      //     {
      //       socialToken: router.query.socialToken,
      //       email: data.email,
      //       phone: data.phone.replace(/-/g, ''),
      //       name: data.name,
      //       nickname: data.nickname,
      //       profile: data.profile,
      //       gender: data.gender,
      //       age: Number(data.age),
      //       marketingAdAgree: data.agreeMarketing,
      //     },
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     },
      //   )

      // await instance
      //   .post(
      //     `/v1/user/register/`,
      //     // {
      //     //   socialToken: router.query.socialToken,
      //     //   email: data.email,
      //     //   phone: data.phone.replace(/-/g, ''),
      //     //   name: data.name,
      //     //   nickname: data.nickname,
      //     //   profile: data.profile,
      //     //   gender: data.gender,
      //     //   age: Number(data.age),
      //     //   marketingAdAgree: data.agreeMarketing,
      //     // },
      //     form,
      //     {
      //       headers: {
      //         // 'Content-Type': 'application/json',
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     },
      //   )

      .then((res) => {
        console.log('회원가입 성공! res : ', res.data);
        // console.log('회원가입 성공! upload : ', joinResult);
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
