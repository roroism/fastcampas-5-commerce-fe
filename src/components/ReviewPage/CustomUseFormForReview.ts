import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { FormReviewDataType } from './types';

import useValidateWithByte from 'hooks/useValidateWithByte';

export const FormSchema = yup.object().shape({
  userId: yup.number().required(),
  productId: yup.number().required(),
  orderItemId: yup.number().required(),
  rate: yup.number().required(),
  content: yup.string().required(),
  // reviewimagePath: yup.array().of(yup.string()).notRequired(),
});

const customUseFormForReview = (options?: UseFormProps<FormReviewDataType>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useForm<FormReviewDataType>({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
    defaultValues: { rate: 5 },
    ...options,
  });
};

export default customUseFormForReview;
