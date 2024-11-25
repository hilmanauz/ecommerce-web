import { InputRules } from "@/components/atoms/form-control/form-control.types";
import { MantineNumberSize, MantineSize } from "@mantine/core";
import {
    Control,
    FieldValues,
    UseFormClearErrors,
    UseFormReturn,
} from "react-hook-form";
import { AsyncSelectProps } from "../async-select/async-select.types";
import { DatePickerInputProps, DateTimePickerProps } from "@mantine/dates";
import { RichTextProps } from "@/components/atoms/rich-text/rich-text.types";
import { NumberInputProps } from "@/components/atoms/number-input/number-input.types";
import { CheckboxGroupProps } from "../checkbox-group/checkbox-group.types";
import { RadioGroupProps } from "../radio-group/radio-group.types";
import { SelectProps } from "../select/select.types";
import { SwitchProps } from "@/components/atoms/switch/switch.types";
import { TextareaProps } from "@/components/atoms/textarea/textarea.types";
import { TextInputProps } from "@/components/atoms/text-input/text-input.types";
import { PasswordInputProps } from "@/components/atoms/password-input/password-input.types";
import { FileInputProps } from "@/components/atoms/file-input/file-input.types";
import React from "react";

export type InputType =
    | "text"
    | "rich-text"
    | "password"
    | "number"
    | "textarea"
    | "switch"
    | "select"
    | "async-select"
    | "date-picker"
    | "date-time-picker"
    | "checkbox-group"
    | "checkbox"
    | "radio"
    | "file"
    | "repassword";

export type InputControlProps<T extends FieldValues, I extends InputType> = {
    control: Control<T, any>;
    name: string;
    leftIcon?: React.ReactNode;
    onKeyDown?: React.KeyboardEventHandler<
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLButtonElement
        | HTMLDivElement
    >;
    onChange?: (
        e: any,
        onChange: (...event: any[]) => void,
        methods: UseFormReturn<FieldValues, any, FieldValues>
    ) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    radius?: MantineNumberSize;
    classNames?: Record<string, string>;
    size?: MantineSize;
    readOnly?: boolean;
} & InputProps<I>;

export type FormDefinition<
    T extends InputType,
    U extends Record<string, any> = Record<string, any>
> = {
    type: T;
    options: U;
    leftIcon?: React.ReactNode;
    placeholder?: string;
    rules?: InputRules;
    required?: boolean | { message: string };
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (
        e: any,
        onChange: (...event: any[]) => void,
        methods: UseFormReturn<FieldValues, any, FieldValues>
    ) => void;
    label?: React.ReactNode;
};

export type InputProps<T extends InputType = InputType> = T extends "text"
    ? FormDefinition<
          T,
          (
              | { format: "string" }
              | { format: "number" }
              | { format: "email" }
              | {
                    format: "url-link";
                }
          ) &
              TextInputProps
      >
    : T extends "textarea"
    ? FormDefinition<
          T,
          { format: "string"; autosize?: boolean } & TextareaProps
      >
    : T extends "rich-text"
    ? FormDefinition<T, RichTextProps>
    : T extends "switch"
    ? FormDefinition<T, SwitchProps>
    : T extends "file"
    ? FormDefinition<
          T,
          {
              accept: string;
              type: "input" | "preview";
              maxSize?: number;
              clearErrors?: UseFormClearErrors<FieldValues>;
          } & Omit<FileInputProps, "onKeyDown">
      >
    : T extends "number"
    ? FormDefinition<T, NumberInputProps>
    : T extends "select"
    ? FormDefinition<
          T,
          Omit<SelectProps, "data"> & {
              data: Array<{ label: string; value: any }>;
              withinPortal?: boolean;
          }
      >
    : T extends "date-picker"
    ? FormDefinition<T, DatePickerInputProps>
    : T extends "date-time-picker"
    ? FormDefinition<T, DateTimePickerProps>
    : T extends "async-select"
    ? FormDefinition<T, AsyncSelectProps>
    : T extends "password"
    ? FormDefinition<T, PasswordInputProps>
    : T extends "repassword"
    ? FormDefinition<T, PasswordInputProps>
    : T extends "checkbox-group"
    ? FormDefinition<T, CheckboxGroupProps>
    : T extends "radio"
    ? FormDefinition<T, RadioGroupProps>
    : FormDefinition<T, {}>;

export type InputPropsValues<T extends InputType> = T extends
    | "text"
    | "rich-text"
    | "textarea"
    | "select"
    | "async-select"
    | "password"
    | "file"
    ? string
    : T extends "switch"
    ? boolean
    : T extends "number"
    ? number
    : never;
