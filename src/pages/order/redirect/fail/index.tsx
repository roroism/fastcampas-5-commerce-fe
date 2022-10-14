import Head from 'next/head';

import PaymentFailPage from '@components/PaymentFailPage';

function PaymentFail() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | PaymentFail</title>
      </Head>
      <PaymentFailPage />
    </>
  );
}

export default PaymentFail;
