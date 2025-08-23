import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn as ny } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-black uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-4 border-black transform",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[6px_6px_0px_0px_theme(colors.black)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_theme(colors.black)] active:translate-x-2 active:translate-y-2 active:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[6px_6px_0px_0px_theme(colors.black)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_theme(colors.black)] active:translate-x-2 active:translate-y-2 active:shadow-none",
        outline:
          "bg-background text-foreground shadow-[6px_6px_0px_0px_theme(colors.black)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_theme(colors.black)] active:translate-x-2 active:translate-y-2 active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[6px_6px_0px_0px_theme(colors.black)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_theme(colors.black)] active:translate-x-2 active:translate-y-2 active:shadow-none",
        ghost: "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground hover:border-black hover:shadow-[3px_3px_0px_0px_theme(colors.black)]",
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={ny(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
