import {
  Box,
  ChakraProps,
  Flex,
  HStack,
  Image,
  VStack,
} from '@chakra-ui/react';

import {
  ReviewReplySetType,
  myReviewType,
} from '@apis/reactquery/QueryApi.type';

import StarRating from '@components/common/StarRating/StarRating';

export interface Ireview {
  content: string;
  created: string;
  id: number;
  nickname: string;
  rate: number;
  reviewimageSet: Array<{ reviewId: number; url: string }>;
  userId: number;
  reviewreplySet?: Array<ReviewReplySetType>;
  orderItemId?: number;
  productId?: number;
}

interface ReviewItemProps extends ChakraProps {
  review?: Ireview;
  // myReview?: myReviewType;
}

function ReviewItem({ review }: ReviewItemProps) {
  const year = review?.created.slice(0, 4);
  const month = review?.created.slice(5, 7);
  const date = review?.created.slice(8, 10);

  // const yearReply = review.reply?.createdAt.slice(0, 4);
  // const monthReply = review.reply?.createdAt.slice(5, 7);
  // const dateReply = review.reply?.createdAt.slice(8, 10);
  return (
    <>
      <VStack spacing={0} pt="23px" pb="25px" w="full">
        <Flex w="full" justify="space-between">
          <Box fontWeight="700" fontSize="0.75rem">
            {review?.nickname}
          </Box>
          <StarRating starRating={review?.rate} width="10px" />
        </Flex>
        <Box w="full" color="gray.600" fontWeight="400" fontSize="0.75rem">
          {year}.{month}.{date}
        </Box>
        <Box
          w="full"
          pt="17px"
          fontSize="1rem"
          fontWeight="400"
          lineHeight="1.5em"
        >
          {review?.content}
        </Box>
        <HStack
          spacing="10px"
          w="full"
          justify="flex-start"
          pt="9px"
          color="transparent"
        >
          {review?.reviewimageSet.map((photo, idx) => (
            <Image
              key={idx}
              borderRadius="5px"
              w="80px"
              h="80px"
              src={photo.url}
              alt={`리뷰이미지${idx}`}
            ></Image>
          ))}
        </HStack>
      </VStack>
      {review?.reviewreplySet &&
        review?.reviewreplySet?.length > 0 &&
        review?.reviewreplySet.map((reply) => (
          <>
            <Flex w="full" pt="6px" pb="30px">
              <Box pr="9px" pt="4px" w="29px">
                <Image src="/icons/svg/review/reply.svg" alt="admin icon" />
              </Box>
              <VStack spacing={0}>
                <Flex w="full" justify="space-between">
                  <Box fontWeight="700" fontSize="0.75rem">
                    {reply?.replyUserNickname}
                  </Box>
                </Flex>
                <Box
                  color="gray.600"
                  fontWeight="400"
                  fontSize="0.75rem"
                  w="full"
                >
                  {reply?.created.toString().split('T')[0].replace(/-/g, '.')}
                </Box>
                <Box
                  as="p"
                  fontSize="1rem"
                  fontWeight="400"
                  lineHeight="1.5em"
                  w="full"
                  pt="20px"
                >
                  {reply?.content}
                </Box>
              </VStack>
            </Flex>
          </>
        ))}
      <Box w="full" borderBottom="1px solid #F2F3F4"></Box>
    </>
  );
}

export default ReviewItem;
