/**
 * Header Component
 * 
 * App header component with mandatory header text and optional interactive elements.
 * Supports back button, text button, and up to two icon buttons.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import { Button } from "./button";
import { IconButton } from "./icon-button";

/**
 * Header container variant styles
 */
const headerVariants = cva(
  "flex items-center justify-between w-full relative overflow-hidden min-w-0 box-border",
  {
    variants: {
      size: {
        small: "h-12 px-2.5 sm:px-3 md:px-4 lg:px-5",
        medium: "h-14 px-3 sm:px-4 md:px-5 lg:px-6",
        large: "h-16 px-3.5 sm:px-4 md:px-5 lg:px-6 xl:px-7",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

/**
 * Header text variant styles
 */
const headerTextVariants = cva(
  "font-semibold text-ds-grey-900 whitespace-nowrap",
  {
    variants: {
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

/**
 * Props for the Header component
 */
interface HeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof headerVariants> {
  /** Optional header text. Can be a string or React node for styled text */
  title?: React.ReactNode;
  /** Size variant for the header */
  size?: "small" | "medium" | "large";
  /** Optional back button icon (string) or boolean to show default arrow */
  backButton?: boolean | string;
  /** Optional callback when back button is clicked */
  onBackClick?: () => void;
  /** Optional text for the button */
  buttonText?: string;
  /** Optional button variant */
  buttonVariant?: "primary" | "secondary" | "tertiary";
  /** Optional callback when button is clicked */
  onButtonClick?: () => void;
  /** Optional primary icon name */
  primaryIcon?: string;
  /** Optional primary icon variant */
  primaryIconVariant?: "filled" | "outlined";
  /** Optional callback when primary icon is clicked */
  onPrimaryIconClick?: () => void;
  /** Optional secondary icon name */
  secondaryIcon?: string;
  /** Optional secondary icon variant */
  secondaryIconVariant?: "filled" | "outlined";
  /** Optional callback when secondary icon is clicked */
  onSecondaryIconClick?: () => void;
  /** Optional class name for the header */
  className?: string;
}

/**
 * A flexible header component for app pages with mandatory title and optional interactive elements.
 */
const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      className,
      title,
      size = "medium",
      backButton,
      onBackClick,
      buttonText,
      buttonVariant = "tertiary",
      onButtonClick,
      primaryIcon,
      primaryIconVariant = "filled",
      onPrimaryIconClick,
      secondaryIcon,
      secondaryIconVariant = "filled",
      onSecondaryIconClick,
      ...props
    },
    ref
  ) => {
    // Determine icon size based on header size
    const getIconSize = () => {
      switch (size) {
        case "small":
          return "0.875rem";
        case "large":
          return "1.5rem";
        case "medium":
        default:
          return "1rem";
      }
    };

    // Get button and icon button size - make them more proportional to header
    const getButtonSize = () => {
      switch (size) {
        case "small":
          return "small";
        case "large":
          return "medium";
        case "medium":
        default:
          return "small";
      }
    };

    // Get custom height classes for more proportional sizing
    const getButtonHeightClass = () => {
      switch (size) {
        case "small":
          return "h-8"; // 32px for h-12 header (67%)
        case "large":
          return "h-11"; // 44px for h-16 header (69%)
        case "medium":
        default:
          return "h-9"; // 36px for h-14 header (64%)
      }
    };

    const getIconButtonSizeClass = () => {
      switch (size) {
        case "small":
          return "h-8 w-8"; // 32px for h-12 header
        case "large":
          return "h-11 w-11"; // 44px for h-16 header
        case "medium":
        default:
          return "h-9 w-9"; // 36px for h-14 header
      }
    };

    // Get back button icon
    const getBackButtonIcon = () => {
      if (typeof backButton === "string") return backButton;
      if (backButton === true) return "arrow_back";
      return null;
    };

    const backIcon = getBackButtonIcon();

    return (
      <div
        ref={ref}
        data-slot="header"
        className={cn(headerVariants({ size }), className)}
        {...props}
      >
        {/* Left Section - Back Button and Title */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-1 min-w-0 pr-1.5 sm:pr-2 md:pr-3 lg:pr-4 overflow-hidden box-border">
          {backIcon && (
            <button
              type="button"
              onClick={onBackClick}
              className="inline-flex items-center justify-center p-1 sm:p-1.5 md:p-2 rounded-full hover:bg-ds-grey-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ds-orange-500 focus-visible:ring-offset-2 flex-shrink-0 box-border"
              aria-label="Go back"
            >
              <Icon
                name={backIcon}
                variant="outlined"
                size={getIconSize()}
              />
            </button>
          )}
          {title && (
            <h1 className={cn(headerTextVariants({ size }), "truncate text-left min-w-0 flex-1 overflow-hidden")}>
              {title}
            </h1>
          )}
        </div>

        {/* Right Section - Text Button and/or Icon Buttons */}
        <div className="flex items-center justify-end gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0 ml-1.5 sm:ml-2 md:ml-3 box-border">
          {buttonText && (
            <Button
              variant={buttonVariant}
              size={getButtonSize()}
              onClick={onButtonClick}
              className={cn(
                getButtonHeightClass(),
                "max-w-[7.5rem] sm:max-w-[9.375rem] md:max-w-[11.25rem] lg:max-w-[12.5rem] xl:max-w-none truncate box-border"
              )}
            >
              <span className="truncate block">{buttonText}</span>
            </Button>
          )}
          {primaryIcon && (
            <IconButton
              iconName={primaryIcon}
              iconVariant="filled"
              iconSize={getIconSize()}
              variant={primaryIconVariant === "outlined" ? "secondary" : "primary"}
              size={getButtonSize()}
              onClick={onPrimaryIconClick}
              className={cn(
                getIconButtonSizeClass(),
                "flex-shrink-0 box-border",
                primaryIconVariant === "outlined"
                  ? "bg-ds-orange-50 border-ds-orange-300 text-ds-orange-500"
                  : ""
              )}
            />
          )}
          {secondaryIcon && (
            <IconButton
              iconName={secondaryIcon}
              iconVariant="filled"
              iconSize={getIconSize()}
              variant={secondaryIconVariant === "outlined" ? "secondary" : "primary"}
              size={getButtonSize()}
              onClick={onSecondaryIconClick}
              className={cn(
                getIconButtonSizeClass(),
                "flex-shrink-0 box-border",
                secondaryIconVariant === "outlined"
                  ? "bg-ds-orange-50 border-ds-orange-300 text-ds-orange-500"
                  : ""
              )}
            />
          )}
        </div>
      </div>
    );
  }
);

Header.displayName = "Header";

export { Header, headerVariants, headerTextVariants };
export type { HeaderProps };
