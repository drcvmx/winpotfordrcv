import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const navLinkVariants = cva(
  "text-sm font-medium transition-colors duration-300",
  {
    variants: {
      variant: {
        default: "text-foreground/80 hover:text-accent",
        active: "text-accent",
        muted: "text-muted-foreground hover:text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface NavLinkAtomProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {}

const NavLinkAtom = React.forwardRef<HTMLAnchorElement, NavLinkAtomProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(navLinkVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
NavLinkAtom.displayName = "NavLinkAtom";

export { NavLinkAtom, navLinkVariants };
