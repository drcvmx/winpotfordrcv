import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("", {
  variants: {
    padding: {
      none: "",
      sm: "py-12",
      md: "py-16",
      lg: "py-20",
      xl: "py-24 md:py-32",
    },
    background: {
      default: "bg-background",
      muted: "bg-muted",
      primary: "bg-background",
      secondary: "bg-secondary",
      gradient: "hero-gradient",
    },
  },
  defaultVariants: {
    padding: "lg",
    background: "default",
  },
});

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sectionVariants> { }

const SectionWrapper = React.forwardRef<HTMLDivElement, SectionWrapperProps>(
  ({ className, padding, background, ...props }, ref) => {
    return (
      <section
        ref={ref as React.Ref<HTMLElement>}
        className={cn(sectionVariants({ padding, background }), className)}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      />
    );
  }
);
SectionWrapper.displayName = "SectionWrapper";

export { SectionWrapper, sectionVariants };
