import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

import { deleteToken } from '@utils/localStorage/token';

interface LogoutModalProps extends Omit<ModalProps, 'children'> {
  title: string;
}
function LogoutModal({ isOpen, onClose, ...props }: LogoutModalProps) {
  const router = useRouter();

  const handleLogoutClick = () => {
    deleteToken();
    router.push('/login');
  };

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
              로그아웃 하시겠습니까?
            </Box>
          </ModalBody>

          <ModalFooter p={0} display="flex" gap="10px" justifyContent="center">
            <Button
              onClick={onClose}
              fontWeight="700"
              py="17.8px"
              w="155px"
              h="auto"
              borderRadius="25px"
              backgroundColor="white"
              color="primary.500"
              border="1px solid"
            >
              취소
            </Button>
            <Button
              onClick={handleLogoutClick}
              fontWeight="700"
              py="17.8px"
              w="155px"
              h="auto"
              borderRadius="25px"
              backgroundColor="primary.500"
              color="white"
            >
              확인
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default LogoutModal;
