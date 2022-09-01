import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";
import AppIcon from "./AppIcon";
import { Footer } from "./Footer";
import { Main } from "./Main";

type Props = {
  children: ReactNode;
};
export default function AppLayout({ children }: Props) {
  return (
    <>
      <Main>{children}</Main>
      <Footer>
        <SimpleGrid columns={4} gap={4}>
          <AppIcon name='Tamiko' href='/app' />
          <AppIcon name='bag' href='/app/inventory' />
          <AppIcon name='about' href='/about' />
          <AppIcon name='settings' href='/app/settings' />
        </SimpleGrid>
      </Footer>
    </>
  )
}