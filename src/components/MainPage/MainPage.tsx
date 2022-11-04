import { GetStaticProps } from 'next';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  HStack,
  Image,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  VisuallyHidden,
  keyframes,
} from '@chakra-ui/react';

import { setAuthHeader } from '@apis/_axios/instance';
import productApi from '@apis/reactquery/QueryApi';
import {
  useGetCartQuery,
  useGetMyInfoQuery,
} from '@apis/reactquery/QueryApi.query';

import StarRating from '@components/common/StarRating/StarRating';

import { getToken } from '@utils/localStorage/token';

import ReviewByTag from './_fragments/ReviewByTag';

export const TAG_LIMIT = 7;
export const TAG_OFFSET = 2;

export interface IMainReview {
  tagId: number;
  nickname: string;
  rate: number;
  content: string;
  created: string;
  reviewimageSet?: Array<{
    id?: number;
    reviewId?: number;
    url: string;
  }>;
}

interface MainPageProps extends ChakraProps {
  mainReviews: Array<IMainReview>;
}

function MainPage({ mainReviews, ...basisProps }: MainPageProps) {
  const router = useRouter();
  const [tagId, setTagId] = useState<number>(0);
  const { data: userData } = useGetMyInfoQuery();
  // console.log('mainReviews : ', mainReviews);
  //   {
  //   options: { staleTime: 1800, cacheTime: Infinity },
  // }
  // console.log('main page data : ', userData);

  const { data: cartData = [] } = useGetCartQuery({
    variables: userData?.id,
    options: {
      enabled: !!userData,
      onSuccess: (data) => {
        if (data.length === 0) {
          // 장바구니 x 상품 x
          const form = new FormData();
          form.append('userId', String(userData?.id));
          productApi.postCart(form);
          console.log('MainPage 장바구니 생성!!!!! : ', cartData);
          // 장바구니가 비어있습니다 페이지 출력. useState에 flag추가하여 조건부 렌더링 필요.
        }
      },
    },
  });

  useEffect(() => {
    const token = getToken();
    if (!token?.access) router.replace('/login');
    else setAuthHeader(token?.access);
  }, [router]);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { tabNumber } = e.currentTarget.dataset;
    // console.log('e.currentTarget.data : ', tabNumber);
    setTagId(Number(tabNumber));
  };

  return (
    <Box {...basisProps}>
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Box
        bgImage="./images/main/bg_main.png"
        bgRepeat="no-repeat"
        bgSize="cover"
        h="782px"
        px="16px"
      >
        <Box as="h3" {...TitleText} pt="160px">
          지속가능한 <br />
          클린&비건뷰티, 인코스런
        </Box>
        <Box {...SubText} pt="20px">
          자연과 사람에게 <br />
          책임질 수 있는 지속 가능한 <br />
          제품을 만듭니다.
        </Box>
      </Box>

      <Box bgColor="#FFFCEF" h="782px" pos="relative">
        <Image
          src="./images/main/item0.png"
          w="244px"
          alt="과도한 패키징"
          style={{ position: 'absolute', top: '20px', left: '30px' }}
        />
        <Image
          src="./images/main/item1.png"
          w="236px"
          alt="불합리한 유통구조"
          style={{ position: 'absolute', top: '160px', right: '0px' }}
        />
        <Image
          src="./images/main/item2.png"
          w="175px"
          alt="과장된 광고"
          style={{ position: 'absolute', top: '305px', left: '0px' }}
        />
        <Box
          as="p"
          {...TitleText}
          pos="absolute"
          top="481px"
          right="36px"
          _before={{
            content: '""',
            display: 'block',
            width: '2px',
            height: '18px',
            backgroundColor: 'primary.500',
            position: 'absolute',
            bottom: '16px',
            left: '-20px',
          }}
          _after={{
            content: '""',
            display: 'block',
            height: '2px',
            width: '18px',
            backgroundColor: 'primary.500',
            position: 'absolute',
            bottom: '24px',
            left: '-28px',
          }}
        >
          불합리한 유통구조 <br />
          과도한 패키징 <br />
          과장된 광고
        </Box>
        <Box as="p" {...SubText} pos="absolute" right="30px" bottom="60px">
          부풀려지는 가격은 이제 그만! <br />
          <span style={{ color: '#FF7A00', fontWeight: '700' }}>인코스런</span>
          은 가격거품을 제거한 <br />
          착한소비를 위해 태어났습니다.
        </Box>
      </Box>

      <Box bgColor="#FFFCEF" h="430px" px="16px" py="65px" pos="relative">
        <Image
          src="/images/main/ellipse0.png"
          style={{ margin: '0 auto' }}
          alt="background image"
        />
        <Image
          src="/images/main/ellipse1.png"
          style={{
            width: '77px',
            position: 'absolute',
            bottom: '132px',
            left: '22px',
          }}
          alt="background image"
        />
        <Box
          {...TitleText}
          position="absolute"
          top="calc(50% - 38px)"
          left="calc(50% - 90px)"
          textAlign="center"
        >
          <Box as="p">
            이제&nbsp;
            <Box
              as="span"
              _before={Dot}
              display="inline-block"
              position="relative"
            >
              합
            </Box>
            <Box
              as="span"
              _before={Dot}
              display="inline-block"
              position="relative"
            >
              리
            </Box>
            <Box
              as="span"
              _before={Dot}
              display="inline-block"
              position="relative"
            >
              적
            </Box>
            으로
            <br />
            지갑을 지키세요!
          </Box>
        </Box>
      </Box>

      <Flex
        h="1960px"
        px="16px"
        pos="relative"
        flexDir="column"
        alignItems="center"
      >
        <Box
          as="h3"
          {...TitleText}
          color="primary.500"
          pt="80px"
          w="full"
          textAlign="center"
          pos="relative"
        >
          부풀려지는 가격 이제 그만!
        </Box>
        <Box as="p" {...SubText} w="full" textAlign="center" pt="20px">
          불합리한&nbsp;
          <span style={{ fontWeight: '700' }}>중간 유통 거품을 제거</span>
          한 <br />
          인코스런 만의 투명한 유통혁신
        </Box>
        <Flex pos="absolute" top="256px" left="75px" alignItems="center">
          <Box
            w="150px"
            h="150px"
            bg="#FF710B"
            borderRadius="50%"
            pos="relative"
            zIndex={100}
          >
            <Box pos="absolute" top="25px" left="25px">
              <Image src="./icons/svg/main/step1.svg" alt="step1" />
            </Box>
          </Box>
          <Flex
            {...StepText}
            color="gray.800"
            flexDir="column"
            alignItems="center"
            ml="10px"
          >
            <Box pos="relative">
              <Box as="strong"> STEP 1</Box>
              <Box pos="absolute" left="-18px" top="7px">
                <Image
                  src="./icons/svg/join/checkedicon.svg"
                  alt="check icon"
                />
              </Box>
            </Box>
            <Box as="p" textAlign="center">
              제조공장의 <br />
              제조 및 개발비용
            </Box>
          </Flex>
        </Flex>
        <Flex pos="absolute" top="446px" left="75px" alignItems="center">
          <Box
            w="150px"
            h="150px"
            border="2px solid #CBCED6"
            bg="#FFFFFF"
            borderRadius="50%"
            pos="relative"
            zIndex={100}
          >
            <Box pos="absolute" top="25px" left="25px">
              <Image src="./icons/svg/main/step2.svg" alt="step2" />
            </Box>
          </Box>
          <Flex
            {...StepText}
            color="gray.400"
            flexDir="column"
            alignItems="center"
            ml="10px"
          >
            <Box pos="relative">
              <Box as="strong"> STEP 2</Box>
            </Box>
            <Box as="p">물류 및 운송비용</Box>
          </Flex>
        </Flex>
        <Flex pos="absolute" top="636px" left="75px" alignItems="center">
          <Box
            w="150px"
            h="150px"
            border="2px solid #CBCED6"
            borderRadius="50%"
            bg="#FFFFFF"
            pos="relative"
            zIndex={100}
          >
            <Box pos="absolute" top="25px" left="25px">
              <Image src="./icons/svg/main/step3.svg" alt="step3" />
            </Box>
          </Box>
          <Flex
            {...StepText}
            color="gray.400"
            flexDir="column"
            alignItems="center"
            ml="26px"
          >
            <Box pos="relative">
              <Box as="strong"> STEP 3</Box>
            </Box>
            <Box as="p">결제 수수료</Box>
          </Flex>
        </Flex>
        <Flex pos="absolute" top="826px" left="75px" alignItems="center">
          <Box
            w="150px"
            h="150px"
            bg="primary.500"
            borderRadius="50%"
            pos="relative"
            zIndex={100}
          >
            <Box pos="absolute" top="25px" left="25px">
              <Image src="./icons/svg/main/step4.svg" alt="step4" />
            </Box>
          </Box>
          <Flex
            {...StepText}
            color="gray.800"
            flexDir="column"
            alignItems="center"
            ml="26px"
          >
            <Box pos="relative">
              <Box as="strong"> STEP 4</Box>
              <Box pos="absolute" left="-18px" top="7px">
                <Image
                  src="/icons/svg/join/checkedicon.svg"
                  alt="checked_line"
                />
              </Box>
            </Box>
            <Box as="p">소비자 가격</Box>
          </Flex>
        </Flex>
        <Box
          pos="absolute"
          top="373px"
          left="152px"
          h="489px"
          borderLeft="2px solid #CBCED6"
          zIndex={1}
        />
        <Box pos="absolute" top="999px" h="37px">
          <Image src="./icons/svg/main/divider.svg" alt="divider" />
        </Box>
        <Box h="840px"></Box>
        <Box
          as="strong"
          {...StepText}
          fontWeight="700"
          color="primary.500"
          pt="20px"
        >
          SAVE MONEY
        </Box>
        <Flex flexDir="column" pt="30px" textAlign="center" {...StepText}>
          <Box as="strong" color="#FF7A00" fontWeight="700">
            * 온라인 직접 판매
          </Box>
          <Box as="p" w="80%" textAlign="center" margin="0 auto">
            인코스런은 온라인으로만 직접판매하여, 더 낮은 가격을 만들어냅니다.
          </Box>
        </Flex>
        <Box as="h3" {...TitleText} fontWeight={400} pt="80px">
          이렇게 <span style={{ fontWeight: 700 }}>비교하세요!</span>
        </Box>
        <Flex flexDir="column" pt="20px" textAlign="center" {...SubText}>
          <Box as="p">인코스런은 부담스러운</Box>
          <Box as="p">
            영유아 화장품의
            <span
              style={{
                fontWeight: 700,
                position: 'relative',
                textDecoration: 'underline #FF710B 10px',
                textUnderlineOffset: '-10px',
              }}
            >
              가격거품을 제거해
            </span>
          </Box>
          <Box as="p">
            <span
              style={{
                fontWeight: 700,
                position: 'relative',
                textDecoration: 'underline #FF710B 10px',
                textUnderlineOffset: '-10px',
              }}
            >
              투명한 가격
            </span>
            을 만들어 갑니다.
          </Box>
        </Flex>
        <HStack pt="70px" spacing="23px" alignItems="flex-end">
          <Flex flexDir="column" alignItems="center">
            <Flex
              flexDir="column"
              pt="20px"
              w="150px"
              h="360px"
              alignItems="center"
              bg="#CBCED6"
            >
              <Flex
                {...PriceText}
                w="90px"
                h="30px"
                borderRadius="15px"
                bg="gray.700"
                color="white"
                justify="center"
                alignItems="center"
              >
                2~30,000원
              </Flex>
            </Flex>
            <Box {...SubText} color="gray.700" pt="10px">
              시중 주요브랜드
            </Box>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Flex
              flexDir="column"
              pt="20px"
              w="150px"
              h="120px"
              alignItems="center"
              bg="#FFF3E0"
            >
              <Flex
                {...PriceText}
                w="74px"
                h="30px"
                borderRadius="15px"
                bg="primary.500"
                color="white"
                justify="center"
                alignItems="center"
              >
                9,900원
              </Flex>
              <Box pt="20px">
                <Image src="./icons/svg/main/logo.svg" alt="logo" />
              </Box>
            </Flex>
            <Box {...SubText} fontWeight={700} pt="10px" color="primary.500">
              인코스런
            </Box>
          </Flex>
        </HStack>
      </Flex>

      <Box
        w="full"
        h="450px"
        bgImage="url('./icons/svg/main/background.svg')"
        pos="relative"
      >
        <Flex
          pos="absolute"
          top="100px"
          left="16px"
          {...TitleText}
          flexDir="column"
          alignItems="flex-start"
        >
          <Box as="p" fontWeight={400}>
            <span style={{ color: '#FF710B', fontWeight: 700 }}>인코스런</span>
            가입하고
          </Box>
          <Box as="p">전상품 1000원 혜택</Box>
          <Box as="p" fontWeight={400}>
            받아보세요
          </Box>
        </Flex>
        <Flex
          pos="absolute"
          top="234px"
          left="16px"
          {...StepText}
          alignItems="center"
          cursor="pointer"
        >
          이벤트상세보기
          <Box pl="9.5px" mt="2.5px">
            <Image src="/icons/svg/main/arrow.svg" alt="arrow" />
          </Box>
        </Flex>
      </Box>

      <Box
        px="16px"
        py="20px"
        w="full"
        h="1354px"
        bgImage="url('/icons/svg/main/background2.svg')"
      >
        <Flex
          w="full"
          h="1314px"
          bg="#FFFFFF"
          flexDir="column"
          alignItems="center"
        >
          <Box as="p" {...TitleText} pt="71px">
            소중한 우리 아이를 위해
          </Box>
          <Box as="p" {...StepText} pt="20px" textAlign="center" w="86%">
            순수 자연유래 / 자연유래 유화제 / 자연유래 계면활성제 99.9% 타가는
            EWG 그린등급 성분 100% 만을 사용한 건강한 화장품입니다.
          </Box>
          <Flex pt="30px">
            <Button {...ButtonStyle} onClick={() => router.push('/products')}>
              상품전체보기
            </Button>
          </Flex>
          <Flex flexDir="column" alignItems="center" pt="80px">
            <Image
              src="/images/main/product.png"
              alt="product"
              w="151px"
              h="189px"
            ></Image>
            <Box as="strong" {...ProductText} pt="10px">
              바스&샴푸
            </Box>
          </Flex>
          <Flex flexDir="column" alignItems="center" pt="80px">
            <Image
              src="/images/main/product.png"
              alt="product"
              w="151px"
              h="189px"
            ></Image>
            <Box as="strong" {...ProductText} pt="10px">
              오일
            </Box>
          </Flex>
          <Flex flexDir="column" alignItems="center" pt="80px">
            <Image
              src="/images/main/product.png"
              alt="product"
              w="151px"
              h="189px"
            ></Image>
            <Box as="strong" {...ProductText} pt="10px">
              파우더 로션
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Flex
        w="100%"
        h="876px"
        flexDir="column"
        alignItems="center"
        pos="relative"
      >
        <Box
          as="h3"
          {...TitleText}
          fontWeight={400}
          pt="80px"
          textAlign="center"
        >
          인코스런을 <span style={{ fontWeight: 700 }}>직접 사용해본</span>
          <br />
          고객님의 솔직한 리뷰
        </Box>
        <Flex
          w="100%"
          pt="50px"
          gap="10px"
          pl="16px"
          ml={0}
          alignSelf="flex-start"
          overflowX="scroll"
          css={
            {
              // '&::-webkit-scrollbar': {
              //   width: '4px',
              // },
              // '&::-webkit-scrollbar-track': {
              //   width: '6px',
              // },
              // '&::-webkit-scrollbar-thumb': {
              //   // background: 'black',
              //   // borderRadius: '24px',
              // },
              // '&::-webkit-scrollbar': {
              //   // width: '10px' /* 세로축 스크롤 바 길이 */,
              //   height: '2px' /* 가로축 스크롤 바 길이 */,
              // },
              // '&::-webkit-scrollbar-button:start': {
              //   backgroundColor: 'white' /* Top, Left 방향의 이동버튼 */,
              // },
              // '&::-webkit-scrollbar-button:end': {
              //   backgroundColor: 'white' /* Bottom, Right 방향의 이동버튼 */,
              // },
              // '&::-webkit-scrollbar-track-piece': {
              //   backgroundColor: 'white' /*스크롤 바 배경 색상*/,
              // },
              // '&::-webkit-scrollbar-thumb': {
              //   borderRadius: '8px',
              //   backgroundColor: 'gray' /*스크롤 바 색상*/,
              // },
            }
          }
        >
          <Button
            size="sm"
            w="53px"
            colorScheme={tagId === 0 ? 'primary' : undefined}
            bg={tagId === 0 ? undefined : 'gray.200'}
            fontWeight={tagId === 0 ? undefined : '400'}
            borderRadius="15px"
            flexShrink="0"
            fontSize="0.75rem"
            data-tab-number="0"
            onClick={handleTabClick}
          >
            전체
          </Button>
          <Button
            size="sm"
            px="20px"
            w="83px"
            colorScheme={tagId === 1 ? 'primary' : undefined}
            bg={tagId === 1 ? undefined : 'gray.200'}
            fontWeight={tagId === 1 ? undefined : '400'}
            borderRadius="15px"
            flexShrink="0"
            fontSize="0.75rem"
            data-tab-number="1"
            onClick={handleTabClick}
          >
            바스 & 샴푸
          </Button>
          <Button
            size="sm"
            w="53px"
            colorScheme={tagId === 2 ? 'primary' : undefined}
            bg={tagId === 2 ? undefined : 'gray.200'}
            fontWeight={tagId === 2 ? undefined : '400'}
            borderRadius="15px"
            flexShrink="0"
            fontSize="0.75rem"
            data-tab-number="2"
            onClick={handleTabClick}
          >
            오일
          </Button>
          <Button
            size="sm"
            w="53px"
            colorScheme={tagId === 3 ? 'primary' : undefined}
            bg={tagId === 3 ? undefined : 'gray.200'}
            fontWeight={tagId === 3 ? undefined : '400'}
            borderRadius="15px"
            flexShrink="0"
            fontSize="0.75rem"
            data-tab-number="3"
            onClick={handleTabClick}
          >
            로션
          </Button>
          <Button
            size="sm"
            w="53px"
            colorScheme={tagId === 4 ? 'primary' : undefined}
            bg={tagId === 4 ? undefined : 'gray.200'}
            fontWeight={tagId === 4 ? undefined : '400'}
            borderRadius="15px"
            flexShrink="0"
            fontSize="0.75rem"
            data-tab-number="4"
            onClick={handleTabClick}
          >
            크림
          </Button>
          <Button
            size="sm"
            colorScheme={tagId === 5 ? 'primary' : undefined}
            bg={tagId === 5 ? undefined : 'gray.200'}
            fontWeight={tagId === 5 ? undefined : '400'}
            borderRadius="15px"
            flexShrink="0"
            fontSize="0.75rem"
            data-tab-number="5"
            onClick={handleTabClick}
          >
            파우더 로션
          </Button>
        </Flex>

        <HStack
          pt="70px"
          pl="16px"
          spacing="10px"
          alignSelf="flex-start"
          w="100%"
          overflowX="scroll"
          opacity="0"
          animation={`${fadeIn} 1s forwards`}
        >
          {mainReviews
            // .filter((item) => item.tagId === tagId)
            .map((mainReview, idx) => (
              <ReviewByTag
                key={`reviewId${mainReview.tagId}Idx${idx}`}
                tabNumber={tagId}
                mainReview={mainReview}
              />
            ))}
        </HStack>
        <Box pos="absolute" bottom="20px" right="6px" w="60px" h="60px">
          <Image src="./icons/svg/main/info.svg" alt="info" />
        </Box>
      </Flex>

      {/* <Box>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab
              onClick={() => {
                setTagId(1);
              }}
            >
              Tab 1
            </Tab>
            <Tab
              onClick={() => {
                setTagId(2);
              }}
            >
              Tab 2
            </Tab>
            <Tab
              onClick={() => {
                setTagId(3);
              }}
            >
              Tab 3
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
              <ReviewByTag tagId={1} />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
              <ReviewByTag tagId={2} />
            </TabPanel>
            <TabPanel>
              <p>three!</p>
              <ReviewByTag tagId={3} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box> */}

      <Box bgGradient="linear(to-r, #FF710B, #FFAB2E)" position="relative">
        <VStack w="100%" alignItems="center">
          <Box as="h3" {...MoreInfoTitleText} pt="83px">
            인코스런에 대해 더 궁금하신가요?
          </Box>
          <Box as="p" {...MoreInfoSubText} pt="2px" textAlign="center">
            인스타그램을 방문하시면 더욱 다양한 <br />
            인코스런의 이야기를 확인하실 수 있어요!
          </Box>
          <Flex
            {...MoreInfoSubText}
            alignItems="center"
            pt="4px"
            pb="82px"
            fontWeight="700"
          >
            <Link href="https://www.instagram.com/incourse.run">
              <Flex as="strong" cursor="pointer">
                <Image
                  pr="8px"
                  src="/icons/svg/instagram.svg"
                  alt="instagram"
                />
                INCOURSE.RUN
              </Flex>
            </Link>
          </Flex>
          <a href="#">
            <Box
              border="2px solid #1A1A1A"
              w="50px"
              h="50px"
              borderRadius="50%"
              position="fixed"
              right="16px"
              bottom="20px"
            >
              <Box
                position="absolute"
                width="12px"
                height="12px"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%) rotate(45deg)"
                _before={{
                  content: '""',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  border: '2px solid #1A1A1A',
                  borderRight: 0,
                  borderBottom: 0,
                }}
                _after={{
                  content: '""',
                  height: '2px',
                  width: '16px',
                  backgroundColor: '#1A1A1A',
                  position: 'absolute',
                  transformOrigin: '0 100%',
                  transform: 'rotate(45deg)',
                }}
              ></Box>
            </Box>
          </a>
        </VStack>
      </Box>
    </Box>
  );
}

export default MainPage;

const TitleText = {
  fontWeight: 700,
  fontSize: '26px',
  lineHeight: '38px',
};

const SubText = {
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '29px',
};

const Dot = {
  content: '""',
  display: 'block',
  width: '8px',
  height: '8px',
  backgroundColor: 'primary.500',
  borderRadius: '50%',
  position: 'absolute',
  top: '-7px',
  left: 'calc(50% - 4px)',
};

const StepText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '1.5em',
};

const PriceText = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '1.5em',
};

const ProductText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '1.5em',
};

const ReviewrStyle = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '1.5em',
};

const ReviewDateStyle = {
  fontSize: '12px',
  color: 'gray.700',
  fontWeight: '400',
};

const ReviewContentStyle = {
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '1.5em',
};

const ButtonStyle = {
  w: '190px',
  h: '50px',
  borderRadius: '25px',
  py: '12px',
  colorScheme: 'primary',
  fontWeight: '700',
  fontSize: '1rem',
};

const MoreInfoTitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
  color: 'white',
};

const MoreInfoSubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'white',
};

const fadeIn = keyframes`
from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
