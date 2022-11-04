import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { ChakraProps, useDisclosure } from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';
import { usePatchMyInfoMutation } from '@apis/reactquery/QueryApi.mutation';
import {
  MYINFO_API_QUERY_KEY,
  useGetMyInfoQuery,
} from '@apis/reactquery/QueryApi.query';

import { useQueryClient } from '@tanstack/react-query';
import { getToken, setToken } from '@utils/localStorage/token';

import customEditUseForm from './CustomEditUseForm';
import EditPageView from './EditPage.view';
import EditSuccessModal from './_fragments/EditSuccessModal';

interface EditPageProps extends ChakraProps {}

function EditPage({ ...basisProps }: EditPageProps) {
  const router = useRouter();

  const formData = customEditUseForm();
  const { handleSubmit } = formData;
  const queryClient = useQueryClient();
  const { mutate } = usePatchMyInfoMutation({
    options: {
      onSuccess: (res) => {
        // 성공했을때 실행하는 함수
        console.log('mutate success : ', res);
        queryClient.invalidateQueries(MYINFO_API_QUERY_KEY.GET());
        EditSuccessOnOpen();
      },
      onError: (err) => {
        // 실패했을때 실행하는 함수
        console.log('mutate error : ', err);
      },
    },
  });
  const {
    isOpen: EditSuccessIsOpen,
    onOpen: EditSuccessOnOpen,
    onClose: EditSuccessOnClose,
  } = useDisclosure();

  useEffect(() => {
    const token = getToken();
    if (!token?.access) router.replace('/login');
    else setAuthHeader(token?.access);
  }, [router]);

  const onSubmit = handleSubmit((data) => {
    // console.log(
    //   'onSubmit : ',
    //   data.name,
    //   data.nickname,
    //   data.phone.replace(/-/g, ''),
    //   // address: data.address,
    //   data.email,
    //   data.profile,
    //   data.gender,
    //   data.age,
    // );

    const form = new FormData();
    form.append('name', data.name);
    form.append('nickname', data.nickname);
    form.append('phone', data.phone.replace(/-/g, ''));
    form.append('email', data.email);
    form.append('address', '서울시 강남구');

    if (data.profile && data.profile !== '') {
      form.append('profilePath', data.profile);
    }
    // form.append('profile', 'a');
    form.append('gender', data.gender as string);
    form.append('age', String(data.age));

    mutate({
      data: form,
    });
  });

  return (
    <>
      <EditPageView formData={formData} onSubmit={onSubmit} />
      <EditSuccessModal
        title="review write success modal"
        isOpen={EditSuccessIsOpen}
        onClose={EditSuccessOnClose}
      />
    </>
  );
}

export default EditPage;
