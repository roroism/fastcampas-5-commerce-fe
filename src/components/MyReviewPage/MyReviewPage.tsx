import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  Link,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';

import { setAuthHeader } from '@apis/_axios/instance';
import {
  useGetMyInfoQuery,
  useGetMyReviewQuery,
} from '@apis/reactquery/QueryApi.query';

import ReviewItem from '@components/ProductsPage/_fragments/ReviewItem';

import { getToken } from '@utils/localStorage/token';

export const MY_REVIEW_PAGE_SIZE = 5;
export const MY_REVIEW_PAGE_NUMBER_SIZE = 5;

interface MyReviewPageProps extends ChakraProps {}

function MyReviewPage({ ...basisProps }: MyReviewPageProps) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { data: userData } = useGetMyInfoQuery();
  const { data: myReviewData, isLoading: myReviewIsLoading } =
    useGetMyReviewQuery({
      variables: { id: userData?.id as number, page: page },
      options: { enabled: !!userData?.id, keepPreviousData: true },
    });

  console.log('myReviewData : ', myReviewData);

  useEffect(() => {
    const token = getToken();
    if (!token?.access) router.replace('/login');
    else setAuthHeader(token?.access);
  }, [router]);

  const pageNumberRendering = () => {
    const result = [];

    const countAll = myReviewData?.count || MY_REVIEW_PAGE_SIZE;

    if (myReviewData?.previous) {
      result.push(
        <div key="prevarrow">
          <Button
            fontSize="1rem"
            minW="0"
            variant="unstyled"
            fontWeight="700"
            onClick={() => {
              setPage((prev) => prev - 1);
              window.scrollTo(0, 0);
            }}
          >
            &lt;
          </Button>
        </div>,
      );
    } else {
      result.push(<div key="prevarrow" style={{ width: '9px' }}></div>);
    }
    console.log('page : ', page);

    const lastPageNumber = Math.ceil(countAll / MY_REVIEW_PAGE_SIZE);
    const beginPageNumber: number =
      Math.floor((page - 1) / MY_REVIEW_PAGE_NUMBER_SIZE) *
      MY_REVIEW_PAGE_NUMBER_SIZE;
    let endPageNumber: number;
    if (
      beginPageNumber <= lastPageNumber &&
      lastPageNumber < beginPageNumber + 5
    ) {
      endPageNumber = lastPageNumber;
    } else {
      endPageNumber = beginPageNumber + 5;
    }

    // for (let i = 0; i < Math.ceil(countAll / PAGE_SIZE); i++) {
    for (let i = beginPageNumber; i < endPageNumber; i++) {
      result.push(
        <div key={i + 1}>
          <Button
            fontSize="1rem"
            minW="0"
            variant="unstyled"
            fontWeight="700"
            onClick={() => {
              setPage(i + 1);
              window.scrollTo(0, 0);
            }}
            color={page === i + 1 ? 'black' : 'gray.400'}
          >
            {i + 1}
          </Button>
        </div>,
      );
    }

    if (myReviewData?.next) {
      result.push(
        <div key="nextarrow">
          <Button
            fontSize="1rem"
            minW="0"
            variant="unstyled"
            fontWeight="700"
            onClick={() => {
              setPage((prev) => prev + 1);
              window.scrollTo(0, 0);
            }}
          >
            &gt;
          </Button>
        </div>,
      );
    } else {
      result.push(<div key="nextarrow" style={{ width: '9px' }}></div>);
    }

    return result;
  };

  return (
    <Box {...basisProps} id="top">
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Box as="h3" fontWeight="700" fontSize="1.25rem" px="16px" mt="130px">
        내 상품 리뷰
      </Box>
      <Text fontWeight="700" mt="80px" mb="30px" px="16px">
        총&nbsp;
        <Box as="span" color="primary.500">
          {myReviewData?.count}
        </Box>
        건
      </Text>
      <Box minH="55vh" px="16px">
        {myReviewData?.results.map((myReview) => {
          return <ReviewItem key={myReview.id} review={myReview} />;
        })}
      </Box>

      <Flex gap="30px" justifyContent="center" my="50px">
        {!myReviewIsLoading && pageNumberRendering()}
      </Flex>
    </Box>
  );
}

export default MyReviewPage;
