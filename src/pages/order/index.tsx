import Head from 'next/head';

import OrderPage from '@components/OrderPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Order() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Order</title>
      </Head>
      <HomeLayout content={<OrderPage />} />
    </>
  );
}

export default Order;
