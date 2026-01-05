import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconBoxVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors",
  {
    variants: {
      size: {
        sm: "w-10 h-10",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-20 h-20",
      },
      variant: {
        default: "bg-muted",
        primary: "bg-primary/10 group-hover:bg-primary/20",
        accent: "bg-accent/10",
        ghost: "bg-transparent",
      },
    },
    defaultVariants: {
      size: "lg",
      variant: "primary",
    },
  }
);

export interface IconBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBoxVariants> {}

const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(iconBoxVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);
IconBox.displayName = "IconBox";

export { IconBox, iconBoxVariants };
