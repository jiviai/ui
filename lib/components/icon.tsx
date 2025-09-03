import * as React from "react";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string; // the ligature name, like "home" or "search"
  size?: string; // optional: "24px", "1.5rem", etc.
  variant?: "filled" | "outlined";
  className?: string;
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    { name, size = "24px", className = "", variant = "outlined", ...props },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`material-symbols-outlined ${className}`}
        style={{
          fontSize: size,
          fontVariationSettings: `'FILL' ${variant === "filled" ? 1 : 0}`,
        }}
        {...props}
      >
        {name}
      </span>
    );
  }
);

Icon.displayName = "Icon";
