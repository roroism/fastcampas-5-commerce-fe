import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  HStack,
  Image,
  Input,
  Skeleton,
  Stack,
  Text,
  Textarea,
  UnorderedList,
  VStack,
  VisuallyHidden,
} from '@chakra-ui/react';

import {
  OrderByOrderIdDTOType,
  ProductDetailDTOType,
} from '@apis/reactquery/QueryApi.type';

import PaymentItem from '@components/CompletePage/_fragments/PaymentItem';

import StarRating from './_fragments/StarRating';
// import StarRating from '@components/common/StarRating/StarRating';
// import StarRating from './_fragments/StarRating';
import { FormReviewDataType } from './types';

interface ReviewPageViewProps extends ChakraProps {
  formData: UseFormReturn<FormReviewDataType>;
  onSubmit: any;
  productInfo: ProductDetailDTOType | undefined;
  // orderInfo: OrderByOrderIdDTOType | undefined;
  orderItemId: string | undefined;
  count: number | undefined;
  created: string | undefined;
  reviewImgList: File[];
  setReviewImgList: React.Dispatch<React.SetStateAction<File[]>>;
}

function ReviewPageView({
  formData: {
    register,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  },
  onSubmit,
  productInfo,
  orderItemId = '',
  count = 0,
  created = '',
  reviewImgList,
  setReviewImgList,
  ...basisProps
}: ReviewPageViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(watch());
  console.log('errors : ', errors);
  console.log('reviewImgList :: ', reviewImgList);
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('e.target.files : ', e.target.files);
    const reviewImgListLength = reviewImgList.length;

    if (e.target.files && 3 - reviewImgListLength >= e.target.files.length) {
      const result: File[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        if (i === 3) break;
        result.push(e.target.files[i]);
      }
      setReviewImgList((prev) => [...prev, ...result]);
    }
  };

  const handleOnClick = () => {
    inputRef.current?.click();
  };

  const hendleDeleteImgOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const deleteIdx = Number(e.currentTarget.id);
    const newReviewImgList = reviewImgList.filter(
      (img, idx) => idx !== deleteIdx,
    );
    setReviewImgList(newReviewImgList);
  };

  return (
    <Box {...basisProps}>
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Box pt="130px" px="16px" pb="50px">
        <Box as="h3" fontWeight="700" fontSize="1.25rem" w="full">
          리뷰작성
        </Box>
        <Box
          fontWeight="700"
          fontSize="0.75rem"
          w="full"
          py="19px"
          mt="80px"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <Skeleton
            isLoaded={!!created}
            fadeDuration={1}
            startColor="white"
            endColor="white"
          >
            [{created.replace(/-/g, ' - ')}]
          </Skeleton>
        </Box>
        <Flex justify="space-between" alignItems="center">
          <UnorderedList
            w="100%"
            styleType="none"
            p={0}
            m={0}
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <Skeleton
              isLoaded={!!productInfo}
              fadeDuration={0.5}
              startColor="white"
              endColor="white"
            >
              <PaymentItem
                product={{
                  id: Number(orderItemId),
                  productId: Number(productInfo?.id),
                  count: Number(count),
                  capacity: productInfo?.capacity,
                  name: productInfo?.name,
                  price: productInfo?.price,
                  photo: productInfo?.photo,
                }}
              />
            </Skeleton>
          </UnorderedList>
        </Flex>
        <Box w="full" bg="gray.100" my="20px" h="10px"></Box>
        <form onSubmit={onSubmit}>
          <input type="hidden" {...register('userId')} />
          <input type="hidden" {...register('productId')} />
          <input type="hidden" {...register('orderItemId')} />
          {/* <input type="hidden" {...register('reviewimagePath')} /> */}
          <VStack spacing={0} align="flex-start">
            <Box w="100%">
              <Box as="h4" fontWeight="400" fontSize="1rem" py="20px">
                별점
              </Box>
              <Flex justifyContent="center" alignItems="center">
                <StarRating
                  starRating={getValues('rate')}
                  // increaseStar={increaseStar}
                  // decreaseStar={decreaseStar}
                  setValue={setValue}
                  width="24px"
                />
              </Flex>
              <input type="hidden" {...register('rate')} />
            </Box>

            <Box as="h4" fontWeight="400" fontSize="1rem" pt="40px" pb="20px">
              내용
            </Box>
            <Textarea
              variant="flushed"
              placeholder="내용을 작성하세요."
              _focus={{ borderBottom: '2px solid #4A4D55' }}
              rows={10}
              resize="none"
              {...register('content')}
            />
            <Box as="h4" fontWeight="400" fontSize="1rem" pt="20px">
              사진첨부 &#40;{reviewImgList.length}
              /3&#41;
            </Box>
            <HStack spacing="20px" pt="30px" pb="100px" direction="row-reverse">
              {reviewImgList.length > 0 && reviewImgList?.length <= 3 && (
                <>
                  {reviewImgList.map((item, idx) => {
                    return (
                      <Box
                        key={idx}
                        w="80px"
                        h="80px"
                        borderRadius="5px"
                        position="relative"
                      >
                        <Image
                          src={URL.createObjectURL(item)}
                          w="80px"
                          h="80px"
                          borderRadius="5px"
                          object-fit="cover"
                        ></Image>
                        <Button
                          variant="unstyled"
                          display="block"
                          position="absolute"
                          top="-20px"
                          right="-28px"
                          id={idx.toString()}
                          onClick={hendleDeleteImgOnClick}
                        >
                          <Image src="/icons/svg/review/delete.svg"></Image>
                        </Button>
                      </Box>
                    );
                  })}
                </>
              )}
              {reviewImgList.length < 3 && (
                <Button
                  variant="unstyled"
                  w="80px"
                  h="80px"
                  onClick={handleOnClick}
                >
                  <Box
                    w="80px"
                    h="80px"
                    border="1px dashed #CBCED6"
                    borderRadius="5px"
                    position="relative"
                  >
                    <Box
                      _before={{
                        content: '""',
                        display: 'block',
                        width: '2px',
                        height: '18px',
                        backgroundColor: '#CBCED6',
                        borderRadius: '2px',
                        position: 'absolute',
                        top: '29px',
                        left: '37px',
                      }}
                      _after={{
                        content: '""',
                        display: 'block',
                        height: '2px',
                        width: '18px',
                        backgroundColor: '#CBCED6',
                        borderRadius: '2px',
                        position: 'absolute',
                        top: '37px',
                        left: '29px',
                      }}
                    ></Box>
                  </Box>
                </Button>
              )}
            </HStack>
            <Input
              display="none"
              type="file"
              multiple
              accept="image/*"
              ref={inputRef}
              onChange={handleInputOnChange}
            ></Input>
            <Button
              mt="20px"
              fontWeight="700"
              w="100%"
              h="50px"
              borderRadius="25px"
              variant="solid"
              colorScheme="primary"
              fontSize="1rem"
              type="submit"

              // disabled={!isAgreement ? true : false}
            >
              작성하기
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default ReviewPageView;
