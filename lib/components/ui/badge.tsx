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
        class: "text-green-main",
      },
      {
        variant: "light",
        status: "success",
        class: "bg-green-100 text-green-main",
      },
      {
        variant: "dark",
        status: "success",
        class: "bg-green-main text-white",
      },
      {
        variant: "outline",
        status: "success",
        class: "text-green-main border-green-main border",
      },
      // Warning variants
      {
        variant: "default",
        status: "warning",
        class: "text-yellow-main",
      },
      {
        variant: "light",
        status: "warning",
        class: "bg-yellow-100 text-yellow-main",
      },
      {
        variant: "dark",
        status: "warning",
        class: "bg-yellow-main text-white",
      },
      {
        variant: "outline",
        status: "warning",
        class: "text-yellow-main border-yellow-main border",
      },
      // Error variants
      {
        variant: "default",
        status: "error",
        class: "text-red-main",
      },
      {
        variant: "light",
        status: "error",
        class: "bg-red-100 text-red-main",
      },
      {
        variant: "dark",
        status: "error",
        class: "bg-red-main text-white",
      },
      {
        variant: "outline",
        status: "error",
        class: "text-red-main border-red-main border",
      },
      // Inactive variants
      {
        variant: "default",
        status: "inactive",
        class: "text-gray-300",
      },
      {
        variant: "light",
        status: "inactive",
        class: "bg-gray-100 text-gray-300",
      },
      {
        variant: "dark",
        status: "inactive",
        class: "bg-gray-300 text-white",
      },
      {
        variant: "outline",
        status: "inactive",
        class: "text-gray-300 border-gray-300 border",
      },
      // Default variants
      {
        variant: "default",
        status: "default",
        class: "text-primary-main",
      },
      {
        variant: "light",
        status: "default",
        class: "bg-primary-100 text-primary-main",
      },
      {
        variant: "dark",
        status: "default",
        class: "bg-primary-main text-white",
      },
      {
        variant: "outline",
        status: "default",
        class: "text-primary-main border-primary-main border",
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
