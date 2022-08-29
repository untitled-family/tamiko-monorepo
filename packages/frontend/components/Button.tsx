import { ReactNode } from "react";

import { useElement } from "../hooks/useElementTheme";

type Props = {
  children: ReactNode;
  isGhost?: boolean;
  onClick?: () => void;
};

const cornerBase = "w-1 h-1 absolute";
const corners = [
  "top-0 left-0",
  "top-0 right-0",
  "bottom-0 left-0",
  "bottom-0 right-0",
];

export const Button = ({
  children,
  isGhost = false,
  onClick,
  ...rest
}: Props) => {
  const bgColor = useElement(700);
  const cornerColor = useElement(500);

  return (
    <button
      // className={classNames(
      //   isGhost ? "bg-transparent" : bgColor,
      //   isGhost ? "text-black" : "text-white",
      //   "relative p-4 w-full text-xl uppercase"
      // )}
      onClick={onClick}
      {...rest}
    >
      {!isGhost &&
        corners.map((corner) => (
          <span
            key={corner}
          // className={classNames(cornerBase, cornerColor, corner)}
          />
        ))}
      {children}
    </button>
  );
};
