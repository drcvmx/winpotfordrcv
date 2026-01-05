import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const formInputVariants = cva(
  "w-full bg-transparent border transition-all duration-300 outline-none placeholder:text-muted-foreground/60",
  {
    variants: {
      variant: {
        default: "border-muted-foreground/30 focus:border-muted-foreground/60",
        dark: "border-foreground/20 focus:border-foreground/40 text-foreground",
      },
      inputSize: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "dark",
      inputSize: "md",
    },
  }
);

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof formInputVariants> {}

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof formInputVariants> {}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, variant, inputSize, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(formInputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  }
);
FormInput.displayName = "FormInput";

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, variant, inputSize, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(formInputVariants({ variant, inputSize }), "min-h-[120px] resize-none", className)}
        {...props}
      />
    );
  }
);
FormTextarea.displayName = "FormTextarea";

export { FormInput, FormTextarea, formInputVariants };
