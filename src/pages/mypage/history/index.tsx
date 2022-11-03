import Head from 'next/head';

// import OrderHistory2Page from '@components/OrderHistory2Page';
import OrderHistoryPage from '@components/OrderHistoryPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function OrderHistory() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | OrderHistory</title>
      </Head>
      <HomeLayout content={<OrderHistoryPage />} />
      {/* <HomeLayout content={<OrderHistory2Page />} /> */}
    </>
  );
}

export default OrderHistory;
