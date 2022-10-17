import Head from 'next/head';

import PaymentSuccessPage from '@components/PaymentSuccessPage';

function PaymentSuccess() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | PaymentSuccess</title>
      </Head>
      <PaymentSuccessPage />
    </>
  );
}

export default PaymentSuccess;
