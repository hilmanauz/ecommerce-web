import React, { ForwardRefRenderFunction, forwardRef, memo } from "react";
import { HeadingProps } from "./heading.types";
import { Title } from "@mantine/core";

const HeadingComponent: ForwardRefRenderFunction<
    HTMLHeadingElement,
    HeadingProps
> = (props, ref): JSX.Element => {
    return <Title {...props} ref={ref} />;
};

export const Heading = memo(forwardRef(HeadingComponent));
