import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-600 text-destructive-foreground shadow hover:bg-green-600/80",
        red: "border-transparent bg-red-800 text-destructive-foreground shadow hover:bg-red-800/80",
        orange:
          "border-transparent bg-orange-800 text-destructive-foreground shadow hover:bg-orange-800/80",
        lime: "border-transparent bg-lime-800 text-destructive-foreground shadow hover:bg-lime-800/80",
        cyan: "border-transparent bg-cyan-800 text-destructive-foreground shadow hover:bg-cyan-800/80",
        blue: "border-transparent bg-blue-800 text-destructive-foreground shadow hover:bg-blue-800/80",
        indigo:
          "border-transparent bg-indigo-800 text-destructive-foreground shadow hover:bg-indigo-800/80",
        violet:
          "border-transparent bg-violet-800 text-destructive-foreground shadow hover:bg-violet-800/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
