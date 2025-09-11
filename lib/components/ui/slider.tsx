import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Slider variant styles using class-variance-authority
 * Creates consistent slider styling with different states
 * @returns A function that generates slider class names based on variant props
 */
const sliderVariants = cva(
  "relative flex items-center cursor-pointer transition-all duration-200 ease-in-out h-8 w-full",
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
 * Props for the Slider component.
 */
interface SliderProps
  extends Omit<
      React.ComponentProps<"input">,
      "type" | "value" | "onChange" | "size"
    >,
    VariantProps<typeof sliderVariants> {
  /**
   * Current value of the slider
   */
  value: number;
  /**
   * Callback function called when the slider value changes
   */
  onChange: (value: number) => void;
  /**
   * Minimum value of the slider
   */
  min?: number;
  /**
   * Maximum value of the slider
   */
  max?: number;
  /**
   * Step increment for the slider
   */
  step?: number;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes to apply to the slider container
   */
  className?: string;
  /**
   * Ref to be forwarded to the input element
   */
  ref?: React.RefObject<HTMLInputElement>;
}

/**
 * A slider component for selecting numeric values within a range
 *
 * @param props - The slider component props
 * @param props.value - Current value of the slider
 * @param props.onChange - Callback function when value changes
 * @param props.min - Minimum value (default: 0)
 * @param props.max - Maximum value (default: 100)
 * @param props.step - Step increment (default: 1)
 * @param props.disabled - Whether the slider is disabled
 * @param props.className - Additional CSS classes to apply
 * @param ref - Ref to be forwarded to the input element
 *
 * @returns A slider element with the specified styling and functionality
 *
 * @example
 * ```tsx
 * <Slider
 *   value={volume}
 *   onChange={(value) => setVolume(value)}
 *   min={0}
 *   max={100}
 * />
 * ```
 */
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      ...props
    },
    ref
  ) => {
    /**
     * Handles the slider change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(Number(e.target.value));
      }
    };

    /**
     * Handles keyboard events for accessibility
     */
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newValue = value;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newValue = Math.max(min, value - step);
          break;
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newValue = Math.min(max, value + step);
          break;
        case "Home":
          e.preventDefault();
          newValue = min;
          break;
        case "End":
          e.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      onChange(newValue);
    };

    // Calculate percentage for styling
    const percentage = ((value - min) / (max - min)) * 100;

    // State-based class maps for easier modification
    const stateClasses = {
      track: {
        enabled: "",
        disabled: "opacity-50",
      },
      fill: {
        enabled: "",
        disabled: "opacity-50",
      },
      thumb: {
        enabled: "bg-white shadow-sm",
        disabled: "bg-ds-grey-200",
      },
    };

    const enabledKey = disabled ? "disabled" : "enabled";

    /**
     * Gets the appropriate CSS classes for the track
     */
    const getTrackClasses = () => {
      const baseClasses = "w-full h-1 rounded-full bg-ds-grey-200";
      return cn(baseClasses, stateClasses.track[enabledKey]);
    };

    /**
     * Gets the appropriate CSS classes for the fill
     */
    const getFillClasses = () => {
      const baseClasses =
        "absolute top-0 left-0 h-1 rounded-full bg-ds-primary-main";
      return cn(baseClasses, stateClasses.fill[enabledKey]);
    };

    /**
     * Gets the appropriate CSS classes for the thumb
     */
    const getThumbClasses = () => {
      const baseClasses =
        "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full cursor-pointer w-6 h-6";
      return cn(baseClasses, stateClasses.thumb[enabledKey]);
    };

    return (
      <div className={cn(sliderVariants({ disabled }), className)}>
        {/* Track container */}
        <div className="relative w-full min-w-32 flex items-center h-full">
          {/* Track */}
          <div className="relative w-full h-1">
            <div className={getTrackClasses()}>
              {/* Fill */}
              <div
                className={getFillClasses()}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Thumb */}
            <div
              className={getThumbClasses()}
              style={{ left: `${percentage}%` }}
            >
              {/* Inner circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-ds-primary-main" />
            </div>
          </div>
        </div>

        {/* Hidden input for accessibility and form integration */}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          data-slot="slider"
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider, sliderVariants };
export type { SliderProps };
