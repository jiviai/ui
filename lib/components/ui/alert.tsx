import * as React from "react";
import { Icon } from "../icon";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const alertLargeVariants = cva(
  "relative flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 ease-in-out",
  {
    variants: {
      status: {
        default:
          "border-ds-grey-200 bg-ds-primary-100 border border-ds-primary-200",
        success: "border-ds-green-200 bg-ds-green-100",
        warning: "border-ds-yellow-200 bg-ds-yellow-100",
        error: "border-ds-red-200 bg-ds-red-100",
        disabled: "border-ds-grey-200 bg-ds-grey-100",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

const alertSmallVariants = cva(
  "relative flex items-center justify-center gap-3 rounded-t-xl border py-1 px-2 transition-all duration-200 ease-in-out",
  {
    variants: {
      status: {
        default:
          "border-ds-grey-200 bg-ds-primary-100 border border-ds-primary-200",
        success: "border-ds-green-200 bg-ds-green-100",
        warning: "border-ds-yellow-200 bg-ds-yellow-100",
        error: "border-ds-red-200 bg-ds-red-100",
        disabled: "border-ds-grey-200 bg-ds-grey-100",
      },
    },

    defaultVariants: {
      status: "default",
    },
  }
);

/**
 * Props for the Alert component
 */
interface AlertProps {
  /**
   * The size variant of the alert
   */
  variant?: "large" | "small";
  /**
   * The status/state of the alert which determines color scheme and default icon
   */
  status?: "success" | "warning" | "error" | "default" | "disabled";
  /**
   * Additional CSS classes to apply to the alert
   */
  className?: string;
  /**
   * Main heading text displayed prominently
   */
  heading?: string;
  /**
   * Subheading or description text displayed below the heading
   */
  subheading?: string;
  /**
   * Icon name to display on the left side (Material Symbols)
   */
  leftIcon?: string;
  /**
   * Icon variant for the left icon
   */
  leftIconVariant?: "filled" | "outlined";
  /**
   * Callback function when the left icon is clicked
   */
  onLeftIconClick?: () => void;
  /**
   * Icon name to display on the right side (Material Symbols)
   */
  rightIcon?: string;
  /**
   * Icon variant for the right icon
   */
  rightIconVariant?: "filled" | "outlined";
  /**
   * Callback function when the right icon is clicked
   */
  onRightIconClick?: () => void;
  /**
   * Text to display on the action button (always tertiary variant)
   */
  buttonText?: string;
  /**
   * Callback function when the action button is clicked
   */
  onButtonClick?: () => void;
  /**
   * Additional content to display in the alert body
   */
}

/**
 * A versatile alert component for displaying important information with different states and variants
 *
 * @param props - The alert component props
 * @param props.variant - The size variant ("large" | "small")
 * @param props.status - The status/state ("success" | "warning" | "error" | "default" | "disabled")
 * @param props.className - Additional CSS classes to apply
 * @param props.heading - Main heading text
 * @param props.subheading - Subheading or description text
 * @param props.leftIcon - Icon name for the left side (Material Symbols)
 * @param props.leftIconVariant - Icon variant for the left icon
 * @param props.onLeftIconClick - Callback function when the left icon is clicked
 * @param props.rightIcon - Icon name for the right side (Material Symbols)
 * @param props.rightIconVariant - Icon variant for the right icon
 * @param props.onRightIconClick - Callback function when the right icon is clicked
 * @param props.buttonText - Text for the action button (always tertiary)
 * @param props.onButtonClick - Callback for button clicks
 * @param props.onClose - Callback for close button clicks
 * @param props.children - Additional content to display
 * @param ref - Ref to be forwarded to the alert element
 *
 * @returns An alert element with the specified styling and functionality
 *
 * @example
 * ```tsx
 * <Alert
 *   variant="large"
 *   status="success"
 *   heading="Success!"
 *   subheading="Your changes have been saved."
 *   buttonText="Continue"
 *   onButtonClick={() => console.log('Continue')}
 *   onClose={() => console.log('Close')}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Alert
 *   status="error"
 *   heading="Upload Failed"
 *   subheading="Please try again."
 *   leftIcon="error"
 *   buttonText="Retry"
 *   onButtonClick={handleRetry}
 * />
 * ```
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "large",
      status = "default",
      className,
      heading,
      subheading,
      leftIcon,
      leftIconVariant = "outlined",
      onLeftIconClick,
      rightIcon,
      rightIconVariant = "outlined",
      onRightIconClick,
      buttonText,
      onButtonClick,
    }: AlertProps,
    ref
  ) => {
    const getIconColor = () => {
      switch (status) {
        case "success":
          return "text-ds-green-main";
        case "warning":
          return "text-ds-yellow-main";
        case "error":
          return "text-ds-red-main";
        case "default":
          return "text-ds-primary-main";
        case "disabled":
          return "text-ds-grey-500";
        default:
          return "text-ds-grey-500";
      }
    };

    const getHeadingColor = () => {
      switch (status) {
        case "default":
          return "text-ds-primary-main";
        case "success":
          return "text-ds-green-main";
        case "warning":
          return "text-ds-yellow-main";
        case "error":
          return "text-ds-red-main";
        case "disabled":
          return "text-ds-grey-500";
      }
    };

    if (variant === "large") {
      return (
        <div
          className={cn(
            alertLargeVariants({ status }),
            "w-full flex justify-between",
            className
          )}
          ref={ref}
          role="alert"
        >
          <div className="flex items-start gap-3">
            {/* Left Icon */}
            {leftIcon && (
              <div>
                <Icon
                  name={leftIcon}
                  variant={leftIconVariant}
                  size="20px"
                  className={getIconColor()}
                  onClick={onLeftIconClick}
                />
              </div>
            )}

            {/* Content */}
            <div className="-translate-y-0.5">
              {heading && <p className="text-base font-semibold">{heading}</p>}
              {subheading && (
                <p className="text-sm font-normal">{subheading}</p>
              )}
              {buttonText && onButtonClick && (
                <Button
                  variant="tertiary"
                  size={variant === "large" ? "medium" : "small"}
                  onClick={onButtonClick}
                  trailingIcon="chevron_right"
                  trailingIconVariant="outlined"
                  trailingIconSize="20px"
                  className="mt-3"
                  disabled={status === "disabled"}
                >
                  {buttonText}
                </Button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div>
            {rightIcon && (
              <Icon
                name={rightIcon}
                variant={rightIconVariant}
                size="20px"
                className={cn(
                  getIconColor(),
                  "cursor-pointer hover:opacity-70"
                )}
                onClick={onRightIconClick}
              />
            )}
          </div>
        </div>
      );
    }

    if (variant === "small") {
      return (
        <div className={cn(alertSmallVariants({ status }), className)}>
          {leftIcon && (
            <Icon
              name={leftIcon}
              variant={leftIconVariant}
              size="20px"
              className={getIconColor()}
              onClick={onLeftIconClick}
            />
          )}
          {heading && (
            <p className={cn(getHeadingColor(), "text-sm font-semibold")}>
              {heading}
            </p>
          )}
        </div>
      );
    }
  }
);

Alert.displayName = "Alert";

export { Alert };
