import Head from 'next/head';

import OrderHistoryPage from '@components/OrderHistoryPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function HistoryPage() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | OrderHistory</title>
      </Head>
      <HomeLayout content={<OrderHistoryPage />} />
    </>
  );
}

export default HistoryPage;
