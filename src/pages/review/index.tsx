import Head from 'next/head';

import ReviewPage from '@components/ReviewPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Review() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Review</title>
      </Head>
      <HomeLayout content={<ReviewPage />} />
    </>
  );
}

export default Review;
