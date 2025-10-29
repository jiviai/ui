/**
 * Tabs Component
 * 
 * Accessible tabs with underline style, multiple sizes, and icon support.
 */

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

/**
 * Context to share size from TabsList to TabsTrigger
 */
const TabsContext = React.createContext<{
  size?: "small" | "medium" | "large";
}>({});

/**
 * Tab list container styles
 */
const tabsListVariants = cva(
  "inline-flex items-center justify-start text-ds-grey-700 bg-transparent border-b border-ds-grey-200 w-fit flex-row"
);

/**
 * Individual tab trigger styles
 */
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ds-orange-500 focus-visible:ring-offset-2 rounded-none border-b-2 border-transparent data-[state=active]:border-ds-orange-500 data-[state=active]:text-ds-orange-500 hover:text-ds-grey-900",
  {
    variants: {
      size: {
        small: "text-xs px-3 py-1.5",
        medium: "text-sm px-4 py-2.5",
        large: "text-base px-6 py-3",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

/**
 * Tab content panel styles
 */
const tabsContentVariants = cva(
  "mt-4 outline-none focus-visible:ring-2 focus-visible:ring-ds-orange-500 focus-visible:ring-offset-2 rounded-lg"
);

/**
 * Tabs root component - Container for all tab-related components
 */
const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
Tabs.displayName = TabsPrimitive.Root.displayName;

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /**
   * Size to apply to all TabsTrigger children (default: "medium")
   */
  size?: "small" | "medium" | "large";
}

/**
 * TabsList - Container for tab triggers
 * Props set here apply to all TabsTrigger children
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size = "medium", ...props }, ref) => {
  return (
    <TabsContext.Provider value={{ size }}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants(), className)}
        {...props}
      />
    </TabsContext.Provider>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  /**
   * Icon name (e.g., "person", "settings", "home")
   */
  icon?: string;
  /**
   * Icon style: "outlined" or "filled" (default: "outlined")
   */
  iconVariant?: "filled" | "outlined";
  /**
   * Custom icon size (default: auto-sized based on tab size)
   */
  iconSize?: string;
}

/**
 * TabsTrigger - Individual tab button
 * The value prop must match the corresponding TabsContent value
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, icon, iconVariant = "outlined", iconSize, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const finalSize = size ?? context.size ?? "medium";

  // Map size to icon size if iconSize is not provided
  const getIconSize = () => {
    if (iconSize) return iconSize;
    
    switch (finalSize) {
      case "small":
        return "16px";
      case "medium":
        return "20px";
      case "large":
        return "24px";
      default:
        return "20px";
    }
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ size: finalSize }), "gap-2", className)}
      {...props}
    >
      {icon && (
        <Icon name={icon} variant={iconVariant} size={getIconSize()} />
      )}
      {children}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * TabsContent - Content panel for each tab
 * The value prop must match the corresponding TabsTrigger value
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants(), className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
