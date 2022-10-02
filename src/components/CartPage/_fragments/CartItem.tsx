import { Box, Checkbox, Flex, Image, Input } from '@chakra-ui/react';

const CartItem = () => {
  return (
    <Box
      w="100%"
      as="li"
      position="relative"
      p={0}
      m={0}
      listStyleType="none"
      marginStart="0"
      px="16px"
      py="20px"
      my="10px"
    >
      <Flex w="100%" gap="10px">
        <Box>
          <Checkbox
            colorScheme="primary"
            w="20px"
            h="20px"
            // onChange={onChange}
            // isChecked={item?.checked}

            // onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
            // checked={checkItems.includes(data.id) ? true : false} />
          ></Checkbox>
        </Box>
        <Flex flexDirection="column" justifyContent="flex-start" flexGrow={1}>
          <Flex>
            <Box w="90px" h="90px" backgroundColor="#f9f9f9" mr="10px">
              <Image w="100%"></Image>
            </Box>
            <Flex
              flexDirection="column"
              overflow="hidden"
              py="3px"
              justifyContent="space-between"
            >
              <Box as="strong" fontWeight="700">
                바스 & 삼푸
              </Box>
              <Box
                as="p"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                color="gray.600"
              >
                바스 & 삼푸 | 120ml
              </Box>
              <Box as="span" fontWeight="700" color="primary.500">
                27,000원
              </Box>
            </Flex>
            <Box>
              <Box
                position="absolute"
                top="25px"
                right="40px"
                _before={{
                  position: 'absolute',
                  left: '15px',
                  content: '""',
                  height: '15px',
                  width: '1.5px',
                  backgroundColor: '#1A1A1A',
                  transform: 'rotate(45deg)',
                  borderRadius: '5px',
                }}
                _after={{
                  position: 'absolute',
                  left: '15px',
                  content: '""',
                  height: '15px',
                  width: '1.5px',
                  backgroundColor: '#1A1A1A',
                  transform: 'rotate(-45deg)',
                  borderRadius: '5px',
                }}
                // onClick={deleteCart}
                _hover={{ cursor: 'pointer' }}
              ></Box>
            </Box>
          </Flex>

          <Flex
            flexDirection="column"
            mt="15px"
            p="10px"
            w="full"
            bg="gray.200"
            borderRadius="5px"
            gap="4px"
          >
            <Box>
              <Box color="gray.600">바스 & 삼푸</Box>
            </Box>
            <Flex justifyContent="space-between">
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
                  // onClick={decQuantity}
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
                    // value={quantity}
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
                  // onClick={incQuantity}
                  _hover={{ cursor: 'pointer' }}
                ></Box>
              </Flex>
              <Flex alignSelf="center" as="strong" color="gray.600">
                542,000원
              </Flex>
            </Flex>
          </Flex>
          <Flex mt="15px" justifyContent="space-between">
            <Flex alignItems="center">배송비 무료</Flex>
            <Box as="strong" fontSize="1.25rem">
              54,000원
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartItem;
