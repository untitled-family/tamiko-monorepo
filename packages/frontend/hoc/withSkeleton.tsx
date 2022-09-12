import { PixelatedBox } from "@/components/PixelatedBox";
import { Component } from "react";

type Props = {
  bg?: string;
  p?: string | number;
  w?: string | number;
  h?: string | number;
  my?: string | number;
  mx?: string | number;
  opacity?: string | number;
  isLoading: boolean;
  [x: string]: any; // all other props passed down to WrappedComponent
}

const getDisplayName = (WrappedComponent: any) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const withSkeleton = (WrappedComponent: typeof Component | ((props: any) => JSX.Element)) => {
  const WC = ({ isLoading, bg, p, w, h, mx, my, opacity, ...props }: Props) => {

    if (isLoading) {
      return (
        <PixelatedBox
          p={p}
          mx={mx}
          my={my}
          w={w}
          h={h}
          opacity={opacity}
        />
      )
    }

    return (
      <WrappedComponent {...props} />
    )
  }

  WC.displayName = `Section(${getDisplayName(WrappedComponent)})`;

  return WC;
}