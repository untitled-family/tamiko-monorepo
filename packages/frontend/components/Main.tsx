import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isCentered?: boolean;
};

export const Main = ({ children, isCentered = true }: Props) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      textAlign={isCentered ? 'center' : 'left'}
    >
      <div>{children}</div>
    </Flex>
  );
};
