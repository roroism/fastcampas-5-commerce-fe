import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { FormWithdrawalDataType } from './types';

import useValidateWithByte from 'hooks/useValidateWithByte';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

export const FormSchema = yup.object().shape({
  id: yup.string().required(),
  reason: yup.string().required('사유를 선택해주세요.').nullable(),
  reasonOthers: yup.string().when('reason', (val, schema) => {
    console.log('when', val);
    if (val === '기타') return yup.string().required('사유를 입력해주세요.');
    else return yup.string().notRequired();
  }),
  confirmation: yup
    .string()
    .required('글자를 입력해주세요.')
    .test(
      'withdrawalConfirmation',
      '글자를 정확히 입력해주세요.',
      (value) => value === '인코스런',
    ),
});

const customWithdrawalUseForm = (
  options?: UseFormProps<FormWithdrawalDataType>,
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useForm<FormWithdrawalDataType>({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default customWithdrawalUseForm;
