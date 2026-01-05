import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    size: {
      h1: "text-5xl md:text-6xl lg:text-7xl",
      h2: "text-4xl md:text-5xl",
      h3: "text-2xl md:text-3xl",
      h4: "text-xl md:text-2xl",
      h5: "text-lg md:text-xl",
      h6: "text-base md:text-lg",
    },
    textColor: {
      default: "text-foreground",
      primary: "text-primary",
      accent: "text-accent",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "h2",
    textColor: "default",
  },
});

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg md:text-xl",
      xl: "text-xl md:text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    textColor: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent",
    },
    leading: {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    textColor: "default",
    leading: "normal",
  },
});

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, textColor, as, ...props }, ref) => {
    const Component = as || "h2";
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, textColor }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, textColor, leading, as = "p", ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, weight, textColor, leading }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Heading, Text, headingVariants, textVariants };
