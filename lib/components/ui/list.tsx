import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const listVariants = cva(
  "bg-white rounded-xl border border-ds-grey-100 overflow-hidden",
  {
    variants: {
      size: {
        default: "",
        compact: "",
      },
      variant: {
        default: "border-ds-grey-100",
        elevated: "border-ds-grey-200 shadow-sm",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

/**
 * Props for the List component
 */
interface ListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listVariants> {
  /**
   * The list items to render as children
   */
  children: React.ReactNode;
  /**
   * Whether to show dividers between list items
   */
  showDividers?: boolean;
  /**
   * Additional CSS classes to apply to the list
   */
  className?: string;
}

/**
 * A container component for list items with rounded borders and optional dividers
 *
 * @param props - The list component props
 * @param props.children - The list items to render
 * @param props.showDividers - Whether to show dividers between list items (default: true)
 * @param props.size - Size variant of the list
 * @param props.variant - Visual variant of the list
 * @param props.className - Additional CSS classes to apply
 *
 * @returns A list container element with the specified styling
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem
 *     title="First Item"
 *     description="Description for first item"
 *     leftType="small-icon"
 *     leftIcon="person"
 *   />
 *   <ListItem
 *     title="Second Item"
 *     description="Description for second item"
 *     leftType="small-icon"
 *     leftIcon="settings"
 *   />
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * <List variant="elevated" showDividers={false}>
 *   <ListItem title="No dividers" />
 *   <ListItem title="Between items" />
 * </List>
 * ```
 */
const List = React.forwardRef<HTMLDivElement, ListProps>(
  (
    { className, children, showDividers = true, size, variant, ...props },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn(listVariants({ size, variant }), className)}
        data-slot="list"
        {...props}
      >
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {/* Render the child */}
            {child}

            {/* Add divider if not the last item and showDividers is true */}
            {showDividers && index < childrenArray.length - 1 && (
              <div className="m-auto border-b border-ds-grey-200 w-[90%]" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

List.displayName = "List";

export { List, listVariants };
export type { ListProps };
