/**
 * BottomSheet Component
 * 
 * A bottom sheet component that slides up from the bottom of the screen with animation.
 * Built on top of Radix UI Dialog primitives, specifically designed for bottom placement.
 * 
 * @example
 * Basic usage:
 * ```tsx
 * const [open, setOpen] = useState(false);
 * 
 * <BottomSheet open={open} onOpenChange={setOpen}>
 *   <BottomSheetContent height="70%" showFooter={true}>
 *     <BottomSheetHeader>
 *       <BottomSheetTitle>Title</BottomSheetTitle>
 *       <BottomSheetCloseButton />
 *       <BottomSheetDescription>Description text</BottomSheetDescription>
 *     </BottomSheetHeader>
 *     <BottomSheetMiddleContent>
 *       Your scrollable content here
 *     </BottomSheetMiddleContent>
 *     <BottomSheetFooter>
 *       <Button>Cancel</Button>
 *       <Button>Save</Button>
 *     </BottomSheetFooter>
 *   </BottomSheetContent>
 * </BottomSheet>
 * ```
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

// Context for bottom sheet footer visibility
const BottomSheetContext = React.createContext<{ showFooter: boolean }>({
  showFooter: true,
});

const BottomSheet = DialogPrimitive.Root;

const BottomSheetTrigger = DialogPrimitive.Trigger;

const BottomSheetClose = DialogPrimitive.Close;

const BottomSheetPortal = DialogPrimitive.Portal;

const BottomSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
BottomSheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface BottomSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * Height of the bottom sheet (e.g., "50%", "400px", or number in pixels).
   * If not provided, the sheet will auto-size based on content.
   */
  height?: string | number;
  /**
   * Container element to render the bottom sheet relative to.
   * If provided, the bottom sheet will use absolute positioning relative to this container.
   * If not provided, it will use fixed positioning relative to the viewport.
   */
  container?: HTMLElement | null;
  /**
   * Whether to show the footer section.
   * When false, any BottomSheetFooter children will be automatically hidden.
   * Defaults to true.
   */
  showFooter?: boolean;
}

const BottomSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  BottomSheetContentProps
>(({ className, height, container, showFooter = true, children, ...props }, ref) => {
  const heightStyle = height 
    ? { height: typeof height === 'number' ? `${height}px` : height }
    : {};
  
  const isContainerRelative = !!container;
  const contentRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<MutationObserver | null>(null);

  // Body scroll lock - lock body scroll when bottom sheet is open
  const lockBodyScroll = React.useCallback((isOpen: boolean) => {
    if (isOpen) {
      // Lock body scroll and preserve scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Unlock body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, []);

  // Cleanup observer on unmount
  React.useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      // Cleanup: restore body scroll on unmount
      lockBodyScroll(false);
    };
  }, [lockBodyScroll]);

  // Combine refs
  React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

  return (
    <BottomSheetContext.Provider value={{ showFooter }}>
      <BottomSheetPortal container={container || undefined}>
        {!isContainerRelative && <BottomSheetOverlay />}
        {isContainerRelative && (
          <DialogPrimitive.Overlay
            className="absolute inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          />
        )}
        <DialogPrimitive.Content
          ref={(node) => {
            const element = node as HTMLDivElement | null;
            contentRef.current = element;
            
            // Set up observer when element is available
            if (element && !observerRef.current) {
              const observer = new MutationObserver(() => {
                const isOpen = element.getAttribute('data-state') === 'open';
                lockBodyScroll(isOpen);
              });
              
              observerRef.current = observer;
              
              // Initial check
              const isOpen = element.getAttribute('data-state') === 'open';
              lockBodyScroll(isOpen);
              
              observer.observe(element, {
                attributes: true,
                attributeFilter: ['data-state'],
              });
            } else if (!element && observerRef.current) {
              // Clean up observer when element is removed
              observerRef.current.disconnect();
              observerRef.current = null;
              lockBodyScroll(false);
            }
            
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
            }
          }}
          className={cn(
            "z-50 bg-white shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:rounded-t-lg",
            isContainerRelative 
              ? "absolute bottom-0 left-0 right-0 w-full rounded-t-lg border-t flex flex-col"
              : "fixed bottom-0 left-0 right-0 w-full rounded-t-lg border-t max-h-[90vh] flex flex-col",
            className
          )}
          style={{ ...heightStyle, ...props.style }}
          {...props}
        >
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {children}
          </div>
        </DialogPrimitive.Content>
      </BottomSheetPortal>
    </BottomSheetContext.Provider>
  );
});
BottomSheetContent.displayName = DialogPrimitive.Content.displayName;

/**
 * BottomSheetHeader Component
 * 
 * Container for the bottom sheet header content.
 * Typically contains BottomSheetTitle, BottomSheetCloseButton, and BottomSheetDescription.
 */
const BottomSheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-left p-4 flex-shrink-0",
      className
    )}
    {...props}
  />
);
BottomSheetHeader.displayName = "BottomSheetHeader";

/**
 * BottomSheetFooter Component
 * 
 * Container for the bottom sheet footer content, typically containing action buttons.
 * Automatically hidden when BottomSheetContent's showFooter prop is false.
 */
const BottomSheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { showFooter } = React.useContext(BottomSheetContext);
  
  if (!showFooter) {
    return null;
  }
  
  return (
    <div
      className={cn(
        "flex flex-row justify-between gap-2 px-4 py-2 border-t border-ds-grey-200 mt-auto",
        className
      )}
      {...props}
    />
  );
};
BottomSheetFooter.displayName = "BottomSheetFooter";

interface BottomSheetMiddleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display inside the scrollable area
   */
  children: React.ReactNode;
}

/**
 * BottomSheetMiddleContent Component
 * 
 * A reusable scrollable middle content section for bottom sheets.
 * Automatically enables vertical overflow scrolling with hidden scrollbar.
 * 
 * **Note:** The scrollbar is always hidden by default for a cleaner UI.
 * Content remains scrollable via mouse wheel, touch gestures, or keyboard.
 * 
 * This component provides a scrollable container between the header and footer
 * sections of a bottom sheet. It automatically handles overflow and scrolling.
 */
const BottomSheetMiddleContent = React.forwardRef<
  HTMLDivElement,
  BottomSheetMiddleContentProps
>(({ className, children, style, ...props }, ref) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  
  // Combine refs
  React.useImperativeHandle(ref, () => divRef.current as HTMLDivElement);
  
  return (
    <div
      ref={divRef}
      className={cn(
        "flex-1 overflow-y-scroll p-4 hide-scrollbar",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});
BottomSheetMiddleContent.displayName = "BottomSheetMiddleContent";

/**
 * BottomSheetTitle Component
 * 
 * The title element for the bottom sheet.
 * Uses Radix UI Dialog Title primitive for accessibility.
 */
const BottomSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold text-ds-grey-800 border-none",
      className
    )}
    {...props}
  />
));
BottomSheetTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * BottomSheetDescription Component
 * 
 * The description element for the bottom sheet.
 * Uses Radix UI Dialog Description primitive for accessibility.
 */
const BottomSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-ds-grey-400 mt-2 line-clamp-2", className)}
    {...props}
  />
));
BottomSheetDescription.displayName =
  DialogPrimitive.Description.displayName;

interface BottomSheetCloseButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * Icon name for the close button.
   * Defaults to "close".
   */
  iconName?: string;
}

/**
 * BottomSheetCloseButton Component
 * 
 * A close button for the bottom sheet, typically placed in the header.
 * Uses Radix UI Dialog Close primitive and automatically closes the sheet when clicked.
 */
const BottomSheetCloseButton = React.forwardRef<
  HTMLButtonElement,
  BottomSheetCloseButtonProps
>(({ className, iconName = "close", ...props }, ref) => (
  <BottomSheetClose
    ref={ref}
    className={cn(
      "absolute right-2 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-offset-2 disabled:pointer-events-none text-ds-grey-900",
      className
    )}
    {...props}
  >
    <Icon name={iconName} variant="outlined" size="24px" />
    <span className="sr-only">Close</span>
  </BottomSheetClose>
));
BottomSheetCloseButton.displayName = "BottomSheetCloseButton";

export {
  BottomSheet,
  BottomSheetPortal,
  BottomSheetOverlay,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetCloseButton,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetMiddleContent,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
};
