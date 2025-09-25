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
  /** Size of the icon to display on the left side of the input */
  leadingIconSize?: string;
  /** Variant of the icon to display on the left side of the input */
  leadingIconVariant?: "filled" | "outlined";
  /** Name of the icon to display on the right side of the input */
  trailingIcon?: string;
  /** Size of the icon to display on the right side of the input */
  trailingIconSize?: string;
  /** Variant of the icon to display on the right side of the input */
  trailingIconVariant?: "filled" | "outlined";
  /** Callback function when the leading icon is clicked */
  onLeadingIconClick?: () => void;
  /** Callback function when the trailing icon is clicked */
  onTrailingIconClick?: () => void;
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
 * @param props.leadingIconSize - Size of the icon displayed on the left side of the input
 * @param props.leadingIconVariant - Variant of the icon displayed on the left side of the input
 * @param props.trailingIcon - Icon displayed on the right side of the input
 * @param props.trailingIconSize - Size of the icon displayed on the right side of the input
 * @param props.trailingIconVariant - Variant of the icon displayed on the right side of the input
 * @param props.onLeadingIconClick - Callback function when the leading icon is clicked
 * @param props.onTrailingIconClick - Callback function when the trailing icon is clicked
 * @param props.size - Size variant: "small", "medium", or "large" (default: "medium")
 * @param props.error - Whether the input is in an error state
 * @param props.disabled - Whether the input is disabled
 * @param props.description - Optional description text below the input
 * @param props.descriptionIcon - Optional icon for the description
 * @param ref - Ref to be forwarded to the input element
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
 *   leadingIconSize="20px"
 *   leadingIconVariant="outlined"
 *   onLeadingIconClick={() => console.log('Search clicked')}
 *   trailingIcon="x"
 *   trailingIconSize="16px"
 *   trailingIconVariant="filled"
 *   onTrailingIconClick={() => console.log('Clear clicked')}
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
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      placeholder,
      leadingIcon,
      leadingIconSize,
      leadingIconVariant = "outlined",
      onLeadingIconClick,
      trailingIcon,
      trailingIconSize,
      trailingIconVariant = "outlined",
      onTrailingIconClick,
      size = "medium",
      error,
      disabled,
      description,
      descriptionIcon,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const inputRef = React.useRef<HTMLInputElement>(null);

    // Merge internal ref with forwarded ref
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const isFloating = isFocused || hasValue;

    /**
     * Handles input focus events and updates focus state
     * @param e - The focus event
     */
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    /**
     * Handles input blur events and updates focus state
     * @param e - The blur event
     */
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    /**
     * Handles input change events and updates value state
     * Always updates internal state first, then calls user's onChange
     * @param e - The change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update our internal state based on the current input value
      setHasValue(e.target.value.length > 0);

      // Call the user's onChange handler if provided
      props.onChange?.(e);
    };

    // Sync internal state with prop value changes (for controlled components)
    React.useEffect(() => {
      if (props.value !== undefined) {
        // For controlled components, sync with the value prop
        setHasValue(String(props.value).length > 0);
      } else if (props.defaultValue !== undefined) {
        // For uncontrolled components, only set initial value once
        setHasValue(String(props.defaultValue).length > 0);
      }
    }, [props.value, props.defaultValue]);

    // Additional safeguard: sync with actual input value if it gets out of sync
    React.useEffect(() => {
      if (inputRef.current) {
        const actualValue = inputRef.current.value;
        const actualHasValue = actualValue.length > 0;
        if (actualHasValue !== hasValue) {
          setHasValue(actualHasValue);
        }
      }
    });

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
        disabled: "border-ds-grey-200",
        error: "border-ds-red-500",
        focused: "border-ds-orange-500",
        hasValue: "border-ds-grey-400",
        default: "border-ds-grey-200",
      },
      text: {
        disabled: "text-ds-grey-200",
        error: "text-ds-red-500",
        focused: "text-ds-orange-500",
        hasValue: "text-black",
        default: "text-ds-grey-300",
      },
      icon: {
        disabled: "text-ds-grey-200",
        error: "text-ds-red-500",
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
              <div
                className={cn(
                  getIconClasses(),
                  "left-6",
                  onLeadingIconClick &&
                    !disabled &&
                    "cursor-pointer hover:opacity-70 transition-opacity"
                )}
                onClick={
                  onLeadingIconClick && !disabled
                    ? onLeadingIconClick
                    : undefined
                }
              >
                <Icon
                  name={leadingIcon}
                  size={leadingIconSize || currentSize.icon}
                  variant={leadingIconVariant}
                />
              </div>
            )}

            <input
              ref={mergedRef}
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
              <div
                className={cn(
                  getIconClasses(),
                  "right-6",
                  onTrailingIconClick &&
                    !disabled &&
                    "cursor-pointer hover:opacity-70 transition-opacity"
                )}
                onClick={
                  onTrailingIconClick && !disabled
                    ? onTrailingIconClick
                    : undefined
                }
              >
                <Icon
                  name={trailingIcon}
                  size={trailingIconSize || currentSize.icon}
                  variant={trailingIconVariant}
                />
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
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
