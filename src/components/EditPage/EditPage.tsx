import { useRouter } from 'next/router';
import React from 'react';

import { ChakraProps } from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';
import { usePatchMyInfoMutation } from '@apis/reactquery/QueryApi.mutation';
import { useGetMyInfoQuery } from '@apis/reactquery/QueryApi.query';

import { setToken } from '@utils/localStorage/token';

import customEditUseForm from './CustomEditUseForm';
import EditPageView from './EditPage.view';

interface EditPageProps extends ChakraProps {}

function EditPage({ ...basisProps }: EditPageProps) {
  const formData = customEditUseForm();
  const { handleSubmit } = formData;
  const { mutate } = usePatchMyInfoMutation({
    options: {
      onSuccess: (res) => {
        // 성공했을때 실행하는 함수
        console.log('mutate success : ', res);
      },
      onError: (err) => {
        // 실패했을때 실행하는 함수
        console.log('mutate error : ', err);
      },
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(
      'onSubmit : ',
      data.name,
      data.nickname,
      data.phone.replace(/-/g, ''),
      // address: data.address,
      data.email,
      data.profile,
      data.gender,
      data.age,
    );

    const form = new FormData();
    form.append('name', data.name);
    form.append('nickname', data.nickname);
    form.append('phone', data.phone.replace(/-/g, ''));
    form.append('email', data.email);
    form.append('address', '서울시 강남구');
    if (data.profile && data.profile !== '') {
      form.append('profile', data.profile);
    }
    form.append('gender', data.gender as string);
    form.append('age', String(data.age));

    mutate({
      // data: {
      //   name: data.name,
      //   nickname: data.nickname,
      //   phone: data.phone.replace(/-/g, ''),
      //   // phone: data.phone,
      //   address: '서울특별시 송파구 올림픽로 240',
      //   email: data.email,
      //   profile: data.profile,
      //   gender: data.gender,
      //   age: data.age,
      // },
      data: form,
    });

    // instance
    //   .patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/me/`, {
    //     name: data.name,
    //     nickname: data.nickname,
    //     phone: data.phone.replace(/-/g, ''),
    //     // address: data.address,
    //     email: data.email,
    //     profile: data.profile,
    //     gender: data.gender,
    //     age: data.age,
    //   })
    //   .then((res) => {
    //     console.log('회원정보 수정! res : ', res.data);
    //     setToken({
    //       isRegister: true,
    //       access: res.data.access as string,
    //       refresh: res.data.refresh as string,
    //     });
    //     setAuthHeader(res.data.access as string);
    //   })
    //   .catch((res) => {
    //     console.log('회원정보수정에 실패했습니다. res ; ', res);
    //   });
  });

  return <EditPageView formData={formData} onSubmit={onSubmit} />;
}

export default EditPage;
