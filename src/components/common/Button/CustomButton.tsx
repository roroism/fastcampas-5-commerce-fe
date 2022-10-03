import { Button, ButtonProps, ColorProps } from '@chakra-ui/react';

interface PrimaryButtonProps extends ButtonProps {
  children: string | JSX.Element;
}

const PrimaryButton = ({
  children,
  colorScheme,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button {...ButtonStyle} colorScheme={colorScheme} {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;

const ButtonStyle = {
  w: 'full',
  h: '50px',
  borderRadius: '25px',
  size: 'sd',
  py: '12px',
};
