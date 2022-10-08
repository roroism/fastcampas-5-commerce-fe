import Head from 'next/head';

import EditPage from '@components/EditPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Edit() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Edit</title>
      </Head>
      <HomeLayout content={<EditPage />} />
    </>
  );
}

export default Edit;
