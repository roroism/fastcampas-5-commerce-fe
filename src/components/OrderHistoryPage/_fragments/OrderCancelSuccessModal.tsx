import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

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

import productApi from '@apis/reactquery/QueryApi';
import { ShippingStatus } from '@apis/reactquery/QueryApi.type';

import { IOrderItem } from '@components/OrderPage/_fragments/OrderItem';

interface OrderCancelSuccessModalProps extends Omit<ModalProps, 'children'> {
  title: string;
}
function OrderCancelSuccessModal({
  isOpen,
  onClose,
  ...props
}: OrderCancelSuccessModalProps) {
  // const router = useRouter();
  // const closeComplete = useCallback(() => {
  //   router.replace('/mypage/history');
  // }, []);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      // onCloseComplete={closeComplete}
      {...props}
    >
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
              주문취소가 완료되었습니다.
            </Box>
          </ModalBody>

          <ModalFooter p={0} display="flex" gap="10px" justifyContent="center">
            {/* <NextLink href="/cart" passHref>
              <Link>
                <Button
                  onClick={onClose}
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
                  취소
                </Button>
              </Link>
            </NextLink> */}
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
              확인
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default OrderCancelSuccessModal;
