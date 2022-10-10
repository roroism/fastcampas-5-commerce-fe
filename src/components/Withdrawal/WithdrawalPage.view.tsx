import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form/dist/types';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  HStack,
  Input,
  Link,
  Radio,
  RadioGroup,
  Text,
  VStack,
  VisuallyHidden,
  useDisclosure,
} from '@chakra-ui/react';

import { setAuthHeader } from '@apis/_axios/instance';

import WithdrawalModal from '@components/Modals/_fragments/WithdrawalModal';

import { useQueryClient } from '@tanstack/react-query';
import { getToken } from '@utils/localStorage/token';

import { FormWithdrawalDataType } from './types';

interface WithdrawalPageViewProps extends ChakraProps {
  formData: UseFormReturn<FormWithdrawalDataType>;
  onSubmit: any;
  myInfo: any;
}

function WithdrawalPageView({
  formData: {
    register,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  },
  onSubmit,
  myInfo,
  ...basisProps
}: WithdrawalPageViewProps) {
  console.log('WithdrawalPageView start');
  const router = useRouter();
  // const queryClient = useQueryClient();
  // console.log('queryClient : ', queryClient.invalidateQueries(['my-info']));
  console.log(watch());
  // const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const token = getToken();
    if (!token?.access) router.replace('/login');
    else setAuthHeader(token?.access);
  }, []);

  useEffect(() => {
    setValue('id', myInfo?.id);
  }, [myInfo]);

  return (
    <>
      {/* <WithdrawalModal isOpen={isOpen} onClose={onClose} /> */}
      <Box {...basisProps}>
        <VisuallyHidden as="h2">main contents</VisuallyHidden>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={onSubmit}>
          <input type="hidden" {...register('id')} />
          <Box>
            <Box pt="130px" px="16px" pb="80px">
              <Box as="h3" {...TitleText} w="full">
                회원 탈퇴
              </Box>
            </Box>

            <Box {...BasicText} px="16px" py="18px" bg="gray.100">
              회원 탈퇴 시 개인 정보 및 인코스런에서 만들어진 <br /> 모든
              데이터는 삭제됩니다. 한 번 삭제된 정보는 복구가 불가능합니다.
            </Box>
            <Box px="16px">
              <Flex as="h4" {...SubText} w="full" h="55px" alignItems="center">
                회원 정보
              </Flex>
              {myInfo && (
                <VStack
                  {...BasicText}
                  spacing="10px"
                  pt="15px"
                  pb="24px"
                  justify="flex-start"
                  w="full"
                >
                  <HStack as="dl" spacing="10px" w="full">
                    <Box as="dt" w="92px">
                      이름
                    </Box>
                    <Box as="dd" color="gray.700">
                      {myInfo?.name}
                      {/* 인코스런 */}
                    </Box>
                  </HStack>
                  <HStack as="dl" spacing="10px" w="full">
                    <Box as="dt" w="92px">
                      핸드폰 번호
                    </Box>
                    <Box as="dd" color="gray.700">
                      {myInfo?.phone}
                      {/* 010-2222-3333 */}
                    </Box>
                  </HStack>
                  <HStack as="dl" spacing="10px" w="full">
                    <Box as="dt" w="92px">
                      이메일주소
                    </Box>
                    <Box as="dd" color="gray.700">
                      {myInfo?.email}
                      {/* 인코스런@test.com */}
                    </Box>
                  </HStack>
                </VStack>
              )}
            </Box>
            <Box w="full" h="10px" bg="gray.100"></Box>
            <Box px="16px">
              <Flex as="h4" {...SubText} w="full" h="55px" alignItems="center">
                탈퇴 사유
              </Flex>
              {/* <Input display="none" {...register('reason')} /> */}
              {/* <RadioGroup onChange={checkReason} value={reason}> */}
              <RadioGroup>
                <VStack
                  {...BasicText}
                  spacing="10px"
                  align="flex-start"
                  pt="15px"
                  pb="30px"
                >
                  <Radio
                    {...register('reason')}
                    size="lg"
                    colorScheme="primary"
                    value="아이디 변경(재가입)"
                  >
                    <Box {...BasicText}>아이디 변경(재가입)</Box>
                  </Radio>
                  <Radio
                    {...register('reason')}
                    size="lg"
                    colorScheme="primary"
                    value="서비스 및 고객지원 불만족"
                  >
                    <Box {...BasicText}>서비스 및 고객지원 불만족</Box>
                  </Radio>
                  <Radio
                    {...register('reason')}
                    size="lg"
                    colorScheme="primary"
                    value="타 브랜드 이용"
                  >
                    <Box {...BasicText}>타 브랜드 이용</Box>
                  </Radio>
                  <Radio
                    {...register('reason')}
                    size="lg"
                    colorScheme="primary"
                    value="기타"
                  >
                    <Box {...BasicText}>기타</Box>
                  </Radio>
                  <Input
                    {...InputStyle}
                    {...register('reasonOthers')}
                    placeholder="사유를 입력해주세요"
                    // disabled={!isOtherReason}
                  />
                  {errors.reasonOthers?.message && (
                    <Text fontSize="0.75rem" color="red">
                      {errors.reasonOthers?.message}
                    </Text>
                  )}
                  {errors.reason?.message && (
                    <Text fontSize="0.75rem" color="red">
                      {errors.reason?.message}
                    </Text>
                  )}
                </VStack>
              </RadioGroup>
            </Box>
            <Box w="fll" h="10px" bg="gray.100"></Box>
            <Box px="16px" pb="80px">
              <VisuallyHidden as="h2">탈퇴의사확인</VisuallyHidden>
              <Flex w="full" h="55px" alignItems="center">
                <Text {...SubText}>인코스런을 입력하세요</Text>
              </Flex>
              <Input
                {...InputStyle}
                {...register('confirmation')}
                placeholder="인코스런"
              />
              {errors.confirmation?.message && (
                <Text fontSize="0.75rem" color="red" mt="10px">
                  {errors.confirmation?.message}
                </Text>
              )}
            </Box>

            <Flex justify="space-between" px="16px" pb="30px">
              <Box w="calc(50% - 6.5px)">
                <NextLink href="/mypage" passHref replace>
                  <Link>
                    <Button
                      w="full"
                      variant="outline"
                      colorScheme="primary"
                      h="50px"
                      borderRadius="25px"
                      size="sd"
                      py="12px"
                    >
                      취소
                    </Button>
                  </Link>
                </NextLink>
              </Box>

              <Button
                type="submit"
                variant="solid"
                colorScheme="primary"
                w="calc(50% - 6.5px)"
                h="50px"
                borderRadius="25px"
                size="sd"
                py="12px"
              >
                탈퇴하기
              </Button>
            </Flex>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default WithdrawalPageView;

const InputStyle = {
  variant: 'outline',
  size: 'xs',
  px: '19px',
  py: '5px',
  h: '40px',
  fontSize: '16px',
  outline: '1px solid #1A1A1A',
  borderRadius: '100px',
  _focus: { border: '2px solid #FF710B', outline: 'none' },
  _placeholder: { color: 'gray.400' },
};

const SubText = {
  fontWeight: 700,
  fontSize: '16px',
};

const BasicText = {
  fontWeight: 400,
  fontSize: '16px',
};

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
};
