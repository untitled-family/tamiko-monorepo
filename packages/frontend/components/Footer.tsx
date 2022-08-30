import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Footer = ({ children }: Props) => {
  return <Box as='footer' pb={2}>{children}</Box>;
};
