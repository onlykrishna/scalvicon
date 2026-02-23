import type { ReactNode } from "react";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthInputProps<T extends FieldValues> {
    label: string;
    id: Path<T>;
    type: string;
    placeholder: string;
    icon: LucideIcon;
    rightElement?: ReactNode;
    error?: string;
    register: UseFormRegister<T>;
}

export function AuthInput<T extends FieldValues>({
    label,
    id,
    type,
    placeholder,
    icon: Icon,
    rightElement,
    error,
    register,
}: AuthInputProps<T>) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="text-sm text-white/60 font-medium">
                    {label}
                </label>
                {rightElement && <div className="text-sm">{rightElement}</div>}
            </div>
            <div className="relative">
                <Icon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                />
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...register(id)}
                    className={cn(
                        "w-full bg-white/5 border rounded-lg pl-9 pr-4 py-3 text-sm text-white",
                        "placeholder:text-white/25 transition-all duration-200",
                        "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30",
                        "autofill:bg-transparent",
                        error ? "border-red-500/60" : "border-white/10 hover:border-white/20",
                    )}
                />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>
    );
}
