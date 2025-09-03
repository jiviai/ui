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
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
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
        className:
          "disabled:text-gray-300 disabled:active:text-gray-300 py-1 px-0.5 h-fit",
      },
    ],
  }
);

/**
 * Props for the Button component.
 */
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether to render as a child component using Radix UI Slot
   */
  asChild?: boolean;
  /**
   * Icon to display on the left side of the chip
   * Use "default" for a default chevron_left icon
   */
  leadingIcon?: string;
  /**
   * Icon variant to display on the left side of the button
   */
  leadingIconVariant?: "filled" | "outlined";
  /**
   * Icon size to display on the left side of the button
   */
  leadingIconSize?: string;
  /**
   * Icon to display on the right side of the button
   * Use "default" for a default chevron_right icon
   */
  trailingIcon?: string;
  /**
   * Icon variant to display on the right side of the button
   */
  trailingIconVariant?: "filled" | "outlined";
  /**
   * Icon size to display on the right side of the button
   */
  trailingIconSize?: string;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  /**
   * Button content (text, elements, etc.)
   */
  children?: React.ReactNode;
  /**
   * Ref to be forwarded to the button element
   */
  ref?: React.RefObject<HTMLButtonElement>;
}

/**
 * A versatile button component with multiple variants and icon support
 *
 * @param props - The button component props
 * @param props.variant - The visual style variant ("primary" | "secondary" | "tertiary")
 * @param props.size - The button size ("large" | "medium" | "small")
 * @param props.asChild - If true, renders as a Slot component for composition
 * @param props.leadingIcon - Icon name to display before the button text
 * @param props.leadingIconVariant - Icon variant to display before the button text
 * @param props.leadingIconSize - Icon size to display before the button text
 * @param props.trailingIcon - Icon name to display after the button text
 * @param props.trailingIconVariant - Icon variant to display after the button text
 * @param props.trailingIconSize - Icon size to display after the button text
 * @param props.disabled - Whether the button is disabled
 * @param props.className - Additional CSS classes to apply
 * @param props.children - Button content (text, elements, etc.)
 * @param ref - Ref to be forwarded to the button element
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
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "medium",
      asChild = false,
      leadingIcon,
      leadingIconVariant = "outlined",
      leadingIconSize = "20px",
      trailingIconVariant = "outlined",
      trailingIconSize = "20px",
      trailingIcon,
      children,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const content = (
      <>
        {leadingIcon && (
          <Icon
            size={leadingIconSize}
            name={leadingIcon === "default" ? "chevron_left" : leadingIcon}
            variant={leadingIconVariant}
          />
        )}
        {children}
        {trailingIcon && (
          <Icon
            size={trailingIconSize}
            name={trailingIcon === "default" ? "chevron_right" : trailingIcon}
            variant={trailingIconVariant}
          />
        )}
      </>
    );

    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
