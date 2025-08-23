import * as React from "react";

import { cn as ny } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={ny(
          "border-4 border-black placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full bg-input px-4 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_theme(colors.black)] transition-all file:border-0 file:bg-transparent file:text-sm file:font-bold focus-visible:outline-none focus-visible:ring-4 focus-visible:translate-x-1 focus-visible:translate-y-1 focus-visible:shadow-[2px_2px_0px_0px_theme(colors.black)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-yellow-400 dark:shadow-[4px_4px_0px_0px_theme(colors.yellow.400)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
