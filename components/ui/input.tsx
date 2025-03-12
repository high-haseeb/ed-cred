import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, maxLength, register, name, required, ...props }: any) {
    const [charCount, setCharCount] = React.useState(0);

    return (
        <div className="relative w-full">
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-12 w-full min-w-0 rounded-sm border bg-transparent px-4 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className
                )}
                {...props}
                maxLength={maxLength}
                onChange={(e) => {
                    setCharCount(e.target.value.length);
                    props.onChange?.(e);
                }}
            />
            <div className="absolute right-3 bottom-3 text-sm text-muted-foreground w-max flex gap-2 items-center justify-center">
                {maxLength && (
                    <span>
                        {charCount}/{maxLength}
                    </span>
                )}
                {required && (
                    <span className="bg-orange-400 text-white px-2 py-1 rounded-full">
                        required
                    </span>
                )}
            </div>
        </div>
    );
}

export { Input };
