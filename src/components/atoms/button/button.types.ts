import { ButtonHTMLAttributes, DetailedHTMLProps, ElementType } from "react";
import { ButtonProps as MantineButtonProps, Variants } from "@mantine/core";

export type ButtonProps = DetailedHTMLProps<
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    HTMLButtonElement
> &
    MantineButtonProps & {
        component?: ElementType<any>;
        href?: string;
        variant?:
            | "filled"
            | "outline"
            | "light"
            | "white"
            | "default"
            | "subtle"
            | "gradient"
            | "custom_1";
    };
