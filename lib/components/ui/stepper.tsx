/**
 * Stepper Component
 * 
 * A flexible stepper component for multi-step workflows with state management.
 * Supports horizontal and vertical orientations, custom indicators, and content panels.
 */

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

/**
 * Stepper Context
 */
interface StepperContextValue {
  value: number;
  onValueChange?: (value: number) => void;
  variant?: "horizontal" | "vertical";
  indicators?: {
    completed?: React.ReactNode;
    loading?: React.ReactNode;
  };
  clickable?: boolean;
  totalSteps?: number;
  size?: "sm" | "md" | "lg";
  showConnector?: boolean;
  completedColor?: "orange" | "green";
}

const StepperContext = React.createContext<StepperContextValue>({
  value: 1,
  variant: "horizontal",
  clickable: false,
  size: "md",
  showConnector: true,
  completedColor: "green",
});

/**
 * Stepper Props
 */
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current active step (1-indexed)
   */
  value: number;
  /**
   * Callback when step value changes
   */
  onValueChange?: (value: number) => void;
  /**
   * Layout variant
   * @default "horizontal"
   */
  variant?: "horizontal" | "vertical";
  /**
   * Custom indicators for different states
   */
  indicators?: {
    completed?: React.ReactNode;
    loading?: React.ReactNode;
  };
  /**
   * Allow clicking on any step to navigate (non-linear navigation)
   * @default false
   */
  clickable?: boolean;
  /**
   * Total number of steps (optional, useful for validation)
   */
  totalSteps?: number;
  /**
   * Size variant for the stepper
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Show connector lines between steps
   * @default true
   */
  showConnector?: boolean;
  /**
   * Color for completed steps (indicator and connector)
   * @default "green"
   */
  completedColor?: "orange" | "green";
}

/**
 * Stepper - Root container
 */
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ 
    className, 
    value, 
    onValueChange, 
    variant = "horizontal", 
    indicators,
    clickable = false,
    totalSteps,
    size = "md",
    showConnector = true,
    completedColor = "green",
    children, 
    ...props 
  }, ref) => {
    return (
      <StepperContext.Provider
        value={{
          value,
          onValueChange,
          variant,
          indicators,
          clickable,
          totalSteps,
          size,
          showConnector,
          completedColor,
        }}
      >
        <div 
          ref={ref} 
          data-orientation={variant}
          className={cn("space-y-4", className)} 
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = "Stepper";

/**
 * StepperNav variants
 */
const stepperNavVariants = cva("flex", {
  variants: {
    variant: {
      horizontal: "flex-row items-start w-full",
      vertical: "flex-col items-start",
    },
    size: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: {
    variant: "horizontal",
    size: "md",
  },
});

/**
 * StepperNav Props
 */
interface StepperNavProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * StepperNav - Container for stepper items
 */
const StepperNav = React.forwardRef<HTMLDivElement, StepperNavProps>(
  ({ className, children, ...props }, ref) => {
    const { variant, size } = React.useContext(StepperContext);

    return (
      <div
        ref={ref}
        data-orientation={variant}
        className={cn(stepperNavVariants({ variant, size }), "group/stepper-nav", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperNav.displayName = "StepperNav";

/**
 * StepperItem Props
 */
interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Step number (1-indexed)
   */
  step: number;
  /**
   * Whether this step is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional label for the step
   */
  label?: string;
  /**
   * Optional description for the step
   */
  description?: string;
  /**
   * Optional icon for the step
   */
  icon?: React.ReactNode;
}

/**
 * StepperItem - Individual step container
 */
const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ className, step, children, ...props }, ref) => {
    const { value, variant } = React.useContext(StepperContext);

    const state = React.useMemo(() => {
      if (step === value) return "active";
      if (step < value) return "completed";
      return "inactive";
    }, [step, value]);

    return (
      <div
        ref={ref}
        data-state={state}
        className={cn(
          "group/step relative",
          variant === "horizontal" && "flex flex-col items-center",
          variant === "vertical" && "flex flex-row items-start gap-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperItem.displayName = "StepperItem";

/**
 * StepperTrigger Props
 */
interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

/**
 * StepperTrigger - Clickable trigger for step
 */
const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ className, asChild, children, onClick, ...props }, ref) => {
    const { clickable, onValueChange, variant } = React.useContext(StepperContext);
    const stepContext = React.useContext(StepperItemContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (clickable && stepContext && onValueChange) {
        onValueChange(stepContext.step);
      }
      onClick?.(e);
    };

    if (asChild) {
      return <div className={cn(className)}>{children}</div>;
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex gap-2 rounded-lg transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-orange-500 focus-visible:ring-offset-2",
          // Horizontal variant: indicator at top, content below (flex-col)
          variant === "horizontal" && "flex-col items-start",
          // Vertical variant: content flows horizontally (flex-row)
          variant === "vertical" && "flex-row items-start justify-start",
          clickable && "cursor-pointer",
          !clickable && "cursor-default",
          className
        )}
        onClick={handleClick}
        disabled={!clickable}
        {...props}
      >
        {children}
      </button>
    );
  }
);
StepperTrigger.displayName = "StepperTrigger";

/**
 * StepperIndicator variants
 */
const stepperIndicatorVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 font-semibold transition-all relative z-10",
  {
    variants: {
      state: {
        active: "border-ds-orange-500 bg-ds-orange-500 text-white",
        completed: "border-ds-green-main bg-ds-green-main text-white",
        inactive: "border-ds-grey-200 bg-white text-ds-grey-400",
      },
      size: {
        sm: "size-6 text-xs",
        md: "size-8 text-sm",
        lg: "size-10 text-base",
      },
    },
    defaultVariants: {
      state: "inactive",
      size: "md",
    },
  }
);

/**
 * StepperIndicator Props
 */
interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loading state
   */
  loading?: boolean;
}

/**
 * StepperIndicator - Step indicator circle
 */
const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ className, loading, children, ...props }, ref) => {
    const { indicators, size: contextSize, completedColor } = React.useContext(StepperContext);
    const step = React.useContext(StepperItemContext);

    const state = step?.state || "inactive";

    const content = React.useMemo(() => {
      if (loading && indicators?.loading) {
        return indicators.loading;
      }
      if (state === "completed" && indicators?.completed) {
        return indicators.completed;
      }
      return children;
    }, [state, loading, indicators, children]);

    // Dynamic color classes based on completedColor prop
    const completedColorClasses = React.useMemo(() => {
      if (state !== "completed") return "";
      
      switch (completedColor) {
        case "orange":
          return "border-ds-orange-500 bg-ds-orange-500 text-white";
        case "green":
        default:
          return "border-ds-green-main bg-ds-green-main text-white";
      }
    }, [state, completedColor]);

    return (
      <div
        ref={ref}
        data-state={state}
        className={cn(
          stepperIndicatorVariants({ state: state as "active" | "completed" | "inactive", size: contextSize }), 
          completedColorClasses,
          className
        )}
        {...props}
      >
        {content}
      </div>
    );
  }
);
StepperIndicator.displayName = "StepperIndicator";

/**
 * StepperItemContext for nested components
 */
interface StepperItemContextValue {
  state: "active" | "completed" | "inactive";
  step: number;
}

const StepperItemContext = React.createContext<StepperItemContextValue | null>(null);

/**
 * Update StepperItem to provide context
 */
const StepperItemWithContext = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ className, step, children, ...props }, ref) => {
    const { value, variant } = React.useContext(StepperContext);

    const state = React.useMemo(() => {
      if (step === value) return "active";
      if (step < value) return "completed";
      return "inactive";
    }, [step, value]) as "active" | "completed" | "inactive";

    return (
      <StepperItemContext.Provider value={{ state, step }}>
        <div
          ref={ref}
          data-state={state}
          className={cn(
            "group/step relative",
            variant === "horizontal" && "flex flex-col items-center",
            variant === "vertical" && "flex flex-row items-start gap-4",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepperItemContext.Provider>
    );
  }
);
StepperItemWithContext.displayName = "StepperItem";

/**
 * StepperLabel Props
 */
interface StepperLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * StepperLabel - Step label text (e.g., "Step 1")
 */
const StepperLabel = React.forwardRef<HTMLDivElement, StepperLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-[10px] font-semibold uppercase text-ds-grey-500", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperLabel.displayName = "StepperLabel";

/**
 * StepperTitle Props
 */
interface StepperTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * StepperTitle - Step title text
 */
const StepperTitle = React.forwardRef<HTMLDivElement, StepperTitleProps>(
  ({ className, children, ...props }, ref) => {
    const step = React.useContext(StepperItemContext);
    const state = step?.state || "inactive";
    
    return (
      <div
        ref={ref}
        className={cn(
          "font-semibold text-base text-ds-grey-900",
          state === "inactive" && "text-ds-grey-400",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperTitle.displayName = "StepperTitle";

/**
 * StepperDescription Props
 */
interface StepperDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * StepperDescription - Step description text
 */
const StepperDescription = React.forwardRef<HTMLParagraphElement, StepperDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const step = React.useContext(StepperItemContext);
    const state = step?.state || "inactive";
    
    return (
      <p
        ref={ref}
        className={cn(
          "text-sm text-ds-grey-500 line-clamp-2 text-left",
          state === "inactive" && "text-ds-grey-400",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
StepperDescription.displayName = "StepperDescription";

/**
 * StepperContentWrapper Props
 */
interface StepperContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * StepperContentWrapper - Automatically arranges content based on variant
 * For vertical variant: text and badge flow horizontally
 * For horizontal variant: content flows vertically
 */
const StepperContentWrapper = React.forwardRef<HTMLDivElement, StepperContentWrapperProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = React.useContext(StepperContext);
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-1",
          // For vertical variant: content flows in horizontal row
          variant === "vertical" && "flex-row items-start gap-3",
          // For horizontal variant: content flows in a column
          variant === "horizontal" && "flex-col items-start gap-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperContentWrapper.displayName = "StepperContentWrapper";

/**
 * StepperTextWrapper Props
 */
interface StepperTextWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * StepperTextWrapper - Wraps text content (label, title, description)
 * Always displays in a vertical column with fixed width
 */
const StepperTextWrapper = React.forwardRef<HTMLDivElement, StepperTextWrapperProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = React.useContext(StepperContext);
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start gap-1",
          // For vertical variant: fixed width in rem
          variant === "vertical" && "w-[10rem] flex-shrink-0",
          // For horizontal variant: takes full width
          variant === "horizontal" && "w-[10rem]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperTextWrapper.displayName = "StepperTextWrapper";

/**
 * StepperBadgeGroup Props
 */
interface StepperBadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * StepperBadgeGroup - Container for badges with fixed width
 * Groups badges horizontally or vertically based on variant
 */
const StepperBadgeGroup = React.forwardRef<HTMLDivElement, StepperBadgeGroupProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = React.useContext(StepperContext);
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap gap-2",
          variant === "vertical" && "w-[8rem] flex-shrink-0",
          variant === "horizontal" && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepperBadgeGroup.displayName = "StepperBadgeGroup";

/**
 * StepperBadge Props
 */
interface StepperBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Badge status/variant
   */
  status?: "success" | "warning" | "error" | "inactive" | "default";
  /**
   * Badge size
   */
  size?: "sm" | "md" | "lg";
  /**
   * Badge variant style
   */
  variant?: "default" | "light" | "dark" | "outline";
  /**
   * Icon name (Material Icon)
   */
  icon?: string;
  /**
   * Icon variant
   */
  iconVariant?: "filled" | "outlined";
  /**
   * Icon size
   */
  iconSize?: string;
}

/**
 * StepperBadge - Smart badge that shows based on step state
 * Automatically arranges based on stepper variant
 */
const StepperBadge = React.forwardRef<HTMLDivElement, StepperBadgeProps>(
  ({ className, children, status = "default", size = "sm", variant = "light", icon, iconVariant, iconSize, ...props }, ref) => {
    const step = React.useContext(StepperItemContext);
    const state = step?.state || "inactive";
    
    // Determine which badge to show based on state
    const shouldShow = 
      (state === "active" && status === "warning") ||
      (state === "completed" && status === "success") ||
      (state === "inactive" && status === "default");
    
    if (!shouldShow) return null;
    
    return (
      <Badge
        ref={ref}
        variant={variant}
        status={status}
        size={size}
        icon={icon}
        iconVariant={iconVariant}
        iconSize={iconSize}
        className={cn(className, state === "inactive"?"bg-gray-100 text-gray-400":"")}
        {...props}
      >
        {children}
      </Badge>
    );
  }
);
StepperBadge.displayName = "StepperBadge";

/**
 * StepperSeparator variants
 */
const stepperSeparatorVariants = cva("transition-colors bg-ds-grey-200", {
  variants: {
    variant: {
      horizontal: "h-[2px] absolute z-[9]",
      vertical: "w-[2px] absolute",
    },
    state: {
      active: "bg-ds-grey-200",
      completed: "bg-ds-orange-500",
      inactive: "bg-ds-grey-200",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      variant: "vertical",
      size: "sm",
      className: "left-3 top-6 bottom-0 h-[calc(100%+0.5rem)]",
    },
    {
      variant: "vertical",
      size: "md",
      className: "left-4 top-8 bottom-0 h-[calc(100%+0.5rem)]",
    },
    {
      variant: "vertical",
      size: "lg",
      className: "left-5 top-10 bottom-0 h-[calc(100%+1rem)]",
    },
    {
      variant: "horizontal",
      size: "sm",
      className: "top-3 left-[calc(50%-4rem)] w-full",
    },
    {
      variant: "horizontal",
      size: "md",
      className: "top-4 left-[calc(50%-3rem)] w-full",
    },
    {
      variant: "horizontal",
      size: "lg",
      className: "top-5 left-[calc(50%-3rem)] w-full",
    },
  ],
  defaultVariants: {
    variant: "horizontal",
    state: "inactive",
    size: "md",
  },
});

/**
 * StepperSeparator Props
 */
interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * StepperSeparator - Connector line between steps
 */
const StepperSeparator = React.forwardRef<HTMLDivElement, StepperSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { variant, size: contextSize, showConnector, completedColor } = React.useContext(StepperContext);
    const step = React.useContext(StepperItemContext);

    const state = step?.state || "inactive";

    if (!showConnector) {
      return null;
    }

    // Dynamic color classes based on completedColor prop
    const completedColorClasses = React.useMemo(() => {
      if (state !== "completed") return "";
      
      switch (completedColor) {
        case "orange":
          return "bg-ds-orange-500";
        case "green":
        default:
          return "bg-ds-green-main";
      }
    }, [state, completedColor]);

    return (
      <div
        ref={ref}
        data-state={state}
        className={cn(
          stepperSeparatorVariants({ variant, state: state as "active" | "completed" | "inactive", size: contextSize }), 
          completedColorClasses,
          className
        )}
        {...props}
      />
    );
  }
);
StepperSeparator.displayName = "StepperSeparator";

/**
 * StepperPanel Props
 */
interface StepperPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * StepperPanel - Container for step content
 */
const StepperPanel = React.forwardRef<HTMLDivElement, StepperPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  }
);
StepperPanel.displayName = "StepperPanel";

/**
 * StepperContent Props
 */
interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Step value this content belongs to (1-indexed)
   */
  value: number;
}

/**
 * StepperContent - Content for a specific step
 */
const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ className, value: stepValue, children, ...props }, ref) => {
    const { value } = React.useContext(StepperContext);

    if (value !== stepValue) {
      return null;
    }

    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  }
);
StepperContent.displayName = "StepperContent";

export {
  Stepper,
  StepperNav,
  StepperItemWithContext as StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperLabel,
  StepperTitle,
  StepperDescription,
  StepperContentWrapper,
  StepperTextWrapper,
  StepperBadgeGroup,
  StepperBadge,
  StepperSeparator,
  StepperPanel,
  StepperContent,
};
