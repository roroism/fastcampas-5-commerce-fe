import Head from 'next/head';

import MyReviewPage from '@components/MyReviewPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function MyReview() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | MyReview</title>
      </Head>
      <HomeLayout content={<MyReviewPage />} />
    </>
  );
}

export default MyReview;
