import * as React from "react";
import { Icon } from "../icon";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "",
        light: "",
        dark: "",
        outline: "",
      },
      status: {
        default: "",
        success: "",
        warning: "",
        error: "",
        inactive: "",
      },
      size: {
        sm: "px-1 py-0.5 text-xs",
        md: "px-2 py-0.5 text-sm",
        lg: "px-3 py-1 text-sm",
      },
    },
    compoundVariants: [
      // Success variants
      {
        variant: "default",
        status: "success",
        class: "text-ds-green-main",
      },
      {
        variant: "light",
        status: "success",
        class: "bg-ds-green-100 text-ds-green-main",
      },
      {
        variant: "dark",
        status: "success",
        class: "bg-ds-green-main text-white",
      },
      {
        variant: "outline",
        status: "success",
        class: "text-ds-green-main border-ds-green-main border",
      },
      // Warning variants
      {
        variant: "default",
        status: "warning",
        class: "text-ds-yellow-main",
      },
      {
        variant: "light",
        status: "warning",
        class: "bg-ds-yellow-100 text-ds-yellow-main",
      },
      {
        variant: "dark",
        status: "warning",
        class: "bg-ds-yellow-main text-white",
      },
      {
        variant: "outline",
        status: "warning",
        class: "text-ds-yellow-main border-ds-yellow-main border",
      },
      // Error variants
      {
        variant: "default",
        status: "error",
        class: "text-ds-red-main",
      },
      {
        variant: "light",
        status: "error",
        class: "bg-ds-red-100 text-ds-red-main",
      },
      {
        variant: "dark",
        status: "error",
        class: "bg-ds-red-main text-white",
      },
      {
        variant: "outline",
        status: "error",
        class: "text-ds-red-main border-ds-red-main border",
      },
      // Inactive variants
      {
        variant: "default",
        status: "inactive",
        class: "text-ds-gray-300",
      },
      {
        variant: "light",
        status: "inactive",
        class: "bg-ds-gray-100 text-ds-gray-300",
      },
      {
        variant: "dark",
        status: "inactive",
        class: "bg-ds-gray-300 text-white",
      },
      {
        variant: "outline",
        status: "inactive",
        class: "text-ds-gray-300 border-ds-gray-300 border",
      },
      // Default variants
      {
        variant: "default",
        status: "default",
        class: "text-ds-primary-main",
      },
      {
        variant: "light",
        status: "default",
        class: "bg-ds-primary-100 text-ds-primary-main",
      },
      {
        variant: "dark",
        status: "default",
        class: "bg-ds-primary-main text-white",
      },
      {
        variant: "outline",
        status: "default",
        class: "text-ds-primary-main border-ds-primary-main border",
      },
    ],
    defaultVariants: {
      variant: "default",
      status: "default",
      size: "md",
    },
  }
);

/**
 * Props for the Badge component
 */
interface BadgeProps {
  variant?: "default" | "light" | "dark" | "outline";
  status?: "success" | "warning" | "error" | "inactive" | "default";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: string;
  iconVariant?: "filled" | "outlined";
  iconSize?: string;
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      icon,
      iconVariant,
      iconSize,
      variant = "default",
      className,
      status = "default",
      size = "md",
    }: BadgeProps,
    ref
  ) => {
    // Map badge size to icon size if iconSize is not provided
    const getIconSize = () => {
      if (iconSize) return iconSize;

      switch (size) {
        case "sm":
          return "14px";
        case "md":
          return "16px";
        case "lg":
          return "18px";
        default:
          return "16px";
      }
    };

    return (
      <div
        className={cn(badgeVariants({ variant, status, size }), className)}
        ref={ref}
      >
        {icon && (
          <Icon name={icon} variant={iconVariant} size={getIconSize()} />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
