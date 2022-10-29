// import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import React from 'react';

import MainPage from '@components/MainPage';
import { IMainReview } from '@components/MainPage/MainPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

// import { ROUTES } from '@constants/routes';

interface HomeProps {
  mainReviews: Array<IMainReview>;
}

function Home({ mainReviews }: HomeProps) {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | home</title>
      </Head>
      <HomeLayout content={<MainPage mainReviews={mainReviews} />} />
    </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const mainReviews = [
    {
      tagId: 1,
      nickname: 'incourse.run1',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
        { url: 'images/review/review3.png' },
      ],
    },
    {
      tagId: 1,
      nickname: 'incourse.run1',
      rate: 4,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [{ url: 'images/review/review1.png' }],
    },
    {
      tagId: 1,
      nickname: 'incourse.run1',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 2,
      nickname: 'incourse.run2',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 2,
      nickname: 'incourse.run2',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 2,
      nickname: 'incourse.run2',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 3,
      nickname: 'incourse.run3',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 3,
      nickname: 'incourse.run3',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 3,
      nickname: 'incourse.run3',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 4,
      nickname: 'incourse.run4',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 4,
      nickname: 'incourse.run4',
      rate: 4,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 4,
      nickname: 'incourse.run4',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 5,
      nickname: 'incourse.run5',
      rate: 4,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 5,
      nickname: 'incourse.run5',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 5,
      nickname: 'incourse.run5',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2021.03.29',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
  ];

  return {
    props: {
      mainReviews,
    },
  };
};
