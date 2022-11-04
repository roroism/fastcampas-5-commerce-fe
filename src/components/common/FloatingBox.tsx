import { Box } from '@chakra-ui/react';

interface FloatingBoxProps {
  position: 'top' | 'bottom';
  children: JSX.Element;
}
const FloatingBox = ({ position, children }: FloatingBoxProps) => {
  return (
    <Box
      position="absolute"
      bottom={position === 'bottom' ? '30px' : 'none'}
      top={position === 'top' ? '15px' : 'none'}
      right="55px"
      zIndex="1000"
    >
      {children}
    </Box>
  );
};

export default FloatingBox;
