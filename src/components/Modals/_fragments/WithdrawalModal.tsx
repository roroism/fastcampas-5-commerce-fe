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

import { deleteToken } from '@utils/localStorage/token';

interface WithdrawalModalProps extends Omit<ModalProps, 'children'> {}
function WithdrawalModal({ isOpen, onClose, ...props }: WithdrawalModalProps) {
  const handleLogoutClick = () => {
    deleteToken();
    console.log('deleteToken');
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
              as="p"
              fontWeight="700"
              textAlign="center"
              alignItems="center"
              mt="31px"
            >
              탈퇴가 완료되었습니다.
            </Box>
          </ModalBody>

          <ModalFooter p={0} display="flex" gap="10px" justifyContent="center">
            <NextLink href="/login" passHref>
              <Link>
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
              </Link>
            </NextLink>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default WithdrawalModal;
