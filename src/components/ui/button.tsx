import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-clay hover:shadow-clay-hover hover:scale-[1.02] active:scale-[0.98] rounded-clay",
        destructive:
          "bg-destructive text-destructive-foreground shadow-clay hover:shadow-clay-hover hover:scale-[1.02] active:scale-[0.98] rounded-clay",
        outline:
          "border-2 border-primary bg-card text-foreground shadow-clay hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] active:scale-[0.98] rounded-clay",
        secondary:
          "bg-secondary text-secondary-foreground shadow-clay hover:shadow-clay-hover hover:scale-[1.02] active:scale-[0.98] rounded-clay",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground rounded-clay",
        link: 
          "text-primary underline-offset-4 hover:underline",
        clay:
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-clay hover:shadow-clay-hover hover:scale-[1.03] active:scale-[0.97] rounded-clay",
        accent:
          "bg-accent text-accent-foreground shadow-clay hover:shadow-clay-hover hover:scale-[1.02] active:scale-[0.98] rounded-clay",
        highlight:
          "bg-highlight text-highlight-foreground shadow-clay hover:shadow-clay-hover hover:scale-[1.02] active:scale-[0.98] rounded-clay",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        xl: "h-16 px-10 py-5 text-xl",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
