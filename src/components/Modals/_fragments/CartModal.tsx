import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Flex,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

interface CartModalProps extends Omit<ModalProps, 'children'> {
  title: string;
}
function CartModal({ isOpen, onClose, ...props }: CartModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered {...props}>
      <ModalOverlay />
      <ModalContent borderRadius="5px" mx="16px" h="300px" pb="33px">
        <ModalCloseButton />
        <Flex
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          h="100%"
        >
          <ModalBody
            display="flex"
            flexGrow="1"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              fontWeight="700"
              textAlign="center"
              alignItems="center"
              mt="31px"
            >
              장바구니에 상품이 담겼습니다.
            </Box>
          </ModalBody>

          <ModalFooter p={0} display="flex" gap="10px" justifyContent="center">
            <NextLink href="/cart" passHref>
              <Link>
                <Button
                  fontWeight="700"
                  py="17.8px"
                  w="155px"
                  h="auto"
                  borderRadius="25px"
                  colorScheme="primary"
                  variant="outline"
                  border="1px solid"
                  fontSize="1rem"
                >
                  장바구니 이동
                </Button>
              </Link>
            </NextLink>
            <Button
              onClick={onClose}
              variant="solid"
              fontWeight="700"
              py="17.8px"
              w="155px"
              h="auto"
              borderRadius="25px"
              colorScheme="primary"
              fontSize="1rem"
            >
              쇼핑 계속하기
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default CartModal;
