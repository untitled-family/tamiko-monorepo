import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Footer = ({ children }: Props) => {
  return <footer>{children}</footer>;
};
