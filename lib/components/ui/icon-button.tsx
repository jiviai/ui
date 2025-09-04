import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "../icon";

/**
 * Configuration object for icon button variants using class-variance-authority.
 * Defines styling variants for different states, sizes, and appearances of icon buttons.
 */
const iconButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-ds-orange-500 text-white shadow-xs active:bg-ds-orange-800 active:bg-none",
        secondary:
          "bg-white text-ds-orange-500 border border-ds-orange-300 shadow-xs active:bg-ds-orange-100 active:border-ds-orange-300",
        tertiary: "bg-transparent text-ds-orange-500",
      },
      size: {
        large: "h-14 w-14 text-base",
        medium: "h-12 w-12 text-sm",
        small: "h-10 w-10 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
    compoundVariants: [
      {
        variant: "primary",
        className:
          "disabled:bg-ds-gray-300 disabled:text-white disabled:shadow-none disabled:active:bg-ds-gray-300",
      },
      {
        variant: "secondary",
        className:
          "disabled:bg-white disabled:border-ds-gray-200 disabled:text-ds-gray-300 disabled:shadow-none disabled:active:bg-white disabled:active:border-ds-gray-200",
      },
      {
        variant: "tertiary",
        className: "disabled:text-ds-gray-300 disabled:active:text-ds-gray-300",
      },
    ],
  }
);

/**
 * Props interface for the IconButton component.
 * Extends standard HTML button props with additional icon button specific options.
 */
interface IconButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof iconButtonVariants> {
  /** Whether to render as a child component using Radix UI Slot */
  asChild?: boolean;
  /** Name of the icon to display (defaults to "chevron_right") */
  iconName?: string;
  /** Size of the icon to display (defaults to "20px") */
  iconSize?: string;
  /** Variant of the icon to display (defaults to "outlined") */
  iconVariant?: "filled" | "outlined";
  /** Whether the button is disabled */
  disabled?: boolean;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  /** Size of the button (defaults to "medium") */
  size?: "small" | "medium" | "large";
}

/**
 * A customizable icon button component with multiple variants and sizes.
 *
 * @param className - Additional CSS classes to apply
 * @param variant - Button style variant: 'primary', 'secondary', or 'tertiary'
 * @param size - Button size: 'large', 'medium', or 'small'
 * @param asChild - Whether to render as a child component using Radix UI Slot
 * @param iconName - Name of the icon to display (defaults to "chevron_right")
 * @param size - Size of the button (defaults to "medium")
 * @param disabled - Whether the button is disabled
 * @param iconSize - Size of the icon to display (defaults to "20px")
 * @param iconVariant - Variant of the icon to display (defaults to "outlined")
 * @param ref - Ref to be forwarded to the button element
 * @param props - Additional HTML button props
 * @returns A styled icon button component
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconName = "chevron_right",
      iconSize,
      iconVariant = "outlined",
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const getIconSize = () => {
      switch (size) {
        case "large":
          return "24px";
        case "small":
          return "16px";
        case "medium":
        default:
          return "20px";
      }
    };

    return (
      <Comp
        data-slot="icon-button"
        className={cn(iconButtonVariants({ variant, size, className }))}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <Icon
          size={iconSize ?? getIconSize()}
          name={iconName}
          variant={iconVariant}
        />
      </Comp>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
