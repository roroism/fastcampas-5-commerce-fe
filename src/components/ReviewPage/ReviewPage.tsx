import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { result } from 'lodash';

import { ChakraProps, useDisclosure } from '@chakra-ui/react';

import s3FileUploaderApi from '@apis/S3FileUploader/S3FileUploaderApi';
import productApi from '@apis/reactquery/QueryApi';
import {
  useGetMyInfoQuery,
  useGetOrderByOrderIdQuery,
  useGetProductByIdQuery,
} from '@apis/reactquery/QueryApi.query';
import { ReviewParamPostType } from '@apis/reactquery/QueryApi.type';

import { useQueryClient } from '@tanstack/react-query';

import customUseFormForReview from './CustomUseFormForReview';
import ReviewPageView from './ReviewPage.view';
import ReviewWriteSuccessModal from './_fragments/ReviewWriteSuccessModal';

interface ReviewPageProps extends ChakraProps {}

function ReviewPage({ ...basisProps }: ReviewPageProps) {
  const { query } = useRouter();
  const [reviewImgList, setReviewImgList] = useState<File[]>([]);
  const queryClient = useQueryClient();
  const formData = customUseFormForReview();
  const { handleSubmit } = formData;
  const { data: userData } = useGetMyInfoQuery({
    options: {
      onSuccess: (data) => {
        if (data?.id) formData.setValue('userId', data?.id);
      },
    },
  });
  const { data: productInfo } = useGetProductByIdQuery({
    variables: query.productid as string,
    options: {
      enabled: !!query.productid,
    },
  });
  const {
    isOpen: reviewWriteSuccessIsOpen,
    onOpen: reviewWriteSuccessOnOpen,
    onClose: reviewWriteSuccessOnClose,
  } = useDisclosure();

  useEffect(() => {
    if (query?.orderitemid)
      formData.setValue('orderItemId', Number(query?.orderitemid));
    if (query?.productid)
      formData.setValue('productId', Number(query?.productid));
  }, [query.orderitemid]);

  const onSubmit = handleSubmit((data) => {
    console.log('submit success ::: ', data);

    if (reviewImgList.length > 0) {
      s3FileUploaderApi
        .uploadFilesToS3({
          files: reviewImgList,
        })
        .then((res) => {
          //res.fulfilled.value.url
          console.log('res : ', res);
          console.log(
            'imagePath : ',
            res.fulfilled.map((item) =>
              item.value.url.split('?')[0].split('/').at(-1),
            ),
          );

          const reviewReq: ReviewParamPostType = {
            userId: data.userId,
            productId: data.productId,
            orderItemId: data.orderItemId,
            rate: data.rate,
            content: data.content,
            reviewimagePath: res.fulfilled
              .map(
                (item) =>
                  `media/${item.value.url.split('?')[0].split('/').at(-1)}`,
              )
              .filter((item) => item !== undefined),
          };

          productApi.postReview(reviewReq).then((res) => {
            reviewWriteSuccessOnOpen();
          });
        });
    } else {
      const reviewReq: ReviewParamPostType = {
        userId: data.userId,
        productId: data.productId,
        orderItemId: data.orderItemId,
        rate: data.rate,
        content: data.content,
      };

      productApi.postReview(reviewReq).then((res) => {
        reviewWriteSuccessOnOpen();
      });
    }
  });

  return (
    <>
      <ReviewPageView
        formData={formData}
        onSubmit={onSubmit}
        productInfo={productInfo}
        orderItemId={query.orderItemId as string}
        count={Number(query.count)}
        created={query.created as string}
        reviewImgList={reviewImgList}
        setReviewImgList={setReviewImgList}
      />
      <ReviewWriteSuccessModal
        title="review write success modal"
        isOpen={reviewWriteSuccessIsOpen}
        onClose={reviewWriteSuccessOnClose}
      />
    </>
  );
}

export default ReviewPage;
