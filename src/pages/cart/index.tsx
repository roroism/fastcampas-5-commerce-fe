import Head from 'next/head';

import CartPage from '@components/CartPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Cart() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Cart</title>
      </Head>
      <HomeLayout content={<CartPage />} />
    </>
  );
}

export default Cart;
