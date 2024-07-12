"use client"
import { useFormStatus } from "react-dom";
import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
    pendingClass?: string;
    pendingText?: string;
};

export function SubmitButton({ children, pendingText, pendingClass, ...props }: Props) {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
        <button {...props} type="submit" aria-disabled={pending}>
            {isPending ? pendingText : children}
            {(isPending && pendingClass && (
                <span className={pendingClass} />
            ))}
        </button>
    )
}