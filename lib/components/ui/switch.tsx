import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Switch variant styles using class-variance-authority
 * Creates consistent switch styling with different states
 * @returns A function that generates switch class names based on variant props
 */
const switchVariants = cva(
  "inline-flex items-center cursor-pointer transition-all duration-200 ease-in-out",
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
 * Props for the Switch component.
 */
interface SwitchProps
  extends Omit<React.ComponentProps<"input">, "type" | "checked" | "onChange">,
    VariantProps<typeof switchVariants> {
  /**
   * Whether the switch is checked/on
   */
  checked: boolean;
  /**
   * Callback function called when the switch state changes
   */
  onChange: (checked: boolean) => void;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes to apply to the switch container
   */
  className?: string;
  /**
   * Ref to be forwarded to the input element
   */
  ref?: React.RefObject<HTMLInputElement>;
}

/**
 * A switch component for toggling between on/off states
 *
 * @param props - The switch component props
 * @param props.checked - Whether the switch is currently on/checked
 * @param props.onChange - Callback function when checked state changes
 * @param props.disabled - Whether the switch is disabled
 * @param props.className - Additional CSS classes to apply
 * @param ref - Ref to be forwarded to the input element
 *
 * @returns A switch element with the specified styling and functionality
 *
 * @example
 * ```tsx
 * <Switch
 *   checked={isEnabled}
 *   onChange={(checked) => setIsEnabled(checked)}
 * />
 * ```
 */
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onChange, disabled = false, ...props }, ref) => {
    /**
     * Handles the switch click/change event
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

    // Switch configuration
    const switchConfig = {
      track: "w-10 h-5",
      thumb: "w-4 h-4",
      thumbTranslate: "translate-x-5",
    };

    // State-based class maps for easier modification
    const stateClasses = {
      track: {
        checked: {
          enabled: "bg-ds-orange-500",
          disabled: "bg-ds-grey-300",
        },
        unchecked: {
          enabled: "bg-ds-grey-200 hover:bg-ds-grey-300",
          disabled: "bg-ds-grey-100",
        },
      },
      thumb: {
        checked: {
          enabled: "bg-white shadow-sm",
          disabled: "bg-white",
        },
        unchecked: {
          enabled: "bg-white shadow-sm",
          disabled: "bg-ds-grey-200",
        },
      },
    };

    const enabledKey = disabled ? "disabled" : "enabled";
    const checkedKey = checked ? "checked" : "unchecked";

    /**
     * Gets the appropriate CSS classes for the track
     */
    const getTrackClasses = () => {
      const baseClasses =
        "relative inline-flex items-center rounded-full transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-ds-orange-500/20 focus-within:ring-offset-2";
      return cn(
        baseClasses,
        switchConfig.track,
        stateClasses.track[checkedKey][enabledKey]
      );
    };

    /**
     * Gets the appropriate CSS classes for the thumb
     */
    const getThumbClasses = () => {
      const baseClasses =
        "absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-in-out";
      const translateClass = checked
        ? switchConfig.thumbTranslate
        : "translate-x-0";

      return cn(
        baseClasses,
        switchConfig.thumb,
        translateClass,
        stateClasses.thumb[checkedKey][enabledKey]
      );
    };

    return (
      <label
        className={cn(switchVariants({ disabled, className }))}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <div className={getTrackClasses()}>
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            data-slot="switch"
            {...props}
          />
          <div className={getThumbClasses()} />
        </div>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchVariants };
export type { SwitchProps };
