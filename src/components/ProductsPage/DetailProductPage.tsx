import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getStaticProps } from 'pages';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ChakraProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
  VisuallyHidden,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';

import { useGetProductByIdQuery } from '@apis/reactquery/QueryApi.query';
import { ProductDetailDTOType } from '@apis/reactquery/QueryApi.type';

import StarRating from '@components/common/StarRating/StarRating';

import { LAYOUT } from '@constants/layout';

import OrderDrawer from './_fragments/OrderDrawer';
import ReviewChartBar from './_fragments/ReviewChartBar';
import ReviewItem, { Ireview } from './_fragments/ReviewItem';

import priceFormat from 'hooks/priceFormat';

interface DetailProductPageProps extends ChakraProps {
  res: ProductDetailDTOType;
}

function DetailProductPage({ res, ...basisProps }: DetailProductPageProps) {
  // console.log('props res : ', res);
  const { query } = useRouter();
  const { colorMode } = useColorMode();
  const detailInfoRef = useRef<HTMLDivElement>(null);
  const orderInfoRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetProductByIdQuery({
    variables: query.id as string,
    options: {
      initialData: res,
    },
  });
  const [countRate, setCountRate] = useState<Array<number>>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [orderedList, setOrderedList] = useState<Array<Ireview> | null>([]);
  const orderingRateRef = useRef<HTMLSelectElement>(null);
  const orderingPhotoRef = useRef<HTMLSelectElement>(null);
  const orderInfoButtonRef = useRef<HTMLButtonElement>(null);

  // console.log('router.query : ', query.id);
  // console.log('product detail data : ', data);
  // console.log('countRate : ', countRate);

  const handleOrderingOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log('handleOrderingOnChange : ', data?.reviewList);
    e.preventDefault();
    if (!data?.reviewList) {
      return;
    }

    let orderReviewList = [...data?.reviewList];

    if (orderingRateRef?.current?.value === 'latestOrder') {
      orderReviewList.sort(function (a, b) {
        if (a.created > b.created) {
          return -1;
        }
        if (a.created < b.created) {
          return 1;
        }

        return 0;
      });

      if (orderingPhotoRef?.current?.value === 'photoview') {
        orderReviewList = orderReviewList.filter(
          (review) => review.reviewimageSet && review.reviewimageSet.length > 0,
        );
      }

      setOrderedList(orderReviewList);
      return;
    }

    if (orderingRateRef?.current?.value === 'highRating') {
      orderReviewList.sort(function (a, b) {
        if (a.rate > b.rate) {
          return -1;
        }
        if (a.rate < b.rate) {
          return 1;
        }

        return 0;
      });

      if (orderingPhotoRef?.current?.value === 'photoview') {
        orderReviewList = orderReviewList.filter(
          (review) => review.reviewimageSet && review.reviewimageSet.length > 0,
        );
      }

      setOrderedList(orderReviewList);
      return;
    }

    if (orderingRateRef?.current?.value === 'lowRating') {
      orderReviewList.sort(function (a, b) {
        if (a.rate > b.rate) {
          return 1;
        }
        if (a.rate < b.rate) {
          return -1;
        }

        return 0;
      });

      if (orderingPhotoRef?.current?.value === 'photoview') {
        orderReviewList = orderReviewList.filter(
          (review) => review.reviewimageSet && review.reviewimageSet.length > 0,
        );
      }
      setOrderedList(orderReviewList);
      return;
    }
  };

  useEffect(() => {
    const countingRate: Array<number> = Array(5).fill(0);
    data?.reviewList.forEach((review) => {
      switch (review.rate) {
        case 1:
          countingRate[0] += 1;
          return;
        case 2:
          countingRate[1] += 1;
          return;
        case 3:
          countingRate[2] += 1;
          return;
        case 4:
          countingRate[3] += 1;
          return;
        case 5:
          countingRate[4] += 1;
          return;
      }
    });

    setCountRate(countingRate);

    setOrderedList(data?.reviewList || null);
  }, [data]);

  const handleDetailInfoClick = () => {
    detailInfoRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleOrderInfoClick = () => {
    orderInfoRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    orderInfoButtonRef.current?.click();
  };

  const handleReviewClick = () => {
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <Box minH="100vh" bgColor="gray.100">
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      {!isLoading && (
        <>
          <Box {...basisProps} pt="120px" pb="80px">
            <Box>
              <Box w="100%" minH="300px" overflow="hidden" h="300px">
                <Box>
                  <Image
                    w="100%"
                    h="100%"
                    src={data?.photo}
                    alt={`${data?.name} ?????????`}
                    background="center / cover no-repeat url('./images/product/bg.png')"
                  />
                </Box>
              </Box>
              <Box
                bgColor="white"
                mt="20px"
                borderTopRadius="20px"
                boxShadow="0px -12px 10px -10px rgba(26, 26, 26, 0.1)"
                position="relative"
                _before={{
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  margin: '0 auto',
                  top: '10px',
                  content: '""',
                  height: '5px',
                  width: '50px',
                  bgColor: 'gray.200',
                  borderRadius: '2.5px',
                }}
              >
                <Flex flexDirection="column" ml="16px" pt="30px">
                  <Flex fontSize="1.25rem">
                    <Box as="strong">{data?.name}</Box>
                    <Box as="span" color="gray.600" pl="5px">
                      {data?.capacity}ml
                    </Box>
                  </Flex>

                  <Box mt="10px" fontSize="1.25rem">
                    <Box
                      as="span"
                      display="inline-block"
                      color="primary.500"
                      fontWeight="700"
                    >
                      {priceFormat(data?.price)}
                    </Box>
                    ???
                  </Box>
                  <Box fontSize="0.75rem" fontWeight="700">
                    3?????? ?????? ?????????
                    <Box as="span" color="primary.500">
                      &nbsp;????????????
                    </Box>
                  </Box>

                  <Text my="10px">{data?.description}</Text>
                  <Flex>
                    <Flex alignItems="center">
                      <Image
                        src="/icons/svg/product/star.svg"
                        w="10px"
                        h="10px"
                        alt="star"
                        mr="8px"
                      />
                    </Flex>
                    <Box as="span" fontWeight="700">
                      {data?.avgRate?.toFixed(1) || '0'}
                    </Box>
                    <Box as="span" color="gray.700">
                      &nbsp;&#40;?????? {data?.reviewCount}???&#41;
                    </Box>
                  </Flex>
                </Flex>
                <Box mx="16px" mt="15px" py="4px">
                  <Button
                    variant="outline"
                    colorScheme="primary"
                    w="100%"
                    h="50px"
                    borderRadius="25px"
                    size="sd"
                    py="12px"
                    mb="10px"
                    onClick={onOpen}
                  >
                    ????????????
                  </Button>
                  <Button
                    colorScheme="primary"
                    w="100%"
                    h="50px"
                    borderRadius="25px"
                    size="sd"
                    py="12px"
                    onClick={onOpen}
                  >
                    ????????????
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                // position="sticky"
                // top={LAYOUT.HEADER.HEIGHT}
                bg={colorMode === 'light' ? '#ffffff' : 'gray.700'}
              >
                <Flex
                  w="full"
                  h="80px"
                  justify="space-around"
                  alignItems="center"
                >
                  <Box
                    as="button"
                    color={colorMode === 'light' ? 'gray.600' : '#ffffff'}
                    onClick={handleDetailInfoClick}
                  >
                    ????????????
                  </Box>
                  <Box
                    as="button"
                    fontWeight="400"
                    color={colorMode === 'light' ? 'gray.600' : '#ffffff'}
                    _hover={{ cursor: 'pointer' }}
                    onClick={handleOrderInfoClick}
                  >
                    ????????????
                  </Box>
                  <Box
                    as="button"
                    fontWeight="400"
                    color={colorMode === 'light' ? 'gray.600' : '#ffffff'}
                    _hover={{ cursor: 'pointer' }}
                    onClick={handleReviewClick}
                  >
                    {/* ?????? ({reviews?.length}) */}
                    ?????? &#40;{data?.reviewCount}&#41;
                  </Box>
                </Flex>
              </Box>

              <Box
                maxH="477px"
                // backgroundColor="yellow"
                ref={detailInfoRef}
                overflow="hidden"
              >
                <VisuallyHidden as="h3">????????????</VisuallyHidden>
                <Box
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.detail === undefined
                        ? ''
                        : data?.detail.search('img') !== -1
                        ? data?.detail
                        : '<p><img height="3051" src="https://incourse-commerce-prod-bucket.s3.ap-northeast-2.amazonaws.com/ckeditor/2022/10/05/image-20221005165807-1.png" width="375" /></p>',
                  }}
                ></Box>
              </Box>

              <Accordion defaultIndex={[1]} allowMultiple>
                <AccordionItem borderWidth={0}>
                  {({ isExpanded }) => (
                    <>
                      <AccordionPanel px={0} pb="20px" pt={0} overflow="hidden">
                        <Box
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.detail === undefined
                                ? ''
                                : data?.detail.search('img') !== -1
                                ? data?.detail
                                : '<p><img height="3051" src="https://incourse-commerce-prod-bucket.s3.ap-northeast-2.amazonaws.com/ckeditor/2022/10/05/image-20221005165807-1.png" width="375" /></p>',
                          }}
                          mt="-477px"
                        ></Box>
                      </AccordionPanel>
                      <Box px="16px" py="1px">
                        <AccordionButton
                          {...ButtonStyle}
                          _expanded={{ border: '1px solid black' }}
                          border="1px solid black"
                          bgColor="white"
                        >
                          {isExpanded ? (
                            <Box as="span" fontWeight="700" flex="1">
                              ???????????? ??????
                              <AccordionIcon />
                            </Box>
                          ) : (
                            <Box as="span" fontWeight="700" flex="1">
                              ???????????? ????????????
                              <AccordionIcon />
                            </Box>
                          )}
                        </AccordionButton>
                      </Box>
                    </>
                  )}
                </AccordionItem>
              </Accordion>

              <Accordion defaultIndex={[1]} allowMultiple pt="25px">
                <AccordionItem>
                  <Box ref={orderInfoRef}>
                    <AccordionButton
                      py="15.5px"
                      ref={orderInfoButtonRef}
                      aria-expanded
                    >
                      <Box
                        as="h3"
                        // ref={orderInfoRef}
                        fontWeight="700"
                        flex="1"
                        textAlign="left"
                      >
                        ?????? ??? ?????? ??????
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Box>
                  <AccordionPanel px="16px" pt="15px" pb="20px">
                    <Box as="p" fontWeight="700">
                      [?????? ??? ?????? ??????]
                    </Box>
                    <VStack spacing="10px" alignItems="flex-start" py="20px">
                      <Box as="p">???????????? : ???????????? ??????</Box>
                      <Box as="p">???????????? : ??????</Box>
                      <Box>
                        <Text>
                          ???????????? : ?????? ?????? ?????? ??? 3,000??? ????????? ??????
                        </Text>
                        <Text pl="71px">
                          ?????? ?????? ?????? ????????? ?????? 30,000??? ?????? ?????? ???
                          ????????????
                        </Text>
                      </Box>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            <Box px="16px" bgColor="white">
              <VisuallyHidden as="h3">??????</VisuallyHidden>
              <HStack pt="51px" pb="30px" justify="space-between">
                <Box ref={reviewRef} fontWeight="700">
                  ??????&nbsp;
                  <span style={{ color: '#FF710B' }}>
                    {data?.reviewList.length}
                  </span>
                  ???
                </Box>
                <HStack spacing="10px">
                  <Select
                    fontWeight="700"
                    fontSize="0.75rem"
                    w="114px"
                    h="30px"
                    bg="gray.200"
                    borderRadius="5px"
                    onChange={handleOrderingOnChange}
                    ref={orderingRateRef}
                    defaultValue="latestOrder"
                  >
                    <option value="latestOrder">?????????</option>
                    <option value="highRating">?????? ?????? ???</option>
                    <option value="lowRating">?????? ?????? ???</option>
                  </Select>
                  <Select
                    fontWeight="700"
                    fontSize="0.75rem"
                    w="97px"
                    h="30px"
                    bg="gray.200"
                    borderRadius="5px"
                    onChange={handleOrderingOnChange}
                    ref={orderingPhotoRef}
                    defaultValue="allview"
                  >
                    <option value="allview">????????????</option>
                    <option value="photoview">????????????</option>
                  </Select>
                </HStack>
              </HStack>
              <Flex justify="space-between" alignItems="center" pb="21px">
                <HStack spacing="0" w="50%">
                  <Box
                    fontWeight="700"
                    bg="primary.500"
                    p="0px 7px"
                    ml="6px"
                    mr="12px"
                    borderRadius="15px"
                    color="white"
                  >
                    {data?.avgRate?.toFixed(1) || '0'}
                  </Box>
                  <StarRating
                    starRating={Number(data?.avgRate?.toFixed())}
                  ></StarRating>
                </HStack>
                {/* <Box w="1px" h="70px" bg="gray.200"></Box> */}
                <VStack
                  spacing="0"
                  alignItems="center"
                  w="50%"
                  boxSizing="border-box"
                  borderLeft="1px solid"
                  borderColor="gray.200"
                >
                  <HStack spacing="23px">
                    {data?.reviewList &&
                      countRate &&
                      countRate.map((count, idx) => {
                        return (
                          <ReviewChartBar
                            key={idx}
                            count={count}
                            countAll={data?.reviewList.length}
                          />
                        );
                      })}
                  </HStack>
                  <Box w="150px" h="1px" bg="gray.200"></Box>
                  <HStack
                    fontSize="0.75rem"
                    fontWeight="400"
                    spacing="15px"
                    mt="4px"
                    color="gray.600"
                  >
                    <Box>1???</Box>
                    <Box>2???</Box>
                    <Box>3???</Box>
                    <Box>4???</Box>
                    <Box>5???</Box>
                  </HStack>
                </VStack>
              </Flex>

              {orderedList &&
                orderedList.map((review) => (
                  <ReviewItem key={review?.id} review={review} />
                ))}
            </Box>
          </Box>
          <OrderDrawer onClose={onClose} isOpen={isOpen} data={data} />
        </>
      )}
    </Box>
  );
}

export default DetailProductPage;

const ButtonStyle = {
  w: 'full',
  h: '50px',
  borderRadius: '25px',
  size: 'sd',
  py: '12px',
};
