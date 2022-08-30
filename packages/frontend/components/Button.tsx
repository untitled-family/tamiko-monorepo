import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { omit } from 'lodash'
import { transparentize } from "polished";

import { useElement } from "../hooks/useElementTheme";

type Props = {
  children: ReactNode;
  isGhost?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const corners = [
  { id: 0, top: 0, left: 0 },
  { id: 1, top: 0, right: 0 },
  { id: 2, bottom: 0, left: 0 },
  { id: 3, bottom: 0, right: 0 }
];

export const Button = ({
  children,
  isGhost = false,
  disabled,
  onClick,
  ...rest
}: Props) => {
  const disabledBg = isGhost ? 'transparent' : transparentize(0.8, useElement(700));
  const disabledTextColor = transparentize(0.2, useElement(400))
  const bgColor = isGhost ? 'transparent' : useElement(700);
  const textColor = isGhost ? 'black' : useElement(400)
  const cornerColor = useElement();

  return (
    <Box
      disabled={disabled}
      as='button'
      bg={disabled ? disabledBg : bgColor}
      textColor={disabled ? disabledTextColor : textColor}
      position='relative'
      p={4}
      fontSize='lg'
      textTransform='uppercase'
      w='full'
      onClick={onClick}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      {...rest}
    >
      {!isGhost &&
        corners.map((corner) => (
          <Box
            key={corner.id}
            as='span'
            w='full'
            h='full'
            position='absolute'
            bg={cornerColor}
            width='4px'
            height='4px'
            {...omit(corner, ['id'])}
          />
        ))}
      {children}
    </Box>
  );
};
