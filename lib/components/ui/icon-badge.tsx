import * as React from "react";
import { Icon } from "../icon";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const iconBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
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
        class: "text-gray-300 border-gray-300 hover:bg-gray-100",
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
 * Props for the IconBadge component
 */
interface IconBadgeProps {
  variant?: "default" | "light" | "dark" | "outline";
  status?: "success" | "warning" | "error" | "inactive" | "default";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon: string;
  iconVariant?: "filled" | "outlined";
  iconSize?: string;
}

const IconBadge = React.forwardRef<HTMLDivElement, IconBadgeProps>(
  (
    {
      icon,
      iconVariant,
      iconSize,
      variant = "default",
      className,
      status = "default",
      size = "md",
    }: IconBadgeProps,
    ref
  ) => {
    // Map badge size to icon size if iconSize is not provided
    const getIconSize = () => {
      if (iconSize) return iconSize;

      switch (size) {
        case "sm":
          return "12px";
        case "md":
          return "16px";
        case "lg":
          return "20px";
        default:
          return "16px";
      }
    };

    return (
      <div
        className={cn(iconBadgeVariants({ variant, status, size }), className)}
        ref={ref}
      >
        <Icon name={icon} variant={iconVariant} size={getIconSize()} />
      </div>
    );
  }
);

IconBadge.displayName = "IconBadge";

export { IconBadge };
