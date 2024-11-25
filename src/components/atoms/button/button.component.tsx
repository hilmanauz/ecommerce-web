import { ForwardRefRenderFunction, forwardRef, memo } from "react";
import { ButtonProps } from "./button.types";
import { Button as MantineButton } from "@mantine/core";

const ButtonComponent: ForwardRefRenderFunction<
    HTMLButtonElement,
    ButtonProps
> = ({ className, ...props }, ref): JSX.Element => {
    return (
        <MantineButton
            {...props}
            // @ts-ignore
            ref={ref}
            variant={props.variant ?? "white"}
            color={props.color ?? "dark"}
            size={props.size || "xs"}
            className={className || ""}
            loaderProps={{
                color:
                    props.color === "dark" || !props.color ? "blue" : "white",
            }}
            sx={{ "&[disabled]": { pointerEvents: "all" }, ...props.sx }}
        />
    );
};

export const Button = memo(forwardRef(ButtonComponent));
