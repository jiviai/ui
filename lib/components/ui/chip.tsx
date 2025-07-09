import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "../icon";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const chipVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:bg-white disabled:border-gray-300 disabled:text-gray-300 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-8 px-3 border",
  {
    variants: {
      variant: {
        selection: "",
        tag: "border-gray-300 text-black bg-white",
      },
    },
    defaultVariants: {
      variant: "selection",
    },
  }
);

interface ChipProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
  text: string;
  selected?: boolean;
}

function Chip({
  className,
  variant,
  asChild = false,
  leadingIcon,
  trailingIcon,
  disabled,
  text,
  selected = false,
  ...props
}: ChipProps) {
  const Comp = asChild ? Slot : "button";

  // Determine the classes based on variant and selected state
  const getVariantClasses = () => {
    if (variant === "selection") {
      return selected
        ? "bg-orange-500 text-white border-orange-500"
        : "bg-white border-orange-500 text-orange-500";
    }
    return "";
  };

  return (
    <Comp
      data-slot="chip"
      className={cn(chipVariants({ variant, className }), getVariantClasses())}
      disabled={disabled}
      {...props}
    >
      {leadingIcon && (
        <Icon
          size="16px"
          name={leadingIcon === "default" ? "chevron_left" : leadingIcon}
        />
      )}
      {text}
      {trailingIcon && (
        <Icon
          size="16px"
          name={trailingIcon === "default" ? "chevron_right" : trailingIcon}
        />
      )}
    </Comp>
  );
}

export { Chip };
