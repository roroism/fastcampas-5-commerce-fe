import {
  Box,
  Container,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

const Footer = () => {
  return (
    <Container
      bg="gray.800"
      as="footer"
      w={{ base: '375px' }}
      h={LAYOUT.FOOTER.HEIGHT}
    >
      <Box h="280px" color="white" w="100%" pt="35px" boxSizing="border-box">
        <Flex
          gap="40px"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Flex
            gap="30px"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Box as="strong">INCOURSE.RUN</Box>
            <UnorderedList
              listStyleType="none"
              marginStart="0"
              fontWeight="regular"
              fontSize="12px"
              spacing="10px"
            >
              <ListItem as="li">팀명 &#124; 인코스런</ListItem>
              <ListItem as="li">구성원 &#124; 이보룡 </ListItem>
              <ListItem as="li">이메일 &#124; incourse.run@gmail.com </ListItem>
            </UnorderedList>
          </Flex>
          <Text fontWeight="regular" fontSize="12px">
            &#169;INCOURSE.RUN All Right Reserved.
          </Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default Footer;
