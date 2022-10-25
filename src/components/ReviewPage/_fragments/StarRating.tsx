import React from 'react';

import { Button, HStack, Image } from '@chakra-ui/react';

interface StarRatingProps {
  starRating: number | undefined;
  width?: string;
  increaseStar?: string;
  decreaseStar?: string;
  // setNumberOfStar: React.Dispatch<React.SetStateAction<number | undefined>>;
  setValue: any;
}

function StarRating({
  starRating = 5,
  width = '10px',
  // setNumberOfStar,
  setValue,
}: StarRatingProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.dataset.order);
    // setNumberOfStar(Number(e.currentTarget.dataset.order));
    setValue('rate', Number(e.currentTarget.dataset.order));
  };
  // console.log('starRating ::', starRating);
  const rendering = () => {
    const result = [];
    for (let i = 0; i < starRating; i++) {
      result.push(
        <Button
          transition="all 1s"
          minW="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          variant="unstyled"
          onClick={handleClick}
          data-order={i + 1}
          key={i}
        >
          <Image
            src="/icons/svg/star_yellow.svg"
            w={width}
            alt={`star ${i}`}
            transition="all 1s"
          />
        </Button>,
      );
    }
    for (let i = starRating; i < 5; i++) {
      result.push(
        <Button
          transition="all 1s"
          minW="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          variant="unstyled"
          onClick={handleClick}
          data-order={i + 1}
          key={i}
        >
          <Image
            src="/icons/svg/star_gray.svg"
            w={width}
            alt={`star ${i}`}
            transition="all 1s"
          />
        </Button>,
      );
    }
    return result;
  };
  return (
    <HStack spacing="12px" justify="center">
      {rendering()}
    </HStack>
  );
}

export default StarRating;
