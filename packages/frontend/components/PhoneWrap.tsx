import { Flex, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import { useElement } from "../hooks/useElementTheme";

type Props = {
  children: ReactNode;
};

export const PhoneWrap = ({ children }: Props) => {
  const bgColor = useElement();
  const textColor = useElement(700)

  return (
    <Flex minH='100vh' flexDirection='column' alignItems='center' justifyContent='center' textTransform='uppercase'>
      <Flex
        textColor={textColor}
        bg={bgColor}
        w='full'
        py={2}
        px={4}
        flexDirection='column'
        style={{ maxWidth: 375, minHeight: 812 }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
