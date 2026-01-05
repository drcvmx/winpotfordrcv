import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statDisplayVariants = cva("", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    align: "center",
    size: "md",
  },
});

const valueVariants = cva("font-bold text-accent", {
  variants: {
    size: {
      sm: "text-xl md:text-2xl",
      md: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const labelVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-xs md:text-sm",
      lg: "text-sm md:text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface StatDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statDisplayVariants> {
  value: string;
  label: string;
}

const StatDisplay = React.forwardRef<HTMLDivElement, StatDisplayProps>(
  ({ className, align, size, value, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statDisplayVariants({ align, size }), className)}
        {...props}
      >
        <div className={valueVariants({ size })}>{value}</div>
        <div className={labelVariants({ size })}>{label}</div>
      </div>
    );
  }
);
StatDisplay.displayName = "StatDisplay";

export { StatDisplay, statDisplayVariants };
