import Link from 'next/link';
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
  ListItem,
  UnorderedList,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

interface ProductItemProps extends ChakraProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    capacity: number;
    thumbnail: string;
    tags: Array<{ id: number; name: string }>;
    avgRate: string | null;
    reviewCount: number;
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState<number>(1);

  const decQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }, [quantity]);

  const incQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

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
          <Link href={`products/${product?.id}`}>
            <Image
              w="100%"
              // src="./images/product/sampleImg.png"
              src={product?.thumbnail}
              // backgroundColor="yellow"
            />
          </Link>
        </Box>
        <Flex flexDirection="column" ml="30px" pt="30px" pb="20px">
          <Flex>
            <Box as="strong" fontSize="1rem">
              {product?.name}
            </Box>
            <Box
              as="span"
              style={{
                paddingLeft: '5px',
                fontSize: '1rem',
                color: 'gray.700',
              }}
            >
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
              {product?.price}
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
              4.3
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
            {product?.tags.map((tag, idx) => (
              <ListItem key={idx}># {tag.name}</ListItem>
            ))}
          </UnorderedList>
        </Flex>
        <Flex gap="10px" justifyContent="space-between" mx="17px">
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
        </Flex>
      </Box>

      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent bg="transparent">
          <DrawerBody px="16px" py="20px" bg="white" borderTopRadius="20px">
            <Box>
              <VStack
                alignItems="flex-start"
                p="10px"
                w="full"
                bg="gray.200"
                borderRadius="5px"
              >
                <Box>{product?.name}</Box>
                <Flex justify="space-between" w="full" mt="4px">
                  <Flex h="25px" alignSelf="center">
                    <Box
                      position="relative"
                      bg="white"
                      border="1px solid #EAECF0"
                      borderRadius="5px 0px 0px 5px"
                      p={0}
                      w="25px"
                      h="25px"
                      _after={{
                        content: '""',
                        display: 'block',
                        height: '1px',
                        width: '9px',
                        backgroundColor: '#4A4D55',
                        position: 'absolute',
                        top: '11px',
                        left: '7px',
                      }}
                      _hover={{ cursor: 'pointer' }}
                      onClick={decQuantity}
                    ></Box>
                    <Flex
                      w="23px"
                      h="full"
                      borderTop="1px solid #EAECF0"
                      borderBottom="1px solid #EAECF0"
                    >
                      <Input
                        w="full"
                        h="full"
                        border="none"
                        fontSize="12px"
                        textAlign="center"
                        color="gray.800"
                        p={0}
                        bg="white"
                        value={quantity}
                        readOnly
                      ></Input>
                    </Flex>
                    <Box
                      position="relative"
                      bg="white"
                      border="1px solid #EAECF0"
                      borderRadius="0px 5px 5px 0px"
                      w="25px"
                      h="25px"
                      p={0}
                      _before={{
                        content: '""',
                        display: 'block',
                        width: '1px',
                        height: '9px',
                        backgroundColor: '#4A4D55',
                        position: 'absolute',
                        top: '7px',
                        left: '11px',
                      }}
                      _after={{
                        content: '""',
                        display: 'block',
                        height: '1px',
                        width: '9px',
                        backgroundColor: '#4A4D55',
                        position: 'absolute',
                        top: '11px',
                        left: '7px',
                      }}
                      onClick={incQuantity}
                      _hover={{ cursor: 'pointer' }}
                    ></Box>
                  </Flex>
                  <Flex fontWeight="700" color="gray.600" alignItems="center">
                    {/* {priceToString(product?.price)}원
                     */}
                    {product?.price}원
                  </Flex>
                </Flex>
              </VStack>
              <Flex justify="space-between" w="full" pt="15px">
                <Box>
                  총 수량
                  <span style={{ color: '#FF710B' }}> {quantity}</span> 개
                </Box>
                <Box>
                  합계
                  <span style={{ fontWeight: '700' }}>
                    {/* {priceToString(quantity * product.price)} */}
                    20000
                  </span>
                  원
                </Box>
              </Flex>
              <Flex justify="space-between" w="100%" pt="15px" pb="10px">
                <Button
                  colorScheme="primary"
                  w="calc(50% - 6.5px)"
                  h="50px"
                  borderRadius="25px"
                  size="sd"
                  py="12px"
                  // onClick={SendQuery}
                >
                  바로구매
                </Button>
                <Button
                  variant="outline"
                  colorScheme="primary"
                  w="calc(50% - 6.5px)"
                  h="50px"
                  borderRadius="25px"
                  size="sd"
                  py="12px"
                  // onClick={postCart}
                >
                  장바구니
                </Button>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProductItem;
