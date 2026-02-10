"use client";

import { useState, useTransition } from "react"

type AuthFormProps = {
    action: (formData: FormData) => Promise<{error:string | void}>;
    isRegister: boolean;
}

export const AuthForm = ({action, isRegister = false,} : AuthFormProps) => {
    const [ error, setError ] = useState<string | null>(null);
    const [ isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const result = await action(formData);
            if (result?.error) {
                setError(result.error);
            }
        });
    };

    return <form action={handleSubmit} className = "w-full space-y-4">
        {error}
    </form>
};