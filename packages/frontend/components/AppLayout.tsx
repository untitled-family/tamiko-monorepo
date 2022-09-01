import { ReactNode } from "react";
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
        navigation
      </Footer>
    </>
  )
}