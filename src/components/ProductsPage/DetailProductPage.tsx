import React, { useRef } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ChakraProps,
  Flex,
  HStack,
  Image,
  Select,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';

import StarRating from '@components/common/StarRating/StarRating';

import { LAYOUT } from '@constants/layout';

interface DetailProductPageProps extends ChakraProps {}

function DetailProductPage({ ...basisProps }: DetailProductPageProps) {
  const { colorMode } = useColorMode();
  const detailInfoRef = useRef<HTMLDivElement>(null);
  const orderInfoRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

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
  };

  const handleReviewClick = () => {
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <Box {...basisProps} pt="120px" pb="80px" px="16px">
      <Box>
        <Box borderTopRadius="20px" w="100%" overflow="hidden">
          <Box>
            <Image
              w="100%"
              src="/images/product/sampleImg.png"
              // backgroundColor="yellow"
            />
          </Box>
        </Box>
        <Box
          mt="20px"
          borderTopRadius="20px"
          boxShadow="0px -12px 10px -10px rgba(26, 26, 26, 0.1)"
        >
          <Flex flexDirection="column" ml="16px" pt="30px">
            <Flex fontSize="1.25rem">
              <Box as="strong">인코스런 로션</Box>
              <Box
                as="span"
                style={{
                  paddingLeft: '5px',
                  color: 'gray.600',
                }}
              >
                300ml
              </Box>
            </Flex>

            <Box mt="10px" fontSize="1.25rem">
              <Box
                as="span"
                display="inline-block"
                color="primary.500"
                fontWeight="700"
              >
                27,000
              </Box>
              원
            </Box>
            <Box fontSize="0.75rem" fontWeight="700">
              3만원 이상 구매시
              <Box as="span" color="primary.500">
                &nbsp;무료배송
              </Box>
            </Box>

            <Text my="10px">
              순하고 마일드한 안심 처방으로 피부가 민감하고 연약한 우리 아이를
              위한 고보습 로션
            </Text>
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
                4.3
              </Box>
              <Box as="span" color="gray.700">
                &nbsp;(리뷰 123개)
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
              // onClick={onOpen}
            >
              장바구니
            </Button>
            <Button
              colorScheme="primary"
              w="100%"
              h="50px"
              borderRadius="25px"
              size="sd"
              py="12px"
              // onClick={onOpen}
            >
              바로구매
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
          <Flex w="full" h="80px" justify="space-around" alignItems="center">
            <Box
              as="button"
              color={colorMode === 'light' ? 'gray.600' : '#ffffff'}
              onClick={handleDetailInfoClick}
            >
              상세정보
            </Box>
            <Box
              as="button"
              fontWeight="400"
              color={colorMode === 'light' ? 'gray.600' : '#ffffff'}
              _hover={{ cursor: 'pointer' }}
              onClick={handleOrderInfoClick}
            >
              구매정보
            </Box>
            <Box
              as="button"
              fontWeight="400"
              color={colorMode === 'light' ? 'gray.600' : '#ffffff'}
              _hover={{ cursor: 'pointer' }}
              onClick={handleReviewClick}
            >
              {/* 리뷰 ({reviews?.length}) */}
              리뷰 &#40;78&#41;
            </Box>
          </Flex>
        </Box>

        <Box h="2000px" backgroundColor="yellow" ref={detailInfoRef}>
          {/* detail */}
        </Box>

        <Accordion defaultIndex={[1]} allowMultiple>
          <AccordionItem borderWidth={0}>
            {({ isExpanded }) => (
              <>
                <AccordionPanel px={0} pb="20px" pt={0} overflow="hidden">
                  <Box w="100%" h="200px" backgroundColor="blue"></Box>
                  <Image
                    // src={detail.detailImg}
                    alt="detail"
                    // marginTop="-477px"
                  />
                </AccordionPanel>
                <Box px="16px">
                  <AccordionButton
                    {...ButtonStyle}
                    _expanded={{ border: '1px solid black' }}
                    border="1px solid black"
                  >
                    {isExpanded ? (
                      <Box as="span" fontWeight="700" flex="1">
                        상세정보 접기
                        <AccordionIcon />
                      </Box>
                    ) : (
                      <Box as="span" fontWeight="700" flex="1">
                        상세정보 펼처보기
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
              {/* <AccordionButton py="15.5px" ref={buttonRef}> */}
              <AccordionButton py="15.5px">
                <Box
                  as="h3"
                  // ref={orderInfoRef}
                  fontWeight="700"
                  flex="1"
                  textAlign="left"
                >
                  주문 및 배송 안내
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Box>
            <AccordionPanel px="16px" pt="15px" pb="20px">
              <Box as="p" fontWeight="700">
                [주문 및 배송 안내]
              </Box>
              <VStack spacing="10px" alignItems="flex-start" py="20px">
                <Box as="p">배송방법 : 인코스런 택배</Box>
                <Box as="p">배송지역 : 전국</Box>
                <Box>
                  <Text>배송비용 : 단품 상품 구매 시 3,000원 배송비 발생</Text>
                  <Text pl="71px">
                    그외 단품 묶음 구매의 경우 30,000원 이상 구매 시 무료배송
                  </Text>
                </Box>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <Box px="16px">
        <HStack pt="51px" pb="30px" justify="space-between">
          <Box ref={reviewRef} fontWeight="700">
            리뷰{' '}
            <span style={{ color: '#FF710B' }}>{/* {reviews?.length} */}</span>
            건
          </Box>
          <HStack spacing="10px">
            <Select
              fontWeight="700"
              fontSize="0.75rem"
              w="115px"
              h="30px"
              bg="gray.200"
              borderRadius="5px"
              // onChange={handleOrderingOnChange}
              defaultValue="created_at"
            >
              <option value="-created_at">최신순</option>
              <option value="-rating">평점 높은 순</option>
              <option value="rating">평점 낮은 순</option>
            </Select>
            <Select
              fontWeight="700"
              fontSize="0.75rem"
              w="100px"
              h="30px"
              bg="gray.200"
              borderRadius="5px"
              // onChange={handleHasPhotoOnChange}
              defaultValue="전체보기"
            >
              <option value="false">전체보기</option>
              <option value="true">포토리뷰</option>
            </Select>
          </HStack>
        </HStack>
        <Flex justify="space-between" alignItems="center" pb="21px">
          <HStack spacing={0}>
            <Box
              fontWeight="700"
              bg="primary.500"
              p="0px 7px"
              ml="6px"
              mr="12px"
              borderRadius="15px"
              color="white"
            >
              {/* {detail.avgRating?.toFixed(1)} */}
            </Box>
            {/* <StarRating
              starRating={Number(detail.avgRating?.toFixed())}
            ></StarRating> */}
          </HStack>
          <Box w="1px" h="70px" bg="gray.200"></Box>
          <VStack spacing={0} alignItems="center">
            <HStack spacing="23px">
              {/* {reviews &&
                ratingCounts &&
                ratingCounts.map((count, index) => {
                  return (
                    <ReviewChartBar
                      key={index}
                      count={count}
                      countAll={reviews?.length}
                    />
                  );
                })} */}
            </HStack>
            <Box w="150px" h="1px" bg="gray.200"></Box>
            <HStack
              fontWeight="0.75rem"
              spacing="15px"
              mt="4px"
              color="gray.600"
            >
              <Box>1점</Box>
              <Box>2점</Box>
              <Box>3점</Box>
              <Box>4점</Box>
              <Box>5점</Box>
            </HStack>
          </VStack>
        </Flex>

        {/* {reviews &&
          reviews.map((review) => (
            <SingleReview key={review.id} review={review} />
          ))} */}
      </Box>
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
