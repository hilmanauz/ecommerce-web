import { ControllerProps, RegisterOptions, UseFormReturn } from "react-hook-form";

export type InputRules = Omit<RegisterOptions<Record<string, any>, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;

export type FormControlProps = {
    children: ControllerProps["render"];
    control: UseFormReturn["control"];
    name: string;
    rules?: InputRules;
};