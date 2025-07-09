import * as React from "react";

import { cn } from "@/lib/utils";

import { Icon } from "../icon";

/**
 * Props for the Input component, extending standard HTML input props
 * with additional custom properties for enhanced functionality.
 */
interface InputProps
  extends Omit<React.ComponentProps<"input">, "placeholder" | "size"> {
  /** Optional label text displayed above the input */
  label?: string;
  /** Placeholder text shown when input is focused or has no value */
  placeholder?: string;
  /** Name of the icon to display on the left side of the input */
  leadingIcon?: string;
  /** Name of the icon to display on the right side of the input */
  trailingIcon?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Size variant of the input */
  size?: "small" | "medium" | "large";
  /** Optional description text displayed below the input */
  description?: string;
  /** Optional icon to display alongside the description */
  descriptionIcon?: string;
}

/**
 * A flexible input component with floating labels, icons, and multiple size variants.
 * Supports various states including focus, error, and disabled states.
 *
 * @param props - The props for the Input component
 * @param props.className - Additional CSS classes to apply to the input
 * @param props.type - The type of input (text, email, password, etc.)
 * @param props.label - Optional label that floats above the input when focused/filled
 * @param props.placeholder - Placeholder text shown when input is focused
 * @param props.leadingIcon - Icon displayed on the left side of the input
 * @param props.trailingIcon - Icon displayed on the right side of the input
 * @param props.size - Size variant: "small", "medium", or "large" (default: "medium")
 * @param props.error - Whether the input is in an error state
 * @param props.disabled - Whether the input is disabled
 * @param props.description - Optional description text below the input
 * @param props.descriptionIcon - Optional icon for the description
 * @returns A styled input component with floating label and icon support
 *
 * @example
 * ```tsx
 * // Basic input with label
 * <Input label="Email" type="email" />
 *
 * // Input with icons and description
 * <Input
 *   label="Search"
 *   leadingIcon="search"
 *   trailingIcon="x"
 *   description="Search for items"
 *   descriptionIcon="info"
 * />
 *
 * // Error state input
 * <Input
 *   label="Password"
 *   type="password"
 *   error={true}
 *   description="Password must be at least 8 characters"
 * />
 * ```
 */
function Input({
  className,
  type,
  label,
  placeholder,
  leadingIcon,
  trailingIcon,
  size = "medium",
  error,
  disabled,
  description,
  descriptionIcon,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const isFloating = isFocused || hasValue;

  /**
   * Handles input focus events and updates focus state
   * @param e - The focus event
   */
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  /**
   * Handles input blur events and updates focus state
   * @param e - The blur event
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  /**
   * Handles input change events and updates value state
   * @param e - The change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  React.useEffect(() => {
    const initialValue = props.value || props.defaultValue || "";
    setHasValue(String(initialValue).length > 0);
  }, [props.value, props.defaultValue]);

  // Size configuration
  const sizeConfig = {
    small: {
      container: "h-10",
      input: "h-10 px-6 py-4 text-sm",
      icon: "16px",
      label: { floating: "text-xs", normal: "text-sm" },
    },
    medium: {
      container: "h-12",
      input: "h-12 px-6 py-4 text-base",
      icon: "16px",
      label: { floating: "text-xs", normal: "text-sm font-base" },
    },
    large: {
      container: "h-14",
      input: "h-14 px-6 py-4 text-lg",
      icon: "16px",
      label: { floating: "text-sm", normal: "text-base" },
    },
  };

  // State-based class maps for easier modification
  const stateClasses = {
    border: {
      disabled: "border-gray-200",
      error: "border-red-500",
      focused: "border-orange-500",
      hasValue: "border-gray-400",
      default: "border-gray-200",
    },
    text: {
      disabled: "text-gray-200",
      error: "text-red-500",
      focused: "text-orange-500",
      hasValue: "text-black",
      default: "text-gray-300",
    },
    icon: {
      disabled: "text-gray-200",
      error: "text-red-500",
      default: "text-black",
    },
  };

  /**
   * Determines the current state of the input based on its props and internal state
   * @returns The current state key for styling purposes
   */
  const getCurrentState = () => {
    if (disabled) return "disabled";
    if (error) return "error";
    if (isFocused) return "focused";
    if (hasValue && !isFocused) return "hasValue";
    return "default";
  };

  const currentState = getCurrentState();
  const currentSize = sizeConfig[size];

  /**
   * Generates CSS classes for the floating label based on current state and position
   * @returns Combined CSS classes for the label element
   */
  const getLabelClasses = () => {
    const baseClasses =
      "absolute left-4 text-black transition-all duration-200 ease-in-out pointer-events-none z-10";
    const positionClasses = isFloating
      ? `top-0 left-6 -translate-y-1/2 bg-white px-1 ${currentSize.label.floating}`
      : `top-1/2 -translate-y-1/2 ${currentSize.label.normal}`;
    const iconOffsetClasses = leadingIcon && !isFloating ? "left-12" : "";

    return cn(
      baseClasses,
      positionClasses,
      stateClasses.text[currentState as keyof typeof stateClasses.text],
      iconOffsetClasses
    );
  };

  /**
   * Generates CSS classes for the input element based on current state and configuration
   * @returns Combined CSS classes for the input element
   */
  const getInputClasses = () => {
    const baseClasses =
      "w-full min-w-0 rounded-full border bg-transparent transition-all duration-200 ease-in-out outline-none";
    const stateClasses_input =
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";
    const iconPadding = cn(leadingIcon && "pl-12", trailingIcon && "pr-12");

    return cn(
      baseClasses,
      stateClasses_input,
      currentSize.input,
      stateClasses.border[currentState as keyof typeof stateClasses.border],
      iconPadding,
      className
    );
  };

  /**
   * Generates CSS classes for icon elements based on current state
   * @returns Combined CSS classes for icon elements
   */
  const getIconClasses = () => {
    const iconState = disabled ? "disabled" : error ? "error" : "default";
    return cn(
      "absolute top-1/2 -translate-y-1/2 flex items-center justify-center",
      stateClasses.icon[iconState as keyof typeof stateClasses.icon]
    );
  };

  return (
    <div className="space-y-1.5">
      <div className="relative">
        {label && <label className={getLabelClasses()}>{label}</label>}

        <div className="relative max-w-md">
          {leadingIcon && (
            <div className={cn(getIconClasses(), "left-6")}>
              <Icon name={leadingIcon} size={currentSize.icon} />
            </div>
          )}

          <input
            ref={inputRef}
            type={type}
            data-slot="input"
            placeholder={isFloating ? placeholder : ""}
            className={getInputClasses()}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />

          {trailingIcon && (
            <div className={cn(getIconClasses(), "right-6")}>
              <Icon name={trailingIcon} size={currentSize.icon} />
            </div>
          )}
        </div>
      </div>
      {description && (
        <div
          className={cn(
            "flex items-center gap-1.5 mt-1 text-sm",
            stateClasses.text[currentState as keyof typeof stateClasses.text]
          )}
        >
          {descriptionIcon && <Icon name={descriptionIcon} size="16px" />}
          {description}
        </div>
      )}
    </div>
  );
}

export { Input };
export type { InputProps };
