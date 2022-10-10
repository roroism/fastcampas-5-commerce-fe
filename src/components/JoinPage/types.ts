export type FormDataType = {
  profile?: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  gender?: 'male' | 'female';
  age?: string;
  agreeAll: boolean;
  agreeRequired: boolean;
  agreePrivateInfo: boolean;
  agreeMarketing: boolean;
};
