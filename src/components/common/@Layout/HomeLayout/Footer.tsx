import {
  Box,
  Container,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Container bg="gray.800" as="footer" w={{ base: '375px' }}>
      <Flex
        gap="30px"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        h="280px"
        color="white"
        w="100%"
      >
        <Box as="strong">INCOURSE.RUN</Box>
        <UnorderedList
          listStyleType="none"
          fontWeight="regular"
          fontSize="12px"
        >
          <ListItem as="li">팀명 &#124; 인코스런</ListItem>
          <ListItem as="li">구성원 &#124; 이보룡 </ListItem>
          <ListItem as="li">이메일 &#124; incourse.run@gmail.com </ListItem>
        </UnorderedList>
        <Text fontWeight="regular" fontSize="12px">
          &#169;INCOURSE.RUN All Right Reserved.
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
