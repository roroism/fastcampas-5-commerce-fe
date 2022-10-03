import { HStack, Image } from '@chakra-ui/react';

interface StarRatingProps {
  starRating: number;
  width?: string;
}

function StarRating({ starRating, width = '10px' }: StarRatingProps) {
  const rendering = () => {
    const result = [];
    for (let i = 0; i < starRating; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/star_yellow.svg"
          w={width}
          alt={`star ${i}`}
          _hover={{ cursor: 'pointer' }}
        />,
      );
    }
    for (let i = starRating; i < 5; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/star_gray.svg"
          w={width}
          alt={`star ${i}`}
          _hover={{ cursor: 'pointer' }}
        />,
      );
    }
    return result;
  };
  return (
    <HStack spacing="6px" justify="center">
      {rendering()}
    </HStack>
  );
}

export default StarRating;
