import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "../icon";

/**
 * Checkbox variant styles using class-variance-authority
 * Creates consistent checkbox styling with different states
 * @returns A function that generates checkbox class names based on variant props
 */
const checkboxVariants = cva(
  "inline-flex items-center gap-3 cursor-pointer transition-all duration-200 ease-in-out",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * Props for the Checkbox component.
 */
interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "type" | "checked" | "onChange">,
    VariantProps<typeof checkboxVariants> {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;
  /**
   * Callback function called when the checkbox state changes
   */
  onChange: (checked: boolean) => void;
  /**
   * Label text displayed next to the checkbox
   */
  label: string;
  /**
   * Optional description text displayed below the label
   */
  description?: string;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes to apply to the checkbox container
   */
  className?: string;
  /**
   * Ref to be forwarded to the input element
   */
  ref?: React.RefObject<HTMLInputElement>;
}

/**
 * A checkbox component with label and optional description
 *
 * @param props - The checkbox component props
 * @param props.checked - Whether the checkbox is currently checked
 * @param props.onChange - Callback function when checked state changes
 * @param props.label - Label text displayed next to the checkbox
 * @param props.description - Optional description text below the label
 * @param props.disabled - Whether the checkbox is disabled
 * @param props.className - Additional CSS classes to apply
 * @param ref - Ref to be forwarded to the input element
 *
 * @returns A checkbox element with label and optional description
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked}
 *   onChange={(checked) => setIsChecked(checked)}
 *   label="Accept terms and conditions"
 *   description="By checking this box, you agree to our terms of service"
 * />
 * ```
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked,
      onChange,
      label,
      description,
      disabled = false,
      ...props
    },
    ref
  ) => {
    /**
     * Handles the checkbox click/change event
     */
    const handleChange = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    /**
     * Handles keyboard events for accessibility
     */
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleChange();
      }
    };

    // State-based class maps for easier modification
    const stateClasses = {
      checkbox: {
        checked: {
          enabled: "border-ds-orange-500 bg-ds-orange-500",
          disabled: "border-ds-grey-300 bg-ds-grey-300",
        },
        unchecked: {
          enabled: "border-ds-grey-300 bg-white hover:border-ds-orange-300",
          disabled: "border-ds-grey-200 bg-ds-grey-100",
        },
      },
      checkmark: {
        checked: "opacity-100 scale-100",
        unchecked: "opacity-0 scale-0",
      },
      text: {
        label: {
          enabled: "text-ds-grey-900",
          disabled: "text-ds-grey-400",
        },
        description: {
          enabled: "text-ds-grey-600",
          disabled: "text-ds-grey-400",
        },
      },
    };

    /**
     * Gets the appropriate CSS classes for the checkbox square based on current state
     */
    const getCheckboxClasses = () => {
      const baseClasses =
        "relative flex items-center justify-center w-4 h-4 rounded border-2 transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-ds-orange-500/20 focus-within:ring-offset-2";

      const stateKey = checked ? "checked" : "unchecked";
      const enabledKey = disabled ? "disabled" : "enabled";

      return cn(baseClasses, stateClasses.checkbox[stateKey][enabledKey]);
    };

    /**
     * Gets the appropriate CSS classes for the checkmark icon
     */
    const getCheckmarkClasses = () => {
      const baseClasses = "transition-all duration-200 ease-in-out text-white";

      return cn(
        baseClasses,
        stateClasses.checkmark[checked ? "checked" : "unchecked"]
      );
    };

    /**
     * Gets the appropriate CSS classes for the label text
     */
    const getLabelClasses = () => {
      const baseClasses = "text-sm font-medium leading-5";
      const enabledKey = disabled ? "disabled" : "enabled";

      return cn(baseClasses, stateClasses.text.label[enabledKey]);
    };

    /**
     * Gets the appropriate CSS classes for the description text
     */
    const getDescriptionClasses = () => {
      const baseClasses = "text-sm leading-5 mt-1";
      const enabledKey = disabled ? "disabled" : "enabled";

      return cn(baseClasses, stateClasses.text.description[enabledKey]);
    };

    return (
      <label
        className={cn(
          checkboxVariants({ disabled, className }),
          description && "items-start"
        )}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <div className={getCheckboxClasses()}>
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            data-slot="checkbox"
            {...props}
          />
          <div className={getCheckmarkClasses()}>
            <Icon name="check" size="12px" variant="outlined" />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col min-w-0",
            description && "-translate-y-0.5"
          )}
        >
          <div className={getLabelClasses()}>{label}</div>
          {description && (
            <div className={getDescriptionClasses()}>{description}</div>
          )}
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
export type { CheckboxProps };
