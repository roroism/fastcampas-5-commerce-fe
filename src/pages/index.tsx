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
      created: '2022.01.19',
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
      content: `와 피부에 바르자마자 다 흡수하고 찐득함 유분기가 1도 없이 얼굴을 쫙 잡아주는데 완전 놀랬어요! 
      건조함도 없고 진짜 유분기없는게 너무신기 이렇게 촉촉한데 이럴수가있나 싶었어요. 트러블이 많이나다보면 화장품 사용에 진짜 민감해지거든요ㅜㅜ 역시 여드름에센스 값하네요!`,
      created: '2022.02.01',
      reviewimageSet: [{ url: 'images/review/review3.png' }],
    },
    {
      tagId: 1,
      nickname: 'incourse.run1',
      rate: 5,
      content: `아이 엄마들에게 추천드려요! 한번바르고 바로 반함..♡ 3일 사용한 결과진짜 그 효능이 사실인것같아요! 오늘밤도 자기전에 바르고 누웠어요 진짜 성인여드름 뾰루지성 피부 강추해요! 정말 좋은 성분만 담은 에센스!!!`,
      created: '2022.03.21',
      reviewimageSet: [
        { url: 'images/review/review2.png' },
        { url: 'images/review/review1.png' },
      ],
    },
    {
      tagId: 2,
      nickname: 'incourse.run2',
      rate: 5,
      content: `피부에 잘 스며들면서 자기 전에 트러블 부위에 발라주면 다음날 열감있게 막 뭐가 돋아오르던 부위가 신기하게 잘 가라앉아 있어요! 각질도 자주 일어나는 피부인데요. 에센스로 잘 수분관리를 해주니 각질도 잘 안일어나죠!! 피부도 민감한데 트러블이 잘 안발생해서 신기해했더니 이게 피부 장벽이 강화되어 그런가봐요!!`,
      created: '2022.04.08',
      reviewimageSet: [
        { url: 'images/review/review3.png' },
        { url: 'images/review/review1.png' },
      ],
    },
    {
      tagId: 2,
      nickname: 'incourse.run2',
      rate: 5,
      content: `저는 개인적으로 피지오겔을 좋아하는 편인데 성분이 좋기도 하지만 팩을 해도 다음 날 아침에 남아있는 기분이 없는데 피지오겔을 쓰면 아침에 세수할 때까지도 맨질맨질한게 느껴지기 때문이다. 이 제품은 다음 날 아침까지 피부에 남아있어 만족스러웠습니다!`,
      created: '2022.05.05',
      reviewimageSet: [
        { url: 'images/review/review2.png' },
        { url: 'images/review/review1.png' },
      ],
    },
    {
      tagId: 2,
      nickname: 'incourse.run2',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2022.06.25',
      reviewimageSet: [
        { url: 'images/review/review2.png' },
        { url: 'images/review/review3.png' },
      ],
    },
    {
      tagId: 3,
      nickname: 'incourse.run3',
      rate: 5,
      content: `피부의 장벽이 허물어지면 유수분 밸런스가 깨지면서 제일 먼저 피부에 올라오는 것이 트러블인데요. 피부에 잘 스며들면서 자기 전에 트러블 부위에 발라주면 다음날 열감있게 막 뭐가 돋아오르던 부위가 신기하게 잘 가라앉아 있어요!!`,
      created: '2022.07.25',
      reviewimageSet: [
        { url: 'images/review/review2.png' },
        { url: 'images/review/review1.png' },
      ],
    },
    {
      tagId: 3,
      nickname: 'incourse.run3',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2022.08.03',
      reviewimageSet: [{ url: 'images/review/review3.png' }],
    },
    {
      tagId: 3,
      nickname: 'incourse.run3',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2022.08.19',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 4,
      nickname: 'incourse.run4',
      rate: 5,
      content: `매번 써오던 제품이에요. 일단 백탁 거의 없구요, 순해서 눈이 전혀 따갑지 않아요. 가장 큰 장점이죠. ^^ 친구, 엄마, 지인들께 참 많이도 선물했고 다들 좋다고 하셔서 기분 좋았습니다!!! 남편은 항상 여기제품만 쓰고 있어요~!`,
      created: '2022.09.10',
      reviewimageSet: [
        { url: 'images/review/review3.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 4,
      nickname: 'incourse.run4',
      rate: 4,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2022.09.27',
      reviewimageSet: [
        { url: 'images/review/review3.png' },
        { url: 'images/review/review2.png' },
        { url: 'images/review/review1.png' },
      ],
    },
    {
      tagId: 4,
      nickname: 'incourse.run4',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2022.10.01',
      reviewimageSet: [
        { url: 'images/review/review1.png' },
        { url: 'images/review/review2.png' },
      ],
    },
    {
      tagId: 5,
      nickname: 'incourse.run5',
      rate: 4,
      content: `신랑 낚시갈때 사용한다고 주문했어요~ 스틱으로 사용하다가 차안에 놔두니 녹아서 별로라고해서 이 제품으로 주문했네요 계속 사용 중인데 좋은 것 같아요!! 좋은 상품 쓰게해 주셔서 감사드립니다!!! 잘 사용할께요 재구매의사 있습니다!`,
      created: '2022.10.13',
      reviewimageSet: [
        { url: 'images/review/review2.png' },
        { url: 'images/review/review3.png' },
        { url: 'images/review/review1.png' },
      ],
    },
    {
      tagId: 5,
      nickname: 'incourse.run5',
      rate: 5,
      content: `순해서 아이피부에도 자극없이 사용할 수 있어요! 아이 뿐 만아니라 온 가족이 사용할 수 있는 화장품이라고 추천받았어요. 처음엔 반신반의하는 마음으로 사용하기 시작했는데 지금은 모든 단계에서 인코스런 제품을 사용하고있어요! 아토피로 고생했던 우리 아이 피부도 지금은 거의 완치단계입니다 . 아이 엄마들에게 추천드려요!`,
      created: '2022.10.20',
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
      created: '2022.10.26',
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
