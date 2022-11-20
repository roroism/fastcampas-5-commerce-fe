import Head from 'next/head';
import { GetStaticProps } from 'next/types';

import axios from 'axios';

import instance from '@apis/_axios/instance';
import productApi from '@apis/reactquery/QueryApi';
import { ProductDetailDTOType } from '@apis/reactquery/QueryApi.type';

import DetailProductPage from '@components/ProductsPage/DetailProductPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

interface DetailProductProps {
  res: ProductDetailDTOType;
}

function DetailProduct({ res }: DetailProductProps) {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | detail</title>
      </Head>
      <HomeLayout content={<DetailProductPage res={res} />} />
    </>
  );
}

export default DetailProduct;

export type Params = {
  params?: {
    id?: string;
  };
};

export const getStaticPaths = async () => {
  let paths: Array<{ params: { id: string } }> = [];

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/product/?page_size=50`,
  );

  paths = res?.data?.results?.map((item: any) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  if (!params?.id)
    return {
      props: {},
    };

  const res = await productApi.getProductById(params?.id);

  return {
    props: {
      res,
    },
  };
};
