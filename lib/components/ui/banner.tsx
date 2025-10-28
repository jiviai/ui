import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "./button";

/**
 * Banner variant styles using class-variance-authority
 */
const bannerVariants = cva(
  "rounded-2xl overflow-hidden transition-all duration-200 bg-white"
);

/**
 * Props for the Banner component
 */
interface BannerProps extends VariantProps<typeof bannerVariants> {
  /**
   * Main heading/title text
   */
  heading: string;
  /**
   * Subtitle text displayed below the title
   */
  description?: string;
  /**
   * Informational text displayed in the info section with icon
   */
  infoText?: string;
  /**
   * Text for the call-to-action button
   */
  buttonText?: string;
  /**
   * Callback when button is clicked
   */
  onClick?: () => void;
  /**
   * URL for the image (e.g., from Unsplash)
   */
  imageUrl?: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to use primary gradient background for image & heading section
   * - true: image & heading section gets colored gradient bg, info section gets white bg
   * - false: image & heading section gets white bg, info section gets colored gradient bg
   */
  isBgColor?: boolean;
  /**
   * Position of the image in the banner
   * - "left": image on the left, content on the right
   * - "right": image on the right, content on the left
   */
  imageAlignment?: "left" | "right";
  /**
   * Layout variant for the banner
   * - "row": image and content side by side
   * - "column": image on top, content below (stacked)
   */
  variant?: "row" | "column";
}

/**
 * A versatile banner component with image positioning and background variants
 *
 * @param props - The banner component props
 * @param props.heading - Main heading text
 * @param props.description - Description text below the heading
 * @param props.infoText - Informational text in the info section
 * @param props.buttonText - CTA button text
 * @param props.onClick - Button click handler
 * @param props.imageUrl - Image source URL
 * @param props.imageAlt - Image alt text
 * @param props.isPrimaryBackground - Whether to use primary gradient background for top section (default: false)
 * @param props.imageAlignment - Position of the image ("left" | "right") (default: "left")
 * @param props.variant - Layout variant ("row" | "column") (default: "row")
 * @param props.className - Additional CSS classes
 *
 * @returns A banner component with configurable layout and styling
 *
 * @example
 * ```tsx
 * <Banner
 *   heading="Heading"
 *   description="Sub-Heading"
 *   infoText="Additional information"
 *   buttonText="Button text"
 *   imageUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
 *   variant="row"
 *   imageAlignment="left"
 * />
 * ```
 */
const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      heading,
      description,
      infoText,
      buttonText,
      onClick,
      imageUrl,
      imageAlt = "Banner image",
      isBgColor = false,
      imageAlignment = "left",
      variant = "row",
      className,
    },
    ref
  ) => {
    // Generate unique ID for accessibility
    const headingId = React.useId();

    return (
      <div
        ref={ref}
        className={cn(bannerVariants(), className ,"border border-ds-grey-100")}
        role="region"
        aria-labelledby={headingId}
      >
        <div className="w-full flex flex-col">
          {/* image & heading */}
          {variant === "row" ? (
            <div
              className={cn(
                "w-full flex items-start gap-3 p-4",
                imageAlignment === "right" && "flex-row-reverse",
                isBgColor
                  ? "bg-gradient-to-br from-[#FDF0E8] to-[#FFEBD9]"
                  : "bg-white"
              )}
            >
              {imageUrl && (
                <div className="flex-shrink-0 w-32 aspect-square overflow-hidden rounded-xl">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex flex-col items-start gap-2 rounded-xl">
                <h2 id={headingId} className="text-2xl font-bold line-clamp-1">{heading}</h2>
                {description && (
                  <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
                )}
                {buttonText && (
                  <Button
                    variant="primary"
                    size="small"
                    onClick={onClick}
                  >
                    {buttonText}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "w-full flex flex-col items-center gap-3 px-2 py-3",
                isBgColor
                  ? "bg-gradient-to-br from-[#FDF0E8] to-[#FFEBD9]"
                  : "bg-white"
              )}
            >
              {imageUrl && (
                  <div className="w-full h-48 overflow-hidden rounded-xl relative">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-white/30 to-white/80" aria-hidden="true"></div>
                  </div>
              )}
              <div className="w-full flex flex-col items-center gap-2 text-center">
                <h2 id={headingId} className="text-2xl font-semibold line-clamp-2">{heading}</h2>
                {description && (
                  <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
                )}
                {buttonText && (
                  <Button
                    variant="primary"
                    size="small"
                    onClick={onClick}
                  >
                    {buttonText}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* info section  */}
          {infoText && (
            <div
              className={cn(
                "w-full flex items-center gap-2 px-2 py-3",
                isBgColor
                  ? "bg-white"
                  : "bg-gradient-to-br from-[#FDF0E8] to-[#FFEBD9]"
              )}
              role="status"
              aria-live="polite"
            >
              <div className="rounded-full flex items-center justify-center" aria-hidden="true">
                <Icon
                  name="info"
                  variant="filled"
                  size="20px"
                  className="text-orange-500"
                />
              </div>
              <p className="text-sm text-gray-500 leading-5">{infoText}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Banner.displayName = "Banner";

export { Banner, bannerVariants };
