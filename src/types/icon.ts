import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export type IconComponent = React.ComponentType<IconProps>;
