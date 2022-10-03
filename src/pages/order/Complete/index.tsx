import Head from 'next/head';

import CompletePage from '@components/CompletePage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Complete() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Complete</title>
      </Head>
      <HomeLayout content={<CompletePage />} />
    </>
  );
}

export default Complete;
