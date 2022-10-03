import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  HelpTextProps,
} from '@chakra-ui/form-control';

interface FormHelperProps extends FormControlProps {
  helperText?: string | JSX.Element;
  errorText?: string | JSX.Element;
  successText?: string | JSX.Element;
  label?: string;
  children: JSX.Element | JSX.Element[];

  labelProps?: FormLabelProps;
  successTextProps?: HelpTextProps;
  helperTextProps?: HelpTextProps;
  errorTextProps?: FormErrorMessageProps;
}

export default function JoinInput({
  //
  helperText,
  errorText,
  successText,
  children,
  label,

  labelProps,
  successTextProps,
  helperTextProps,
  errorTextProps,

  ...basisProps
}: FormHelperProps) {
  const isShowErrorText = !!errorText;
  const isShowSuccessText = !!successText && !isShowErrorText;
  const isShowHelper = !!helperText && !isShowErrorText && !isShowErrorText;

  return (
    <FormControl isInvalid={!!errorText} {...basisProps}>
      <FormLabel {...LabelStyle} {...labelProps}>
        {label}
      </FormLabel>
      {children}
      {isShowErrorText && (
        <FormErrorMessage {...errorTextProps}>{errorText}</FormErrorMessage>
      )}
      {isShowSuccessText && (
        <FormHelperText color="custom.primary" {...successTextProps}>
          {successText}
        </FormHelperText>
      )}
      {isShowHelper && (
        <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

const LabelStyle = {
  fontSize: '12px',
  color: 'primary.500',
  fontWeight: 700,
  lineheight: '18px',
  pb: '10px',
};
