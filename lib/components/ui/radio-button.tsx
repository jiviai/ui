import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Radio button variant styles using class-variance-authority
 * Creates consistent radio button styling with different states
 * @returns A function that generates radio button class names based on variant props
 */
const radioButtonVariants = cva(
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
 * Props for the RadioButton component.
 */
interface RadioButtonProps
  extends Omit<React.ComponentProps<"input">, "type" | "checked" | "onChange">,
    VariantProps<typeof radioButtonVariants> {
  /**
   * Whether the radio button is selected
   */
  selected: boolean;
  /**
   * Callback function called when the radio button selection changes
   */
  onChange: (selected: boolean) => void;
  /**
   * Label text displayed next to the radio button
   */
  label: string;
  /**
   * Optional description text displayed below the label
   */
  description?: string;
  /**
   * Whether the radio button is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes to apply to the radio button container
   */
  className?: string;
  /**
   * Ref to be forwarded to the input element
   */
  ref?: React.RefObject<HTMLInputElement>;
}

/**
 * A radio button component with label and optional description
 *
 * @param props - The radio button component props
 * @param props.selected - Whether the radio button is currently selected
 * @param props.onChange - Callback function when selection changes
 * @param props.label - Label text displayed next to the radio button
 * @param props.description - Optional description text below the label
 * @param props.disabled - Whether the radio button is disabled
 * @param props.className - Additional CSS classes to apply
 * @param ref - Ref to be forwarded to the input element
 *
 * @returns A radio button element with label and optional description
 *
 * @example
 * ```tsx
 * <RadioButton
 *   selected={selectedValue === 'option1'}
 *   onChange={(selected) => setSelectedValue(selected ? 'option1' : '')}
 *   label="Option 1"
 *   description="This is the first option"
 * />
 * ```
 */
const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      className,
      selected,
      onChange,
      label,
      description,
      disabled = false,
      ...props
    },
    ref
  ) => {
    /**
     * Handles the radio button click/change event
     */
    const handleChange = () => {
      if (!disabled) {
        onChange(!selected);
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
      radio: {
        selected: {
          enabled: "border-ds-orange-500 bg-white",
          disabled: "border-gray-300 bg-white",
        },
        unselected: {
          enabled: "border-ds-gray-300 bg-white hover:border-ds-orange-300",
          disabled: "border-ds-gray-200 bg-ds-gray-100",
        },
      },
      dot: {
        selected: "opacity-100 scale-100 bg-ds-orange-500",
        unselected: "opacity-0 scale-0 bg-ds-orange-500",
      },
      text: {
        label: {
          enabled: "text-ds-gray-900",
          disabled: "text-ds-gray-400",
        },
        description: {
          enabled: "text-ds-gray-600",
          disabled: "text-ds-gray-400",
        },
      },
    };

    /**
     * Gets the appropriate CSS classes for the radio circle based on current state
     */
    const getRadioClasses = () => {
      const baseClasses =
        "relative flex items-center justify-center w-4 h-4 rounded-full border-2 transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-ds-orange-500/20 focus-within:ring-offset-2";

      const stateKey = selected ? "selected" : "unselected";
      const enabledKey = disabled ? "disabled" : "enabled";

      return cn(baseClasses, stateClasses.radio[stateKey][enabledKey]);
    };

    /**
     * Gets the appropriate CSS classes for the inner dot
     */
    const getDotClasses = () => {
      const baseClasses =
        "w-2 h-2 rounded-full transition-all duration-200 ease-in-out";

      return cn(
        baseClasses,
        stateClasses.dot[selected ? "selected" : "unselected"]
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
          radioButtonVariants({ disabled, className }),
          description && "items-start"
        )}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <div className={getRadioClasses()}>
          <input
            ref={ref}
            type="radio"
            checked={selected}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            data-slot="radio-button"
            {...props}
          />
          <div className={getDotClasses()} />
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

RadioButton.displayName = "RadioButton";

export { RadioButton, radioButtonVariants };
export type { RadioButtonProps };
