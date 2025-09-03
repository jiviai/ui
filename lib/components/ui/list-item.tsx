import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import { Button } from "./button";
import { Badge } from "./badge";

/**
 * List item variant styles using class-variance-authority
 * Creates consistent list item styling with different variants
 */
const listItemVariants = cva(
  "flex items-center gap-3 p-4 transition-all duration-200 ease-in-out",
  {
    variants: {
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      clickable: false,
      disabled: false,
    },
  }
);

/**
 * Left section type variants
 */
type LeftSectionType =
  | "empty"
  | "small-icon"
  | "large-icon"
  | "small-image"
  | "large-image"
  | "checkbox"
  | "radio";

/**
 * Button alignment options for middle section
 */
type ButtonAlignment = "horizontal" | "vertical";

/**
 * Props for the ListItem component
 */
interface ListItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof listItemVariants> {
  // Left section props
  /**
   * Type of left section content
   */
  leftType?: LeftSectionType;
  /**
   * Icon name for left section (when leftType is "small-icon" or "large-icon")
   */
  leftIcon?: string;
  /**
   * Icon variant for left section
   */
  leftIconVariant?: "filled" | "outlined";
  /**
   * Icon size for left section
   */
  leftIconSize?: string;
  /**
   * Background color for large icon container
   */
  leftIconBackgroundColor?: string;
  /**
   * Image source for left section (when leftType is "small-image" or "large-image")
   */
  leftImageSrc?: string;
  /**
   * Image alt text for left section
   */
  leftImageAlt?: string;
  /**
   * Checkbox checked state (when leftType is "checkbox")
   */
  leftCheckboxChecked?: boolean;
  /**
   * Checkbox change handler (when leftType is "checkbox")
   */
  leftCheckboxOnChange?: (checked: boolean) => void;
  /**
   * Checkbox disabled state (when leftType is "checkbox")
   */
  leftCheckboxDisabled?: boolean;
  /**
   * Radio button selected state (when leftType is "radio")
   */
  leftRadioSelected?: boolean;
  /**
   * Radio button change handler (when leftType is "radio")
   */
  leftRadioOnChange?: (selected: boolean) => void;
  /**
   * Radio button disabled state (when leftType is "radio")
   */
  leftRadioDisabled?: boolean;
  /**
   * Radio button name attribute (when leftType is "radio")
   */
  leftRadioName?: string;

  // Middle section props (required)
  /**
   * Title text (required)
   */
  title: string;
  /**
   * Description text (optional)
   */
  description?: string;
  /**
   * Button text for middle section
   */
  buttonText?: string;
  /**
   * Button click handler for middle section
   */
  onButtonClick?: () => void;
  /**
   * Button disabled state for middle section
   */
  buttonDisabled?: boolean;
  /**
   * Button alignment when both title/description and button are present
   */
  buttonAlignment?: ButtonAlignment;
  /**
   * Leading icon for middle section button
   */
  buttonLeadingIcon?: string;
  /**
   * Leading icon variant for middle section button
   */
  buttonLeadingIconVariant?: "filled" | "outlined";
  /**
   * Leading icon size for middle section button
   */
  buttonLeadingIconSize?: string;
  /**
   * Trailing icon for middle section button
   */
  buttonTrailingIcon?: string;
  /**
   * Trailing icon variant for middle section button
   */
  buttonTrailingIconVariant?: "filled" | "outlined";
  /**
   * Trailing icon size for middle section button
   */
  buttonTrailingIconSize?: string;

  // Right section props
  /**
   * Right section icon name
   */
  rightIcon?: string;
  /**
   * Right section icon variant
   */
  rightIconVariant?: "filled" | "outlined";
  /**
   * Right section icon size
   */
  rightIconSize?: string;
  /**
   * Status title for right section
   */
  rightStatusTitle?: string;
  /**
   * Badge text for right section status
   */
  rightBadgeText?: string;
  /**
   * Badge variant for right section status
   */
  rightBadgeVariant?: "default" | "light" | "dark" | "outline";
  /**
   * Badge status for right section status
   */
  rightBadgeStatus?: "success" | "warning" | "error" | "inactive" | "default";
  /**
   * Icon name for right section badge
   */
  rightBadgeIcon?: string;
  /**
   * Icon variant for right section badge
   */
  rightBadgeIconVariant?: "filled" | "outlined";
  /**
   * Icon size for right section badge
   */
  rightBadgeIconSize?: string;

  // General props
  /**
   * Whether the list item is clickable
   */
  clickable?: boolean;
  /**
   * Whether the list item is disabled
   */
  disabled?: boolean;
  /**
   * Click handler for the list item (only works when clickable is true)
   */
  onClick?: () => void;
  /**
   * Additional CSS classes to apply to the list item
   */
  className?: string;
}

/**
 * Renders the left section of the list item based on props
 */
const LeftSection: React.FC<{
  leftType?: LeftSectionType;
  leftIcon?: string;
  leftIconVariant?: "filled" | "outlined";
  leftIconSize?: string;
  leftIconBackgroundColor?: string;
  leftImageSrc?: string;
  leftImageAlt?: string;
  leftCheckboxChecked?: boolean;
  leftCheckboxOnChange?: (checked: boolean) => void;
  leftCheckboxDisabled?: boolean;
  leftRadioSelected?: boolean;
  leftRadioOnChange?: (selected: boolean) => void;
  leftRadioDisabled?: boolean;
  leftRadioName?: string;
}> = ({
  leftType,
  leftIcon,
  leftIconVariant = "outlined",
  leftIconSize,
  leftImageSrc,
  leftImageAlt,
  leftCheckboxChecked,
  leftCheckboxOnChange,
  leftCheckboxDisabled,
  leftRadioSelected,
  leftRadioOnChange,
  leftRadioDisabled,
  leftRadioName,
}) => {
  if (!leftType || leftType === "empty") {
    return null;
  }

  switch (leftType) {
    case "small-icon":
      if (!leftIcon) return null;
      return (
        <div className="flex-shrink-0">
          <Icon
            name={leftIcon}
            variant={leftIconVariant}
            size={leftIconSize || "20px"}
          />
        </div>
      );

    case "large-icon":
      if (!leftIcon) return null;
      return (
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
            "bg-primary-100 text-primary-main"
          )}
        >
          <Icon
            name={leftIcon}
            variant={leftIconVariant}
            size={leftIconSize || "24px"}
          />
        </div>
      );

    case "small-image":
      if (!leftImageSrc) return null;
      return (
        <div className="flex-shrink-0">
          <img
            src={leftImageSrc}
            alt={leftImageAlt || ""}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      );

    case "large-image":
      if (!leftImageSrc) return null;
      return (
        <div className="flex-shrink-0">
          <img
            src={leftImageSrc}
            alt={leftImageAlt || ""}
            className="w-10 h-10 rounded-xl object-cover"
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="flex-shrink-0">
          <div className="relative flex items-center justify-center w-4 h-4 transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:ring-offset-2">
            <input
              type="checkbox"
              checked={leftCheckboxChecked || false}
              onChange={(e) => leftCheckboxOnChange?.(e.target.checked)}
              disabled={leftCheckboxDisabled}
              className="sr-only"
            />
            <div
              className={cn(
                "absolute inset-0 rounded border-2 transition-all duration-200 ease-in-out cursor-pointer",
                leftCheckboxChecked
                  ? "border-orange-500 bg-orange-500"
                  : "border-gray-300 bg-white",
                leftCheckboxDisabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() =>
                !leftCheckboxDisabled &&
                leftCheckboxOnChange?.(!leftCheckboxChecked)
              }
            />
            {leftCheckboxChecked && (
              <div className="relative z-10 text-white">
                <Icon name="check" size="12px" variant="outlined" />
              </div>
            )}
          </div>
        </div>
      );

    case "radio":
      return (
        <div className="flex-shrink-0">
          <div className="relative flex items-center justify-center w-4 h-4 transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:ring-offset-2">
            <input
              type="radio"
              name={leftRadioName}
              checked={leftRadioSelected || false}
              onChange={(e) => leftRadioOnChange?.(e.target.checked)}
              disabled={leftRadioDisabled}
              className="sr-only"
            />
            <div
              className={cn(
                "absolute inset-0 rounded-full border-2 transition-all duration-200 ease-in-out cursor-pointer",
                leftRadioSelected
                  ? "border-orange-500 bg-white"
                  : "border-gray-300 bg-white",
                leftRadioDisabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() =>
                !leftRadioDisabled && leftRadioOnChange?.(!leftRadioSelected)
              }
            />
            {leftRadioSelected && (
              <div className="w-2 h-2 rounded-full bg-orange-500 transition-all duration-200 ease-in-out" />
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
};

/**
 * Renders the middle section of the list item based on props
 */
const MiddleSection: React.FC<{
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
  buttonAlignment?: ButtonAlignment;
  buttonLeadingIcon?: string;
  buttonLeadingIconVariant?: "filled" | "outlined";
  buttonLeadingIconSize?: string;
  buttonTrailingIcon?: string;
  buttonTrailingIconVariant?: "filled" | "outlined";
  buttonTrailingIconSize?: string;
}> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  buttonDisabled,
  buttonAlignment = "horizontal",
  buttonLeadingIcon,
  buttonLeadingIconVariant,
  buttonLeadingIconSize,
  buttonTrailingIcon,
  buttonTrailingIconVariant,
  buttonTrailingIconSize,
}) => {
  const hasButton = buttonText;

  if (!hasButton) {
    // Title only or title with description
    return (
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">
          {title}
        </div>
        {description && (
          <div className="text-sm text-gray-600 truncate mt-0.5">
            {description}
          </div>
        )}
      </div>
    );
  }

  if (buttonAlignment === "horizontal") {
    // Title/description with button horizontally aligned
    return (
      <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {title}
          </div>
          {description && (
            <div className="text-sm text-gray-600 truncate mt-0.5">
              {description}
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <Button
            variant="tertiary"
            size="small"
            onClick={onButtonClick}
            disabled={buttonDisabled}
            leadingIcon={buttonLeadingIcon}
            leadingIconVariant={buttonLeadingIconVariant}
            leadingIconSize={buttonLeadingIconSize}
            trailingIcon={buttonTrailingIcon}
            trailingIconVariant={buttonTrailingIconVariant}
            trailingIconSize={buttonTrailingIconSize}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  // Title/description with button vertically aligned
  return (
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium text-gray-900 truncate">{title}</div>
      {description && (
        <div className="text-sm text-gray-600 truncate mt-0.5">
          {description}
        </div>
      )}
      <div className="mt-0.5">
        <Button
          variant="tertiary"
          size="small"
          onClick={onButtonClick}
          disabled={buttonDisabled}
          leadingIcon={buttonLeadingIcon}
          leadingIconVariant={buttonLeadingIconVariant}
          leadingIconSize={buttonLeadingIconSize}
          trailingIcon={buttonTrailingIcon}
          trailingIconVariant={buttonTrailingIconVariant}
          trailingIconSize={buttonTrailingIconSize}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

/**
 * Renders the right section of the list item based on props
 */
const RightSection: React.FC<{
  rightIcon?: string;
  rightIconVariant?: "filled" | "outlined";
  rightIconSize?: string;
  rightStatusTitle?: string;
  rightBadgeText?: string;
  rightBadgeVariant?: "default" | "light" | "dark" | "outline";
  rightBadgeStatus?: "success" | "warning" | "error" | "inactive" | "default";
  rightBadgeIcon?: string;
  rightBadgeIconVariant?: "filled" | "outlined";
  rightBadgeIconSize?: string;
}> = ({
  rightIcon,
  rightIconVariant = "outlined",
  rightIconSize = "20px",
  rightStatusTitle,
  rightBadgeText,
  rightBadgeVariant = "light",
  rightBadgeStatus = "default",
  rightBadgeIcon,
  rightBadgeIconVariant = "outlined",
  rightBadgeIconSize,
}) => {
  const hasIcon = rightIcon;
  const hasStatus = rightStatusTitle && rightBadgeText;

  if (hasIcon) {
    return (
      <div className="flex-shrink-0">
        <Icon
          name={rightIcon}
          variant={rightIconVariant}
          size={rightIconSize}
        />
      </div>
    );
  }

  if (hasStatus) {
    return (
      <div className="flex-shrink-0 flex flex-col items-end gap-1">
        <div className="text-sm font-medium text-gray-900">
          {rightStatusTitle}
        </div>
        <Badge
          variant={rightBadgeVariant}
          status={rightBadgeStatus}
          size="sm"
          icon={rightBadgeIcon}
          iconVariant={rightBadgeIconVariant}
          iconSize={rightBadgeIconSize}
        >
          {rightBadgeText}
        </Badge>
      </div>
    );
  }

  return null;
};

/**
 * A versatile list item component with configurable left, middle, and right sections
 *
 * @param props - The list item component props
 * @param props.title - Title text (required)
 * @param props.description - Description text (optional)
 * @param props.leftType - Type of left section content
 * @param props.leftIcon - Icon name for left section
 * @param props.rightIcon - Right section icon name
 * @param props.rightStatusTitle - Status title for right section
 * @param props.rightBadgeText - Badge text for right section status
 * @param props.buttonLeadingIcon - Leading icon for middle section button
 * @param props.buttonLeadingIconVariant - Leading icon variant for middle section button
 * @param props.buttonLeadingIconSize - Leading icon size for middle section button
 * @param props.buttonTrailingIcon - Trailing icon for middle section button
 * @param props.buttonTrailingIconVariant - Trailing icon variant for middle section button
 * @param props.buttonTrailingIconSize - Trailing icon size for middle section button
 * @param props.rightBadgeIcon - Icon name for right section badge
 * @param props.rightBadgeIconVariant - Icon variant for right section badge
 * @param props.rightBadgeIconSize - Icon size for right section badge
 * @param props.clickable - Whether the list item is clickable
 * @param props.disabled - Whether the list item is disabled
 * @param props.onClick - Click handler for the list item
 * @param props.className - Additional CSS classes to apply
 *
 * @returns A list item element with the specified sections and functionality
 *
 * @example
 * ```tsx
 * <ListItem
 *   leftType="large-icon"
 *   leftIcon="person"
 *   title="John Doe"
 *   description="Software Engineer"
 *   buttonText="Download"
 *   buttonLeadingIcon="download"
 *   buttonTrailingIcon="arrow_forward"
 *   onButtonClick={() => handleDownload()}
 *   rightStatusTitle="Active"
 *   rightBadgeText="Online"
 *   rightBadgeStatus="success"
 *   rightBadgeIcon="check_circle"
 *   rightBadgeIconVariant="filled"
 *   clickable
 *   onClick={() => console.log("Clicked!")}
 * />
 * ```
 */
const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      className,
      // Left section props
      leftType,
      leftIcon,
      leftIconVariant,
      leftIconSize,
      leftIconBackgroundColor,
      leftImageSrc,
      leftImageAlt,
      leftCheckboxChecked,
      leftCheckboxOnChange,
      leftCheckboxDisabled,
      leftRadioSelected,
      leftRadioOnChange,
      leftRadioDisabled,
      leftRadioName,
      // Middle section props
      title,
      description,
      buttonText,
      onButtonClick,
      buttonDisabled,
      buttonAlignment,
      buttonLeadingIcon,
      buttonLeadingIconVariant,
      buttonLeadingIconSize,
      buttonTrailingIcon,
      buttonTrailingIconVariant,
      buttonTrailingIconSize,
      // Right section props
      rightIcon,
      rightIconVariant,
      rightIconSize,
      rightStatusTitle,
      rightBadgeText,
      rightBadgeVariant,
      rightBadgeStatus,
      rightBadgeIcon,
      rightBadgeIconVariant,
      rightBadgeIconSize,
      // General props
      clickable = false,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (clickable && !disabled && onClick) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (clickable && !disabled && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(listItemVariants({ clickable, disabled }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={clickable && !disabled ? 0 : -1}
        role={clickable ? "button" : undefined}
        data-slot="list-item"
        {...props}
      >
        <LeftSection
          leftType={leftType}
          leftIcon={leftIcon}
          leftIconVariant={leftIconVariant}
          leftIconSize={leftIconSize}
          leftIconBackgroundColor={leftIconBackgroundColor}
          leftImageSrc={leftImageSrc}
          leftImageAlt={leftImageAlt}
          leftCheckboxChecked={leftCheckboxChecked}
          leftCheckboxOnChange={leftCheckboxOnChange}
          leftCheckboxDisabled={leftCheckboxDisabled}
          leftRadioSelected={leftRadioSelected}
          leftRadioOnChange={leftRadioOnChange}
          leftRadioDisabled={leftRadioDisabled}
          leftRadioName={leftRadioName}
        />
        <MiddleSection
          title={title}
          description={description}
          buttonText={buttonText}
          onButtonClick={onButtonClick}
          buttonDisabled={buttonDisabled}
          buttonAlignment={buttonAlignment}
          buttonLeadingIcon={buttonLeadingIcon}
          buttonLeadingIconVariant={buttonLeadingIconVariant}
          buttonLeadingIconSize={buttonLeadingIconSize}
          buttonTrailingIcon={buttonTrailingIcon}
          buttonTrailingIconVariant={buttonTrailingIconVariant}
          buttonTrailingIconSize={buttonTrailingIconSize}
        />
        <RightSection
          rightIcon={rightIcon}
          rightIconVariant={rightIconVariant}
          rightIconSize={rightIconSize}
          rightStatusTitle={rightStatusTitle}
          rightBadgeText={rightBadgeText}
          rightBadgeVariant={rightBadgeVariant}
          rightBadgeStatus={rightBadgeStatus}
          rightBadgeIcon={rightBadgeIcon}
          rightBadgeIconVariant={rightBadgeIconVariant}
          rightBadgeIconSize={rightBadgeIconSize}
        />
      </div>
    );
  }
);

ListItem.displayName = "ListItem";

export { ListItem, listItemVariants };
export type { ListItemProps, LeftSectionType, ButtonAlignment };
