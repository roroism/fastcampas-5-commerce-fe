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
  useDisclosure,
} from '@chakra-ui/react';

import productApi from '@apis/reactquery/QueryApi';
import {
  ORDER_BY_ORDERID_API_QUERY_KEY,
  ORDER_STATUS_API_QUERY_KEY,
} from '@apis/reactquery/QueryApi.query';
import {
  GetOrderStatusDTOType,
  ShippingStatus,
} from '@apis/reactquery/QueryApi.type';

import { IOrderItem } from '@components/OrderPage/_fragments/OrderItem';

import { useQueryClient } from '@tanstack/react-query';

import OrderCancelSuccessModal from './OrderCancelSuccessModal';

interface OrderCancelModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  product: IOrderItem;
}
function OrderCancelModal({
  isOpen,
  onClose,
  product,
  ...props
}: OrderCancelModalProps) {
  const {
    query: { page = 1 },
  } = useRouter();
  const queryClient = useQueryClient();
  const {
    isOpen: orderCancelSuccessIsOpen,
    onOpen: orderCancelSuccessOnOpen,
    onClose: orderCancelSuccessOnClose,
  } = useDisclosure();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('product.orderId : ', product.orderId);
    // if (product.orderId) {
    //   productApi
    //     .patchOrder({
    //       orderId: product.orderId,
    //       data: { shippingStatus: ShippingStatus.CANCELED },
    //     })
    //     .then((res) => {
    //       console.log('patchOrder res : ', res);
    //       onClose();
    //       orderCancelSuccessOnOpen();
    //     });
    // }

    if (product.orderId) {
      productApi
        .patchOrderStatus({
          id: product.orderId,
          data: { shippingStatus: ShippingStatus.CANCELED },
        })
        .then((res) => {
          console.log('patchOrderStatus res : ', res);
          queryClient.setQueryData(
            ORDER_BY_ORDERID_API_QUERY_KEY.GET(res.id),
            res,
          );

          onClose();
          orderCancelSuccessOnOpen();
        });
    }

    // if (product.id) {
    // productApi
    //     .patchOrderStatus({
    //       id: product.id.toString(),
    //       data: { shippingStatus: ShippingStatus.CANCELED },
    //     })
    //     .then((res) => {
    //       console.log('res : ', res);
    //       queryClient.setQueryData(
    //         ORDER_STATUS_API_QUERY_KEY.GET(page),
    //         (prevData: GetOrderStatusDTOType | undefined) => {
    //           if (!prevData) return prevData;

    //           console.log('prevData : ', prevData);
    //           const targetIndex = prevData.results.findIndex(
    //             (item) => item.id === res.id,
    //           );
    //           const oldResult = prevData.results[targetIndex];
    //           const newResult = {
    //             ...oldResult,
    //             shippingStatus: res.shippingStatus,
    //           };
    //           const newResults = [
    //             ...prevData.results.slice(0, targetIndex),
    //             newResult,
    //             ...prevData.results.slice(targetIndex + 1),
    //           ];
    //           console.log('newResults : ', newResults);
    //           console.log('{ ...prevData, results: newResults } : ', {
    //             ...prevData,
    //             results: newResults,
    //           });
    //           return { ...prevData, results: newResults };
    //         },
    //       );

    //       onClose();
    //       orderCancelSuccessOnOpen();
    //     });
    // }
  };
  // const closeComplete = useCallback(() => {
  //   // router.replace('/mypage/history');
  // }, []);
  return (
    <>
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
                as="p"
                fontWeight="700"
                textAlign="center"
                alignItems="center"
                mt="31px"
                lineHeight="1.5em"
              >
                ???????????? ???????????????????
                {/* &#40;* ?????? ????????? ?????? ???????????? ???????????????. &#41; */}
              </Box>
            </ModalBody>

            <ModalFooter
              p={0}
              display="flex"
              gap="10px"
              justifyContent="center"
            >
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
                ??????
              </Button>
              <Button
                onClick={handleClick}
                variant="solid"
                fontWeight="700"
                py="17.8px"
                w="155px"
                h="auto"
                borderRadius="25px"
                colorScheme="primary"
                fontSize="1rem"
              >
                ??????
              </Button>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>

      <OrderCancelSuccessModal
        title="order cancel modal"
        isOpen={orderCancelSuccessIsOpen}
        onClose={orderCancelSuccessOnClose}
      />
    </>
  );
}

export default OrderCancelModal;
