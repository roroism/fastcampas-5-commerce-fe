import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import axios from 'axios';

// import { Select } from 'chakra-react-select';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ChakraProps,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Select,
  Text,
  VStack,
  VisuallyHiddenInput,
} from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';
import { usePatchMyInfoMutation } from '@apis/reactquery/QueryApi.mutation';
import { useGetMyInfoQuery } from '@apis/reactquery/QueryApi.query';
import { MyInfoDTOType } from '@apis/reactquery/QueryApi.type';

import JoinInput from '@components/JoinPage/_fragments/JoinInput';

import { getToken } from '@utils/localStorage/token';

import { FormEditDataType } from './types';

interface EditPageViewProp extends ChakraProps {
  formData: UseFormReturn<FormEditDataType>;
  onSubmit: any;
}

const EditPageView = ({
  formData: {
    register,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  },
  onSubmit,
  ...basisProps
}: EditPageViewProp) => {
  const [preview, setPreview] = useState<string>();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState(avatarRef.current?.files);
  const { data: myInfo } = useGetMyInfoQuery();

  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token?.access) router.replace('/login');
    else setAuthHeader(token?.access);
  }, []);

  console.log(watch());

  useEffect(() => {
    console.log('출력');
    if (myInfo?.name) setValue('name', myInfo?.name);
    if (myInfo?.nickname) setValue('nickname', myInfo?.nickname);
    if (myInfo?.email) setValue('email', myInfo?.email);
    if (myInfo?.phone)
      setValue(
        'phone',
        myInfo?.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`),
      );
    if (myInfo?.gender) setValue('gender', myInfo?.gender);
    if (myInfo?.age) setValue('age', myInfo?.age);
    // if (myInfo?.profile) setPreview(myInfo?.profile);
  }, [myInfo]);

  const handleAvatar = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('클릭1');
    if (avatarRef.current) {
      avatarRef.current.click();
      console.log('클릭2');
    }
  };

  const handleAvatarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!avatarRef?.current?.files?.length) {
      setPreview('');
      setValue('profile', '');
      return;
    } else {
      // if (avatarRef.current?.files) {
      setImg(avatarRef.current?.files);
      const file = avatarRef.current?.files[0];
      setPreview(URL.createObjectURL(file));

      console.log('avatarRef.current?.files', avatarRef.current?.files);
      console.log('avatarRef.current?.files[0]', avatarRef.current?.files[0]);
      console.log('URL.createObjectURL(file)', URL.createObjectURL(file));

      instance
        .post(`/v1/presigned_url/`, {
          name: file.name,
        })
        .then(async (res) => {
          console.log('presignedUrl : ', res.data.url);
          setValue('profile', res.data.url);
          const upload = await axios
            .put(
              `${res.data.url}`,
              // { file: file },
              file,
              {
                baseURL: '',
                headers: {
                  'Content-Type': file.type,
                },
              },
            )
            .then((res) => {
              console.log('success : s3 file upload res : ', res);
              console.log('success : s3 file upload upload : ', upload);
            })
            .catch((err) => {
              console.log('presignedUrl put error : ', err);
            });
        })
        .catch((err) => {
          console.log('/v1/presigned_url/ error : ', err);
        });
    }
  };

  return (
    <>
      <Box {...basisProps} mt="130px">
        <Text as="h2" fontWeight="700" fontSize="1.625rem" mb="60px">
          회원정보수정
        </Text>
        <Box as="form" onSubmit={onSubmit} {...basisProps}>
          <Text as="h3" fontWeight="700">
            회원정보입력
          </Text>

          <Flex py="40px" justifyContent="center">
            <Avatar w="70px" h="70px" src={preview}>
              <AvatarBadge
                boxSize="20px"
                bg="primary.500"
                borderWidth="0"
                position="absolute"
                right="5px"
                bottom="5px"
                _hover={{ cursor: 'pointer' }}
                onClick={handleAvatar}
                _before={{
                  content: '""',
                  display: 'block',
                  width: '1.5px',
                  height: '10px',
                  borderRadius: '2px',
                  backgroundColor: 'white',
                  position: 'absolute',
                }}
                _after={{
                  content: '""',
                  display: 'block',
                  width: '10px',
                  height: '1.5px',
                  borderRadius: '2px',
                  backgroundColor: 'white',
                  position: 'absolute',
                }}
              />
            </Avatar>
            <Input
              display="none"
              type="file"
              accept="image/*"
              ref={avatarRef}
              onChange={handleAvatarOnChange}
            ></Input>
            <input
              type="hidden"
              // ref={register}
              // name="profile"
              // value={presignedUrl}
              {...register('profile')}
            />
          </Flex>

          <Flex flexDirection="column" gap="50px">
            <JoinInput label="이름" errorText={errors.name?.message}>
              <Input {...register('name')} autoComplete="off" {...InputStyle} />
            </JoinInput>

            <JoinInput label="닉네임" errorText={errors.nickname?.message}>
              <Input
                {...register('nickname')}
                autoComplete="off"
                {...InputStyle}
              />
            </JoinInput>

            <JoinInput label="휴대폰 번호" errorText={errors.phone?.message}>
              <Input
                {...register('phone')}
                autoComplete="off"
                {...InputStyle}
              />
            </JoinInput>

            <JoinInput label="이메일 주소" errorText={errors.email?.message}>
              <Input
                {...register('email')}
                autoComplete="off"
                {...InputStyle}
              />
            </JoinInput>
          </Flex>

          <Box>
            <Text as="h3" fontWeight="700" mb="40px" mt="80px">
              추가정보입력(선택)
            </Text>

            <FormControl>
              <FormLabel fontSize="12px" color="primary.500" fontWeight="700">
                성별
              </FormLabel>
              <Select
                variant="flushed"
                borderBottom="2px solid #CBCED6"
                _focus={{ borderBottom: '2px solid #FF710B' }}
                fontSize="16px"
                placeholder="성별을 선택하세요"
                _placeholder={{ color: 'gray.400' }}
                {...register('gender')}
              >
                {/* <option value="남성" selected={getValues('gender') === '남성'}> */}
                <option value="male">남</option>
                {/* <option value="여성" selected={getValues('gender') === '여성'}> */}
                <option value="female">여</option>
              </Select>
            </FormControl>

            <FormControl mt="50px">
              <FormLabel fontSize="12px" color="primary.500" fontWeight="700">
                연령대
              </FormLabel>
              <Select
                variant="flushed"
                borderBottom="2px solid #CBCED6"
                _focus={{ borderBottom: '2px solid #FF710B' }}
                fontSize="16px"
                placeholder="연령대를 선택하세요"
                _selected={{ color: '#1A1A1A' }}
                {...register('age')}
              >
                {/* <option value="10대" selected={getValues('ageRange') === '10대'}> */}
                <option value="10">10대</option>
                {/* <option value="20대" selected={getValues('ageRange') === '20대'}> */}
                <option value="20">20대</option>
                {/* <option value="30대" selected={getValues('ageRange') === '30대'}> */}
                <option value="30">30대</option>
                {/* <option value="40대" selected={getValues('ageRange') === '40대'}> */}
                <option value="40">40대</option>
                {/* <option
                  value="50대 이상"
                  selected={getValues('ageRange') === '50대 이상'}
                > */}
                <option value="50">50대</option>
                <option value="60">60대</option>
              </Select>
            </FormControl>
          </Box>

          <Flex gap="13px" pt="50px" pb="30px" px="16px" bgColor="white">
            <Box w="calc(50% - 6.5px)">
              <NextLink href="/mypage" passHref replace>
                <Link>
                  <Button
                    variant="outline"
                    fontWeight="700"
                    colorScheme="primary"
                    w="full"
                    h="50px"
                    borderRadius="25px"
                    fontSize="1rem"
                    // onClick={onOpen}
                  >
                    취소
                  </Button>
                </Link>
              </NextLink>
            </Box>

            <Button
              variant="solid"
              fontWeight="700"
              colorScheme="primary"
              w="50%"
              h="50px"
              borderRadius="25px"
              fontSize="1rem"
              type="submit"
            >
              저장
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default EditPageView;

const InputStyle = {
  variant: 'outline',
  size: 'xs',
  px: '19px',
  py: '5px',
  h: '40px',
  fontSize: '16px',
  outline: '1px solid #1A1A1A',
  borderRadius: '100px',
  lineHeight: '28px',
  _focus: { border: '2px solid #FF710B', outline: 'none' },
  _placeholder: { color: 'gray.400' },
};

const ButtonStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
