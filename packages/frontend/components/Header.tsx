import { Flex } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex as='header' alignItems='center' justifyContent='space-between'>
      <h1>Tamiko</h1>
      <p>Not connected</p>
    </Flex>
  );
};
