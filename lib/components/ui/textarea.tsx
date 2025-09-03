import * as React from "react";

import { cn } from "@/lib/utils";

import { Icon } from "../icon";

/**
 * Props for the Textarea component, extending standard HTML textarea props
 * with additional custom properties for enhanced functionality.
 */
interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "placeholder" | "size"> {
  /** Optional label text displayed above the textarea */
  label?: string;
  /** Placeholder text shown when textarea is focused or has no value */
  placeholder?: string;
  /** Name of the icon to display on the left side of the textarea */
  leadingIcon?: string;
  /** Size of the icon to display on the left side of the textarea */
  leadingIconSize?: string;
  /** Variant of the icon to display on the left side of the textarea */
  leadingIconVariant?: "filled" | "outlined";
  /** Name of the icon to display on the right side of the textarea */
  trailingIcon?: string;
  /** Size of the icon to display on the right side of the textarea */
  trailingIconSize?: string;
  /** Variant of the icon to display on the right side of the textarea */
  trailingIconVariant?: "filled" | "outlined";
  /** Callback function when the leading icon is clicked */
  onLeadingIconClick?: () => void;
  /** Callback function when the trailing icon is clicked */
  onTrailingIconClick?: () => void;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea is in an error state */
  error?: boolean;
  /** Size variant of the textarea */
  size?: "small" | "medium" | "large";
  /** Optional description text displayed below the textarea */
  description?: string;
  /** Optional icon to display alongside the description */
  descriptionIcon?: string;
}

/**
 * A flexible textarea component with floating labels, icons, and multiple size variants.
 * Supports various states including focus, error, and disabled states.
 *
 * @param props - The props for the Textarea component
 * @param props.className - Additional CSS classes to apply to the textarea
 * @param props.label - Optional label that floats above the textarea when focused/filled
 * @param props.placeholder - Placeholder text shown when textarea is focused
 * @param props.leadingIcon - Icon displayed on the left side of the textarea
 * @param props.leadingIconSize - Size of the icon displayed on the left side of the textarea
 * @param props.leadingIconVariant - Variant of the icon displayed on the left side of the textarea
 * @param props.trailingIcon - Icon displayed on the right side of the textarea
 * @param props.trailingIconSize - Size of the icon displayed on the right side of the textarea
 * @param props.trailingIconVariant - Variant of the icon displayed on the right side of the textarea
 * @param props.onLeadingIconClick - Callback function when the leading icon is clicked
 * @param props.onTrailingIconClick - Callback function when the trailing icon is clicked
 * @param props.size - Size variant: "small", "medium", or "large" (default: "medium")
 * @param props.error - Whether the textarea is in an error state
 * @param props.disabled - Whether the textarea is disabled
 * @param props.description - Optional description text below the textarea
 * @param props.descriptionIcon - Optional icon for the description
 * @param ref - Ref to be forwarded to the textarea element
 * @returns A styled textarea component with floating label and icon support
 *
 * @example
 * ```tsx
 * // Basic textarea with label
 * <Textarea label="Message" />
 *
 * // Textarea with icons and description
 * <Textarea
 *   label="Comments"
 *   leadingIcon="message"
 *   leadingIconSize="20px"
 *   leadingIconVariant="outlined"
 *   onLeadingIconClick={() => console.log('Message clicked')}
 *   trailingIcon="x"
 *   trailingIconSize="16px"
 *   trailingIconVariant="filled"
 *   onTrailingIconClick={() => console.log('Clear clicked')}
 *   description="Share your thoughts"
 *   descriptionIcon="info"
 * />
 *
 * // Error state textarea
 * <Textarea
 *   label="Feedback"
 *   error={true}
 *   description="Please provide valid feedback"
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
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
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Merge internal ref with forwarded ref
    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
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
     * Handles textarea focus events and updates focus state
     * @param e - The focus event
     */
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    /**
     * Handles textarea blur events and updates focus state
     * @param e - The blur event
     */
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    /**
     * Handles textarea change events and updates value state
     * Always updates internal state first, then calls user's onChange
     * @param e - The change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Update our internal state based on the current textarea value
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

    // Additional safeguard: sync with actual textarea value if it gets out of sync
    React.useEffect(() => {
      if (textareaRef.current) {
        const actualValue = textareaRef.current.value;
        const actualHasValue = actualValue.length > 0;
        if (actualHasValue !== hasValue) {
          setHasValue(actualHasValue);
        }
      }
    });

    // Size configuration
    const sizeConfig = {
      small: {
        container: "min-h-20",
        textarea: "min-h-20 px-6 py-4 text-sm",
        icon: "16px",
        label: { floating: "text-xs", normal: "text-sm" },
      },
      medium: {
        container: "min-h-24",
        textarea: "min-h-24 px-6 py-4 text-base",
        icon: "16px",
        label: { floating: "text-xs", normal: "text-sm font-base" },
      },
      large: {
        container: "min-h-28",
        textarea: "min-h-28 px-6 py-4 text-lg",
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
        default: "text-gray-400",
      },
      icon: {
        disabled: "text-gray-200",
        error: "text-red-500",
        default: "text-black",
      },
    };

    /**
     * Determines the current state of the textarea based on its props and internal state
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
        : `top-4 ${currentSize.label.normal}`;
      const iconOffsetClasses = leadingIcon && !isFloating ? "left-12" : "";

      return cn(
        baseClasses,
        positionClasses,
        stateClasses.text[currentState as keyof typeof stateClasses.text],
        iconOffsetClasses
      );
    };

    /**
     * Generates CSS classes for the textarea element based on current state and configuration
     * @returns Combined CSS classes for the textarea element
     */
    const getTextareaClasses = () => {
      const baseClasses =
        "w-full min-w-0 rounded-lg border bg-transparent transition-all duration-200 ease-in-out outline-none resize-y";
      const stateClasses_textarea =
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";
      const iconPadding = cn(leadingIcon && "pl-12", trailingIcon && "pr-12");

      return cn(
        baseClasses,
        stateClasses_textarea,
        currentSize.textarea,
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
        "absolute top-4 flex items-center justify-center",
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

            <textarea
              ref={mergedRef}
              data-slot="textarea"
              placeholder={isFloating ? placeholder : ""}
              className={getTextareaClasses()}
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

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
