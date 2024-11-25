import { ForwardRefRenderFunction, forwardRef, memo, useMemo } from "react";
import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import { PasswordInputProps } from "./password-input.types";
import { useDisclosure } from "@mantine/hooks";
import { classNames } from "@/utils";

const PasswordInputComponent: ForwardRefRenderFunction<
    HTMLInputElement,
    PasswordInputProps
> = ({ id, validation, ...props }, ref): JSX.Element => {
    const [visible, { toggle }] = useDisclosure(false);
    return (
        <MantinePasswordInput
            {...props}
            id={id}
            ref={ref}
            visible={visible}
            classNames={{
                ...props.classNames,
                input: classNames(
                    "focus-within:!shadow-[#2563EB] focus-within:!ring-[1px] focus-within:!ring-[#2563EB]",
                    props.classNames?.input
                ),
                innerInput: classNames(
                    "focus:!border-0 focus:!shadow-none focus:!ring-0",
                    props.classNames?.innerInput
                ),
            }}
            onVisibilityChange={toggle}
        />
    );
};

export const PasswordInput = memo(forwardRef(PasswordInputComponent));
