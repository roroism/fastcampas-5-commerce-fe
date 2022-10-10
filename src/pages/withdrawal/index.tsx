import Head from 'next/head';

import WithdrawalPageView from '@components/Withdrawal';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Withdrawal() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | withdrawal</title>
      </Head>
      <HomeLayout content={<WithdrawalPageView />} />
    </>
  );
}

export default Withdrawal;
