import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "../icon";

/**
 * Button variant styles using class-variance-authority
 * Creates consistent button styling with different variants, sizes, and states
 * @returns A function that generates button class names based on variant props
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-orange-500 text-white shadow-xs active:bg-orange-800 active:bg-none",
        secondary:
          "bg-white text-orange-500 border border-orange-300 shadow-xs active:bg-orange-100 active:border-orange-300",
        tertiary: "bg-transparent text-orange-500",
      },
      size: {
        large: "h-14 px-6 py-4 text-base",
        medium: "h-12 px-5 py-3 text-sm",
        small: "h-10 px-4 py-2.5 text-xs",
      },
      state: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      state: "default",
    },
    compoundVariants: [
      {
        variant: "primary",
        className:
          "disabled:bg-gray-300 disabled:text-white disabled:shadow-none disabled:active:bg-gray-300",
      },
      {
        variant: "secondary",
        className:
          "disabled:bg-white disabled:border-gray-200 disabled:text-gray-300 disabled:shadow-none disabled:active:bg-white disabled:active:border-gray-200",
      },
      {
        variant: "tertiary",
        className: "disabled:text-gray-300 disabled:active:text-gray-300",
      },
    ],
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
}

/**
 * A versatile button component with multiple variants and icon support
 *
 * @param props - The button component props
 * @param props.variant - The visual style variant ("primary" | "secondary" | "tertiary")
 * @param props.size - The button size ("large" | "medium" | "small")
 * @param props.state - The button state (currently only "default")
 * @param props.asChild - If true, renders as a Slot component for composition
 * @param props.leadingIcon - Icon name to display before the button text
 * @param props.trailingIcon - Icon name to display after the button text
 * @param props.disabled - Whether the button is disabled
 * @param props.className - Additional CSS classes to apply
 * @param props.children - Button content (text, elements, etc.)
 *
 * @returns A button element with the specified styling and functionality
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="large" leadingIcon="arrow_left">
 *   Click me
 * </Button>
 * ```
 */
function Button({
  className,
  variant,
  size,
  state,
  asChild = false,
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, state, className }))}
      disabled={disabled}
      {...props}
    >
      {leadingIcon && (
        <Icon
          size="20px"
          name={leadingIcon === "default" ? "chevron_left" : leadingIcon}
        />
      )}
      {children}
      {trailingIcon && (
        <Icon
          size="20px"
          name={trailingIcon === "default" ? "chevron_right" : trailingIcon}
        />
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
