import NextLink from 'next/link';
import React, { useCallback, useState } from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Link,
  ListItem,
  UnorderedList,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { useGetProductByIdQuery } from '@apis/reactquery/QueryApi.query';

import OrderDrawer from './OrderDrawer';

import priceFormat from 'hooks/priceFormat';

interface ProductItemProps extends ChakraProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    capacity: number;
    thumbnail: string;
    tag: Array<{ id: number; name: string }>;
    avgRate: number | null;
    reviewCount: number;
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetProductByIdQuery({
    variables: String(product?.id),
  });

  return (
    <>
      <Box
        as="li"
        w="100%"
        borderRadius="20px"
        boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
        pb="30px"
      >
        <Box borderTopRadius="20px" w="100%" overflow="hidden">
          <NextLink href={`products/${product?.id}`} passHref>
            <Link>
              <Image
                w="100%"
                // src="./images/product/sampleImg.png"
                src={product?.thumbnail}
                alt={product?.name}
              />
            </Link>
          </NextLink>
        </Box>
        <Flex flexDirection="column" ml="30px" pt="30px" pb="20px">
          <Flex>
            <Box as="h4" fontWeight="700" fontSize="1rem">
              {product?.name}
            </Box>
            <Box as="span" paddingLeft="5px" fontSize="1rem" color="gray.700">
              {product?.capacity}ml
            </Box>
          </Flex>

          <Box mt="10px" fontSize="1.25rem">
            <Box
              as="span"
              display="inline-block"
              color="primary.500"
              fontWeight="700"
            >
              {priceFormat(product?.price)}
            </Box>
            원
          </Box>
          <Flex>
            <Flex alignItems="center">
              <Image
                src="./icons/svg/product/star.svg"
                w="10px"
                h="10px"
                alt="star"
                mr="8px"
              />
            </Flex>
            <Box as="span" fontWeight="700">
              {product?.avgRate?.toFixed(1) || '0'}
            </Box>
            <Box as="span" color="gray.700">
              &nbsp;&#40;리뷰&nbsp;{product?.reviewCount}개&#41;
            </Box>
          </Flex>

          <UnorderedList
            display="flex"
            styleType="none"
            p={0}
            m={0}
            mt="25px"
            color="gray.700"
            gap="5px"
          >
            {product?.tag.map((tag, idx) => (
              <ListItem key={idx}># {tag.name}</ListItem>
            ))}
          </UnorderedList>
        </Flex>

        <Flex gap="10px" justifyContent="space-between" mx="17px">
          <Button
            variant="outline"
            colorScheme="primary"
            w="150px"
            h="50px"
            borderRadius="25px"
            size="sd"
            py="12px"
            onClick={onOpen}
          >
            장바구니
          </Button>
          <Button
            colorScheme="primary"
            w="150px"
            h="50px"
            borderRadius="25px"
            size="sd"
            py="12px"
            onClick={onOpen}
          >
            바로구매
          </Button>
        </Flex>
      </Box>

      <OrderDrawer onClose={onClose} isOpen={isOpen} data={data} />
    </>
  );
};

export default ProductItem;
