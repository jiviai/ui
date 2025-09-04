import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "../icon";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:bg-white disabled:border-ds-gray-300 disabled:text-ds-gray-300 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-8 px-3 border",
  {
    variants: {
      variant: {
        selection: "",
        tag: "border-ds-gray-300 text-black bg-white",
      },
    },
    defaultVariants: {
      variant: "selection",
    },
  }
);

/**
 * Props for the Chip component
 */
interface ChipProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof chipVariants> {
  /**
   * Icon to display on the left side of the chip
   * Use "default" for a default chevron_left icon
   */
  leadingIcon?: string;
  /**
   * Icon to display on the right side of the chip
   * Use "default" for a default chevron_right icon
   */
  trailingIcon?: string;
  /**
   * Whether the chip is disabled
   */
  disabled?: boolean;
  /**
   * The text content to display in the chip
   */
  text: string;
  /**
   * Whether the chip is in a selected state (only applies to selection variant)
   * @default false
   */
  selected?: boolean;
  /**
   * Icon size to display on the left side
   */
  leadingIconSize?: string;
  /**
   * Icon size to display on the right side
   */
  trailingIconSize?: string;
  /**
   * Icon variant to display on the left side
   */
  leadingIconVariant?: "filled" | "outlined";
  /**
   * Icon variant to display on the right side
   */
  trailingIconVariant?: "filled" | "outlined";
}

/**
 * A versatile chip component that can be used for selections, tags, and other interactive elements
 *
 * @param props - The props for the Chip component
 * @param props.variant - The visual variant of the chip ("selection" or "tag")
 * @param props.leadingIcon - Optional icon to display on the left side
 * @param props.leadingIconSize - Optional icon size to display on the left side
 * @param props.leadingIconVariant - Optional icon variant to display on the left side
 * @param props.trailingIcon - Optional icon to display on the right side
 * @param props.trailingIconSize - Optional icon size to display on the right side
 * @param props.trailingIconVariant - Optional icon variant to display on the right side
 * @param props.disabled - Whether the chip is disabled
 * @param props.text - The text content to display
 * @param props.selected - Whether the chip is selected (for selection variant)
 * @param props.className - Additional CSS classes to apply
 * @param ref - Ref to be forwarded to the button element
 *
 * @returns A button element styled as a chip
 *
 * @example
 * ```tsx
 * // Basic selection chip
 * <Chip text="Option 1" variant="selection" />
 *
 * // Selected chip with icon
 * <Chip
 *   text="Selected"
 *   variant="selection"
 *   selected={true}
 *   leadingIcon="check"
 * />
 *
 * // Tag chip
 * <Chip text="Tag" variant="tag" />
 * ```
 */
const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant,
      leadingIcon,
      leadingIconSize = "16px",
      trailingIconSize = "16px",
      leadingIconVariant = "outlined",
      trailingIconVariant = "outlined",
      trailingIcon,
      disabled,
      text,
      selected = false,
      ...props
    },
    ref
  ) => {
    const getVariantClasses = () => {
      if (variant === "selection") {
        return selected
          ? "bg-ds-orange-500 text-white border-ds-orange-500"
          : "bg-white border-ds-orange-500 text-ds-orange-500";
      }
      return "";
    };

    return (
      <button
        data-slot="chip"
        className={cn(
          chipVariants({ variant, className }),
          getVariantClasses()
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {leadingIcon && (
          <Icon
            size={leadingIconSize}
            variant={leadingIconVariant}
            name={leadingIcon === "default" ? "chevron_left" : leadingIcon}
          />
        )}
        {text}
        {trailingIcon && (
          <Icon
            size={trailingIconSize}
            variant={trailingIconVariant}
            name={trailingIcon === "default" ? "chevron_right" : trailingIcon}
          />
        )}
      </button>
    );
  }
);

Chip.displayName = "Chip";

export { Chip };
