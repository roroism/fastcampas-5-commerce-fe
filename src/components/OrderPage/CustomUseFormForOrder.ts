import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { FormOrderDataType } from './types';

// import { FormDataType } from './types';
import useValidateWithByte from 'hooks/useValidateWithByte';

export const FormSchema = yup.object().shape({
  shippingName: yup
    .string()
    .required('이름은 필수입니다.')
    .min(2, '최소 2자 이상 입력해주세요.'),
  // nickname: yup
  //   .string()
  //   .required('닉네임은 필수입니다.')
  //   .test(
  //     'validateWithByte',
  //     '한글 1~5자, 영문 및 숫자 2~10자 사이로 입력해주세요.',
  //     (value) => useValidateWithByte(value as string),
  //   ),
  shippingPhone: yup
    .string()
    .required('휴대폰 번호는 필수입니다.')
    .test('phoneNumber', '정확한 휴대폰 번호를 입력해주세요.', (value = '') => {
      console.log(/^01([0|1|6|7|8|9])[-]\d{3,4}[-]\d{4}$/.test(value));
      return /^01([0|1|6|7|8|9])[-]\d{3,4}[-]\d{4}$/.test(value);
    }),
  shippingAddress: yup
    .string()
    .required('배송주소는 필수입니다.')
    .email('이메일 주소를 정확하게 입력해주세요.'),
  shippingAddressDetail: yup.string().required('배송주소는 필수입니다.'),
  shippingRequest: yup.string(),
});

const customUseFormForOrder = (options?: UseFormProps<FormOrderDataType>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useForm<FormOrderDataType>({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
    ...options,
  });
};

export default customUseFormForOrder;
