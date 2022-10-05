import Head from 'next/head';

import MypagePage from '@components/MypagePage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Mypage() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Mypage</title>
      </Head>
      <HomeLayout content={<MypagePage />} />
    </>
  );
}

export default Mypage;
