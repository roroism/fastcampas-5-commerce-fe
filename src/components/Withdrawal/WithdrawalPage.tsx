import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import axios from 'axios';

import { ChakraProps, useDisclosure } from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';
import { useGetMyInfoQuery } from '@apis/reactquery/QueryApi.query';

import WithdrawalModal from '@components/Modals/_fragments/WithdrawalModal';

import { deleteToken, getToken, setToken } from '@utils/localStorage/token';

import customUseForm from './CustomWithdrawalUseForm';
import WithdrawalPageView from './WithdrawalPage.view';

interface WithdrawalPageProps extends ChakraProps {}

function WithdrawalPage({ ...basisProps }: WithdrawalPageProps) {
  const formData = customUseForm();
  const { handleSubmit } = formData;
  const { data } = useGetMyInfoQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token?.access) router.replace('/login');
    else setAuthHeader(token?.access);
  }, [router]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('onSubmit !!!!!!!!!!!!! : ', {
      id: data.id,
      reason: data.reason,
      additionalReason: data.reasonOthers,
    });

    const form = new FormData();
    form.append('reason', data.reason);
    if (data.reasonOthers && data.reasonOthers.length > 0) {
      form.append('additionalReason', data.reasonOthers);
    }

    await instance
      .post(`/v1/user/withdrawal/reason/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (res) => {
        console.log('회원탈퇴 사유 전송성공 res : ', res.data);
        await instance
          .delete(`/v1/user/withdrawal/${data.id}/`)
          .then((res) => {
            console.log('회원탈퇴 성공 res : ', res.data);
            onOpen();
            // deleteToken();
          })
          .catch((err) => {
            console.log('회원탈퇴 실패 err ; ', err);
          });
      })
      .catch((err) => {
        console.log('회원탈퇴 사유 전송실패 err ; ', err);
      });

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

    // instance
    //   .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/register/`, {
    //     socialToken: router.query.socialToken,
    //     email: data.email,
    //     phone: data.phone.replace(/-/g, ''),
    //     name: data.name,
    //     nickname: data.nickname,
    //     profile: data.profile,
    //     gender: data.gender,
    //     age: Number(data.age),
    //     marketingAdAgree: data.agreeMarketing,
    //   })

    // .then((res) => {
    //   console.log('회원탈퇴 성공 res : ', res.data);
    //   console.log('회원탈퇴 성공 delete : ', withdrawalResult);
    //   // setToken({
    //   //   isRegister: true,
    //   //   access: res.data.access as string,
    //   //   refresh: res.data.refresh as string,
    //   // });
    //   // setAuthHeader(res.data.access as string);

    //   router.push('/login');
    // })
    // .catch((err) => {
    //   console.log('회원탈퇴에 실패했습니다. err ; ', err);
    // });
  });

  return (
    <>
      <WithdrawalModal
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={() => {
          deleteToken();
          router.push('/login');
        }}
      />
      <WithdrawalPageView
        formData={formData}
        onSubmit={onSubmit}
        myInfo={data}
      />
    </>
  );
}

export default WithdrawalPage;
