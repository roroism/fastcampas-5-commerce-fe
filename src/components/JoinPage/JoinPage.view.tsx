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

import instance from '@apis/_axios/instance';

import JoinInput from './_fragments/JoinInput';
import { FormDataType } from './types';

interface JoinPageViewProp extends ChakraProps {
  formData: UseFormReturn<FormDataType>;
  onSubmit: any;
}

const JoinPageView = ({
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
}: JoinPageViewProp) => {
  const [preview, setPreview] = useState<string>();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState(avatarRef.current?.files);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isJoinButtonActive, setIsJoinButtonActive] = useState<boolean>(false);
  // const [presignedUrl, setPresignedUrl] = useState<string>('');

  console.log(watch());
  const handleAvatar = (e: React.MouseEvent) => {
    e.preventDefault();
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  };

  const handleAvatarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!avatarRef?.current?.files?.length) {
      setPreview('');
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

  const checkboxHandler = (e: any) => {
    setValue(e.currentTarget.id, !getValues(e.currentTarget.id));
    if (e.currentTarget.id === 'agreeAll' && getValues('agreeAll') === true) {
      setValue('agreeRequired', true);
      setValue('agreePrivateInfo', true);
      setValue('agreeMarketing', true);
      setToggle(!toggle);
    } else if (
      e.currentTarget.id === 'agreeAll' &&
      getValues('agreeAll') === false
    ) {
      setValue('agreeRequired', false);
      setValue('agreePrivateInfo', false);
      setValue('agreeMarketing', false);
      setToggle(!toggle);
    } else {
      setValue('agreeAll', false);
      setToggle(!toggle);
    }
    if (
      e.currentTarget.id !== 'agreeAll' &&
      getValues(['agreeRequired', 'agreePrivateInfo', 'agreeMarketing']).every(
        Boolean,
      )
    ) {
      setValue('agreeAll', true);
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    if (getValues('agreeRequired') && getValues('agreePrivateInfo')) {
      setIsJoinButtonActive(true);
    } else setIsJoinButtonActive(false);
  }, [toggle, getValues]);

  return (
    <>
      <Text as="h2" fontWeight="700" fontSize="1.625rem" mb="60px">
        회원가입
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
            multiple
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
            <Input {...register('phone')} autoComplete="off" {...InputStyle} />
          </JoinInput>

          <JoinInput label="이메일 주소" errorText={errors.email?.message}>
            <Input {...register('email')} autoComplete="off" {...InputStyle} />
          </JoinInput>
        </Flex>

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

        <Text as="h3" fontWeight="700" mb="40px" mt="80px">
          이용약관동의
        </Text>

        <VStack w="full" spacing="42px" justify="space-between" align="cener">
          <Flex
            justify="space-between"
            borderBottom="2px solid #FF710B"
            pb="7px"
          >
            <Text color="primary.500" fontSize="16px" fontWeight="700">
              아래 약관에 모두 동의합니다.
            </Text>
            <Checkbox
              id="agreeAll"
              display="none"
              ml={0}
              {...register('agreeAll')}
              onChange={checkboxHandler}
            ></Checkbox>
            <label htmlFor="agreeAll">
              {getValues('agreeAll') === true ? (
                <Image
                  src="/icons/svg/checkedicon_circle.svg"
                  alt="checked All"
                />
              ) : (
                <Image src="/icons/svg/checkicon_circle.svg" alt="check All" />
              )}
            </label>
          </Flex>
          <Flex justify="space-between">
            <Link href="https://toktokhan.notion.site/6e7a309e8d14464cad38fc86656d564a">
              <Text color="gray.600" fontSize="12px" textDecor="underline">
                서비스 이용을 위한 필수약관 동의
              </Text>
            </Link>

            <Checkbox
              id="agreeRequired"
              display="none"
              {...register('agreeRequired')}
              onChange={checkboxHandler}
            />
            <label htmlFor="agreeRequired">
              {getValues('agreeRequired') === true ? (
                <Image
                  src="/icons/svg/checkedicon.svg"
                  alt="checked icon"
                  mr="5px"
                />
              ) : (
                <Image
                  src="/icons/svg/checkicon.svg"
                  alt="check icon"
                  mr="5px"
                />
              )}
            </label>
          </Flex>
          <Flex justify="space-between">
            <Link href="https://toktokhan.notion.site/3-2261ee2f25024c0a9b6a82a6f43fd0dc">
              <Text color="gray.600" fontSize="12px" textDecor="underline">
                개인정보수집 및 이용, 제 3차 제공 동의
              </Text>
            </Link>
            <Checkbox
              id="agreePrivateInfo"
              display="none"
              {...register('agreePrivateInfo')}
              onChange={checkboxHandler}
            />
            <label htmlFor="agreePrivateInfo">
              {getValues('agreePrivateInfo') === true ? (
                <Image
                  src="/icons/svg/checkedicon.svg"
                  alt="checked icon"
                  mr="5px"
                />
              ) : (
                <Image
                  src="/icons/svg/checkicon.svg"
                  alt="check icon"
                  mr="5px"
                />
              )}
            </label>
          </Flex>
          <Flex justify="space-between">
            <Link href="https://toktokhan.notion.site/24f69842ebec48df89a3656bac7cf4c9">
              <Text color="gray.600" fontSize="12px" textDecor="underline">
                마케팅 정보 수신 및 맞춤형 광고 동의(선택)
              </Text>
            </Link>

            <Checkbox
              id="agreeMarketing"
              display="none"
              {...register('agreeMarketing')}
              onChange={checkboxHandler}
            />
            <label htmlFor="agreeMarketing">
              {getValues('agreeMarketing') === true ? (
                <Image
                  src="/icons/svg/checkedicon.svg"
                  alt="checked icon"
                  mr="5px"
                />
              ) : (
                <Image
                  src="/icons/svg/checkicon.svg"
                  alt="check icon"
                  mr="5px"
                />
              )}
            </label>
          </Flex>
        </VStack>

        <Box w="full" pt="96px" pb="50px">
          <Button
            {...ButtonStyle}
            type="submit"
            colorScheme="primary"
            w="343px"
            h="50px"
            borderRadius="25px"
            py="11px"
            disabled={!isJoinButtonActive}
          >
            회원가입 완료
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default JoinPageView;

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
