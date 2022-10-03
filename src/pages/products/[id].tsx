import Head from 'next/head';

import DetailProductPage from '@components/ProductsPage/DetailProductPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function DetailProduct() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | detail</title>
      </Head>
      <HomeLayout content={<DetailProductPage />} />
    </>
  );
}

export default DetailProduct;
