import { InputProps } from "@/components/moleculs/input-control/input-control.types";

export interface AccountContentProps {
    title: string;
    description?: string;
    data?: Record<string, any>;
    formData: Record<string, InputProps>;
    onSubmit: (data: Record<string, any>, close: () => void) => Promise<void>;
    type: "sign-in" | "forgot" | "reset" | "sign-in-without-forgot";
    submitLabel: string;
}
