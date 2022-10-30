import {
  Box,
  ChakraProps,
  Flex,
  HStack,
  Image,
  VStack,
} from '@chakra-ui/react';

import { useGetProductTagReviewQuery } from '@apis/reactquery/QueryApi.query';

import StarRating from '@components/common/StarRating/StarRating';

import { IMainReview } from '../MainPage';

interface ReviewByTagProps extends ChakraProps {
  mainReview: IMainReview;
}

const ReviewByTag = ({ mainReview, ...basisProps }: ReviewByTagProps) => {
  // const { data: TagReviewList } = useGetProductTagReviewQuery({
  //   variables: { tagId: tagId },
  // });

  // console.log(`TagReviewList ${tagId} : `, TagReviewList);

  return (
    <Box {...basisProps}>
      <Box
        w="325px"
        h="464px"
        borderRadius="20px"
        boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
        flexShrink="0"
      >
        <VStack spacing={0} py="23px" pb="30px" px="20px" w="full">
          <Flex w="full" justify="space-between">
            <Box as="strong" {...ReviewrStyle}>
              {mainReview?.nickname}
            </Box>
            <StarRating starRating={mainReview.rate} width="7.5px" />
          </Flex>
          <Box as="span" {...ReviewDateStyle} w="full">
            {mainReview?.created}
          </Box>
          <Box as="p" {...ReviewContentStyle} w="full" pt="30px">
            {mainReview?.content}
          </Box>
          <HStack
            spacing="10px"
            w="full"
            justify="flex-start"
            pt="20px"
            borderTop="1px solid #EAECF0"
          >
            {mainReview?.reviewimageSet &&
              mainReview?.reviewimageSet?.length > 0 &&
              mainReview?.reviewimageSet?.map((item, idx) => (
                <Image
                  key={idx}
                  src={item?.url}
                  w="80px"
                  h="80px"
                  alt="review image"
                />
              ))}
            {/* <Image
              src="images/review/review1.png"
              w="80px"
              h="80px"
              alt="review image"
            /> */}
            {/* <Image
              src="images/review/review2.png"
              w="80px"
              h="80px"
              alt="review image"
            />
            <Image
              src="images/review/review3.png"
              w="80px"
              h="80px"
              alt="review image"
            /> */}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ReviewByTag;

const ReviewrStyle = {
  fontWeight: 700,
  fontSize: '0.75rem',
  lineHeight: '1.5em',
};

const ReviewDateStyle = {
  fontSize: '0.75rem',
  color: 'gray.700',
  fontWeight: '400',
};

const ReviewContentStyle = {
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '1.5em',
};
