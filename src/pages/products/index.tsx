import Head from 'next/head';

import ProductsPage from '@components/ProductsPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

function Products() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | Products</title>
      </Head>
      <HomeLayout content={<ProductsPage />} />
    </>
  );
}

export default Products;
