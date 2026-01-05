import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const filterButtonVariants = cva(
  "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
  {
    variants: {
      isActive: {
        true: "bg-foreground text-background",
        false: "border border-foreground/40 text-foreground hover:bg-foreground/10",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface FilterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filterButtonVariants> {}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, isActive, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(filterButtonVariants({ isActive }), className)}
        {...props}
      />
    );
  }
);
FilterButton.displayName = "FilterButton";

export { FilterButton, filterButtonVariants };
