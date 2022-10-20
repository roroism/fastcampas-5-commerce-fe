import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { FormOrderDataType } from './types';

// import { FormDataType } from './types';
import useValidateWithByte from 'hooks/useValidateWithByte';

export const FormSchema = yup.object().shape({
  userId: yup.string().required(),
  price: yup.string().required(),
  userName: yup
    .string()
    .required('이름은 필수입니다.')
    .min(2, '최소 2자 이상 입력해주세요.'),
  userPhone: yup
    .string()
    .required('휴대폰 번호는 필수입니다.')
    .test('phoneNumber', '정확한 휴대폰 번호를 입력해주세요.', (value = '') => {
      console.log(/^01([0|1|6|7|8|9])[-]\d{3,4}[-]\d{4}$/.test(value));
      return /^01([0|1|6|7|8|9])[-]\d{3,4}[-]\d{4}$/.test(value);
    }),
  userAddr: yup.string().required('배송주소는 필수입니다.'),
  userAddrDetail: yup.string().required('배송주소는 필수입니다.'),
  userAddrPost: yup.string().required(),
  shipName: yup
    .string()
    .required('이름은 필수입니다.')
    .min(2, '최소 2자 이상 입력해주세요.'),
  shipPhone: yup
    .string()
    .required('휴대폰 번호는 필수입니다.')
    .test('phoneNumber', '정확한 휴대폰 번호를 입력해주세요.', (value = '') => {
      console.log(/^01([0|1|6|7|8|9])[-]\d{3,4}[-]\d{4}$/.test(value));
      return /^01([0|1|6|7|8|9])[-]\d{3,4}[-]\d{4}$/.test(value);
    }),
  shipAddr: yup.string().required('배송주소는 필수입니다.'),
  shipAddrDetail: yup.string().required('배송주소는 필수입니다.'),
  shipAddrPost: yup.string().required(),
  orderMessage: yup.string().required(),
  method: yup.string().required(),
});

const customUseFormForOrder = (options?: UseFormProps<FormOrderDataType>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useForm<FormOrderDataType>({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
    defaultValues: { orderMessage: '안전한 배송 감사합니다' },
    ...options,
  });
};

export default customUseFormForOrder;
