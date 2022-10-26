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

interface EditSuccessModalProps extends Omit<ModalProps, 'children'> {
  title: string;
}
function EditSuccessModal({
  isOpen,
  onClose,
  ...props
}: EditSuccessModalProps) {
  // const router = useRouter();
  // const closeComplete = useCallback(() => {
  //   router.replace('/mypage/history');
  // }, [router]);

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
              회원정보 수정이 완료되었습니다.
            </Box>
          </ModalBody>

          <ModalFooter p={0} display="flex" gap="10px" justifyContent="center">
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

export default EditSuccessModal;
