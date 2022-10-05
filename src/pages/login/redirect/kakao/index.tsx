import Head from 'next/head';

import KakaoPage from '@components/KakaoPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Kakao() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Kakao</title>
      </Head>
      <HomeLayout content={<KakaoPage />} />
    </>
  );
}

export default Kakao;
