import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,background-color,border-color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border bg-background text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const badgeSizeVariants = {
  large: "min-h-10 px-4 text-base leading-5",
  medium: "min-h-8 px-3 text-sm leading-4",
  small: "min-h-6 px-2 text-xs leading-4",
} as const;

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full whitespace-nowrap shrink-0 font-medium",
  {
    variants: {
      status: {
        neutral: "bg-gray-500 text-white",
        positive: "bg-status-success text-white",
        caution: "bg-status-warning text-gray-900",
        warning: "bg-status-error text-white",
      },
      size: badgeSizeVariants,
    },
    defaultVariants: {
      status: "neutral",
      size: "medium",
    },
  }
);

const promoBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full whitespace-nowrap shrink-0 font-medium",
  {
    variants: {
      color: {
        green: "bg-brand-800 text-white",
        black: "bg-gray-900 text-white",
        red: "bg-status-error text-white",
        blue: "bg-status-info text-white",
        yellow: "bg-status-warning text-gray-900",
      },
      appearance: {
        filled: "border border-transparent",
        outlined: "border bg-white",
      },
      size: badgeSizeVariants,
    },
    compoundVariants: [
      { color: "green", appearance: "outlined", className: "border-brand-700 bg-brand-50 text-brand-800" },
      { color: "black", appearance: "outlined", className: "border-gray-700 bg-gray-50 text-gray-900" },
      { color: "red", appearance: "outlined", className: "border-status-error bg-status-error/10 text-status-error" },
      { color: "blue", appearance: "outlined", className: "border-status-info bg-status-info/10 text-status-info" },
      { color: "yellow", appearance: "outlined", className: "border-status-warning bg-status-warning/10 text-gray-900" },
    ],
    defaultVariants: {
      color: "green",
      appearance: "filled",
      size: "medium",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

type StatusBadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof statusBadgeVariants>;

function StatusBadge({
  className,
  status,
  size,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      data-slot="status-badge"
      data-status={status ?? "neutral"}
      className={cn(statusBadgeVariants({ status, size }), className)}
      {...props}
    />
  );
}

type PromoBadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof promoBadgeVariants>;

function PromoBadge({
  className,
  color,
  appearance,
  size,
  ...props
}: PromoBadgeProps) {
  return (
    <span
      data-slot="promo-badge"
      data-color={color ?? "green"}
      data-appearance={appearance ?? "filled"}
      className={cn(promoBadgeVariants({ color, appearance, size }), className)}
      {...props}
    />
  );
}

export {
  Badge,
  PromoBadge,
  StatusBadge,
  badgeVariants,
  promoBadgeVariants,
  statusBadgeVariants,
};
