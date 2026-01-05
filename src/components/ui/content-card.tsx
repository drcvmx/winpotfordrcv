import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const contentCardVariants = cva(
  "rounded-xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border border-border",
        gradient: "casino-card",
        ghost: "bg-transparent",
        elevated: "casino-card hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "gradient",
      padding: "lg",
    },
  }
);

export interface ContentCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentCardVariants> {}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(contentCardVariants({ variant, padding }), className)}
        {...props}
      />
    );
  }
);
ContentCard.displayName = "ContentCard";

export { ContentCard, contentCardVariants };
