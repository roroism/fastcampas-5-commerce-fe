import Head from 'next/head';

import JoinSuccessPage from '@components/JoinSuccessPage/JoinSuccessPage';

function JoinSuccess() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | JoinSuccess</title>
      </Head>
      <JoinSuccessPage />
    </>
  );
}

export default JoinSuccess;
