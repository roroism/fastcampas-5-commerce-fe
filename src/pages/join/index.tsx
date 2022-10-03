import Head from 'next/head';

import JoinLayout from '@components/JoinPage/JoinLayout';
import JoinPage from '@components/JoinPage/JoinPage';

function Join() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Join</title>
      </Head>
      <JoinLayout content={<JoinPage />} />
    </>
  );
}

export default Join;
