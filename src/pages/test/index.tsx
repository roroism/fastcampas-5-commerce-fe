import Head from 'next/head';

import TestPage from '@components/TestPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Test() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | test</title>
      </Head>
      <HomeLayout content={<TestPage />} />
    </>
  );
}

export default Test;
