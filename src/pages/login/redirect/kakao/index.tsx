import Head from 'next/head';

import KakaoPage from '@components/KakaoPage';

function Kakao() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Kakao</title>
      </Head>
      <KakaoPage />
    </>
  );
}

export default Kakao;
