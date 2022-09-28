import Head from 'next/head';

import LoginLayout from '@components/LoginPage/LoginLayout';
import LoginPage from '@components/LoginPage/LoginPage';

function Login() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>fastcampas-5-commerce-fe | login</title>
      </Head>
      <LoginLayout content={<LoginPage />} />
    </>
  );
}

export default Login;
