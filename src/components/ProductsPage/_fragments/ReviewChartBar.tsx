import { Box, ChakraProps } from '@chakra-ui/react';

interface ReviewChartBarProps extends ChakraProps {
  count: number;
  countAll: number;
}

const ReviewChartBar = ({
  count,
  countAll,
  ...basisProps
}: ReviewChartBarProps) => {
  const height = 50 * (count / countAll);

  return (
    <>
      <Box
        w="10px"
        h="50px"
        borderTopRadius="5px"
        bg="#FFF8E7"
        position="relative"
      >
        <Box
          w="10px"
          h={height}
          borderTopRadius="5px"
          bg="#FF710B"
          position="absolute"
          bottom={0}
          zIndex={1}
        ></Box>
      </Box>
    </>
  );
};

export default ReviewChartBar;
