import { ForwardRefRenderFunction, forwardRef, memo, useMemo } from "react";
import { Select as MantineSelect } from "@mantine/core";
import { SelectProps } from "./select.types";

const SelectComponent: ForwardRefRenderFunction<
    HTMLInputElement,
    SelectProps
> = ({ className, id, ...props }, ref): JSX.Element => {
    return (
        <MantineSelect {...props} id={id} size={props.size || "xs"} ref={ref} />
    );
};

export const Select = memo(forwardRef(SelectComponent));
