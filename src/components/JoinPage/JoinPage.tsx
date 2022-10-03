import React from 'react';

import { ChakraProps } from '@chakra-ui/react';

import customUseForm from './CustomUseForm';
import JoinPageView from './JoinPage.view';

interface JoinPageProps extends ChakraProps {}

function JoinPage({ ...basisProps }: JoinPageProps) {
  const formData = customUseForm();
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(() => {
    console.log('submit success');
  });

  return <JoinPageView formData={formData} onSubmit={onSubmit} />;
}

export default JoinPage;
