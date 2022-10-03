import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Box,
  Button,
  ChakraProps,
  Checkbox,
  Flex,
  Icon,
  Image,
  Input,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import OrderItem from './_fragments/OrderItem';
import { FormOrderDataType } from './types';

interface OrderPageViewProps extends ChakraProps {
  formData: UseFormReturn<FormOrderDataType>;
  onSubmit: any;
}

function OrderPageView({
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
}: OrderPageViewProps) {
  return (
    <Box mt={LAYOUT.HEADER.HEIGHT} px="16px" pb="80px">
      <Box as="form" onSubmit={onSubmit} {...basisProps}>
        <Text as="h3" fontWeight="700" fontSize="1.25rem">
          주문결제
        </Text>
        <Box mt="80px">
          <Text as="h4" fontWeight="700">
            주문상품
          </Text>
          <UnorderedList
            styleType="none"
            p={0}
            m={0}
            mt="11px"
            display="flex"
            flexDirection="column"
            gap="30px"
          >
            <OrderItem />
          </UnorderedList>
        </Box>

        <Box mt="46px" borderBottom="1px solid" borderColor="gray.200">
          <Text as="h4" fontWeight="700">
            주문자 정보
          </Text>

          <VStack spacing="50px" w="full" pb="50px" alignItems="flex-start">
            <Box w="full">
              <Text {...NameStyle}>이름</Text>
              <Input
                name="name"
                {...InputStyle}
                // value={orderer?.name}
                // onChange={onChange}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>핸드폰 번호</Text>
              <Input
                {...InputStyle}
                name="phone"
                // value={orderer?.phone}
                // onChange={onChange}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>주소</Text>
              <Flex justify="space-between">
                <Input
                  {...InputStyle}
                  w="249px"
                  name="address"
                  // onClick={}
                  // value={ordererFullAddress ? ordererFullAddress : ''}
                />
                <Button
                  colorScheme="primary"
                  w="84px"
                  h="40px"
                  borderRadius="5px"
                  py="11px"
                  // onClick={}
                >
                  우편번호 검색
                </Button>
              </Flex>
              <Input
                {...InputStyle}
                w="full"
                mt="10px"
                name="addressDetail"
                // value={orderer?.addressDetail}
                // onChange={onChange}
              />
            </Box>
          </VStack>
        </Box>

        <Box mt="50px">
          <Flex
            w="full"
            pt="50px"
            pb="40px"
            justify="space-between"
            alignItems="center"
          >
            <Text as="h4" fontWeight="700">
              배송지 정보
            </Text>
            <Checkbox
              size="lg"
              colorScheme="primary"
              // onChange={}
            >
              <span style={{ color: '#8C919F', fontSize: '1rem' }}>
                주문자 정보와 동일
              </span>
            </Checkbox>
          </Flex>

          <VStack spacing="50px" w="full" alignItems="flex-start">
            <Box w="full">
              <Text {...NameStyle}>이름</Text>
              <Input {...InputStyle} {...register('shippingName')} />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>핸드폰 번호</Text>
              <Input {...InputStyle} {...register('shippingPhone')} />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>주소</Text>
              <Flex justify="space-between">
                <Input
                  {...InputStyle}
                  w="249px"
                  // onClick={shippingHandleClick}
                  value={
                    getValues('shippingAddress')
                      ? getValues('shippingAddress')
                      : ''
                  }
                  {...register('shippingAddress')}
                />
                <Button
                  colorScheme="primary"
                  w="84px"
                  h="40px"
                  borderRadius="5px"
                  py="11px"
                  // onClick={shippingHandleClick}
                >
                  우편번호 검색
                </Button>
              </Flex>
              <Input
                {...InputStyle}
                w="full"
                mt="10px"
                {...register('shippingAddressDetail')}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>배송요청사항</Text>
              <Input {...InputStyle} {...register('shippingRequest')} />
            </Box>
          </VStack>
        </Box>

        <Box
          mt="50px"
          pt="40px"
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Text as="h4" fontWeight="700">
            결제수단
          </Text>

          <UnorderedList
            styleType="none"
            p={0}
            m={0}
            mt="10px"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <Box as="li" borderTop="1px solid" borderColor="gray.200" py="30px">
              <Checkbox
                size="lg"
                colorScheme="primary"
                // onChange={checkPayMethod}
              >
                <Flex ml="17px" gap="17px">
                  <Image src="/icons/svg/order/pay.svg" />
                  <Box fontSize="1rem">신용카드결제</Box>
                </Flex>
              </Checkbox>
            </Box>
            <Box as="li" borderTop="1px solid" borderColor="gray.200" py="30px">
              <Checkbox
                size="lg"
                // colorScheme="primary"
                icon={<CheckBoxCustomIcon />}
                // onChange={checkPayMethod}
                defaultChecked
              >
                <Flex ml="17px" gap="17px">
                  <Image src="/icons/svg/order/pay.svg" />
                  <Box fontSize="1rem">신용카드결제</Box>
                </Flex>
              </Checkbox>
            </Box>
          </UnorderedList>
        </Box>
      </Box>

      <Box px="16px" pt="20px" mt="10px">
        <Text as="h4" fontWeight="700">
          최종 결제금액
        </Text>

        <Flex
          flexDirection="column"
          pb="20px"
          borderBottom="1px solid"
          borderColor="gray.200"
          gap="10px"
          mt="40px"
        >
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 상품금액</Box>
            <Box textAlign="right">108,000&nbsp;원</Box>
          </Flex>
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 배송비</Box>
            <Box textAlign="right">0&nbsp;원</Box>
          </Flex>
        </Flex>
        <Box pb="20px">
          <Flex justifyContent="space-between" pt="20px">
            <Box>결제금액</Box>
            <Box as="strong" textAlign="right" color="primary.500">
              108,000&nbsp;원
            </Box>
          </Flex>
        </Box>
        <Flex
          gap="10px"
          w="full"
          py="20px"
          alignItems="center"
          borderTop="1px solid"
          borderColor="gray.200"
        >
          <Checkbox
            size="lg"
            colorScheme="primary"
            // onChange={agreementHandler}
          >
            <Box as="span" color="gray.600" fontSize="1rem">
              개인정보 수집 이용 동의&#40;필수&#41;
            </Box>
          </Checkbox>
        </Flex>
        <Box>
          <Button
            mt="20px"
            fontWeight="700"
            w="100%"
            h="50px"
            borderRadius="25px"
            backgroundColor="primary.500"
            color="white"
            fontSize="1rem"
          >
            결제하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderPageView;

const NameStyle = {
  fontSize: '0.75rem',
  color: 'primary.500',
  fontWeight: 700,
  pb: '10px',
};

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

const CheckBoxCustomIcon = (props: any) => {
  const { isIndeterminate, isChecked, ...rest } = props;

  const d1Gray =
    'M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z';

  const d2Gray =
    'M10 19.5C15.2467 19.5 19.5 15.2467 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5Z';

  const d1Checked =
    'M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z';
  const d2Checked =
    'M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z';

  return (
    <>
      {isChecked ? (
        <Icon
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          fill="none"
          {...rest}
        >
          <path fill="#FF710B" d={d1Checked} />
          <path fill="white" d={d2Checked} />
        </Icon>
      ) : (
        <Icon
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          fill="none"
          {...rest}
        >
          <path fill="white" d={d1Gray} />
          <path stroke="#CBCED6" d={d2Gray} />
        </Icon>
      )}
    </>
  );
};
