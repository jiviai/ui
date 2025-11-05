import { useState } from "react";
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../../lib/components/icon";
import {
  Stepper,
  StepperBadge,
  StepperBadgeGroup,
  StepperContentWrapper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperLabel,
  StepperNav,
  StepperSeparator,
  StepperTextWrapper,
  StepperTitle, 
  StepperTrigger,
} from "../../lib/components/ui/stepper";

/**
 * The Stepper component provides a multi-step workflow interface with state management.
 * 
 * ## Features
 * - **State Management**: Value-based control with onValueChange callback
 * - **Custom Indicators**: Support for completed and loading states
 * - **Flexible Layout**: Horizontal and vertical orientations
 * - **Content Panels**: Show/hide content based on active step
 * - **Clickable Navigation**: Enable non-linear navigation with clickable prop
 * - **Size Variants**: Small, medium, and large sizes
 * - **Badge Support**: StepperBadge with optional icon props
 * - **Accessible**: Built with proper ARIA attributes and keyboard navigation
 * 
 * ## StepperBadge Props (Optional)
 * The `StepperBadge` component supports these optional props:
 * - `icon?: string` - Material Icon name (e.g., "trending_up", "check_circle")
 * - `iconVariant?: "filled" | "outlined"` - Icon style variant
 * - `iconSize?: string` - Icon size (e.g., "14px", "16px")
 * - `status?: "success" | "warning" | "error" | "inactive" | "default"`
 * - `size?: "sm" | "md" | "lg"`
 * - `variant?: "default" | "light" | "dark" | "outline"`
 * 
 * ## Usage
 * 
 * ```tsx
 * <Stepper 
 *   value={currentStep} 
 *   onValueChange={setCurrentStep}
 *   variant="horizontal"
 *   size="md"
 *   clickable={false}
 *   showConnector={true}
 * >
 *   <StepperNav>
 *     <StepperItem step={1}>
 *       <StepperTrigger>
 *         <StepperIndicator>1</StepperIndicator>
 *         <StepperContentWrapper>
 *           <StepperTextWrapper>
 *             <StepperTitle>Step 1</StepperTitle>
 *           </StepperTextWrapper>
 *           <StepperBadgeGroup>
 *             <StepperBadge status="warning" icon="trending_up" iconVariant="filled">
 *               In Progress
 *             </StepperBadge>
 *           </StepperBadgeGroup>
 *         </StepperContentWrapper>
 *       </StepperTrigger>
 *       <StepperSeparator />
 *     </StepperItem>
 *   </StepperNav>
 * </Stepper>
 * ```
 */
const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible stepper component for multi-step workflows with state management, custom indicators, and content panels.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 1, max: 4, step: 1 },
      description: "Current active step (1-indexed)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    onValueChange: {
      action: "stepChanged",
      description: "Callback when step value changes",
      table: {
        type: { summary: "(value: number) => void" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Layout variant",
      table: {
        type: { summary: "horizontal | vertical" },
        defaultValue: { summary: "horizontal" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size variant for the stepper",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    clickable: {
      control: { type: "boolean" },
      description: "Allow clicking on any step to navigate (non-linear navigation)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showConnector: {
      control: { type: "boolean" },
      description: "Show connector lines between steps",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    completedColor: {
      control: { type: "select" },
      options: ["orange", "green"],
      description: "Color for completed steps (indicator and connector)",
      table: {
        type: { summary: "orange | green" },
        defaultValue: { summary: "green" },
      },
    },
    totalSteps: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Total number of steps (optional, useful for validation)",
      table: {
        type: { summary: "number" },
      },
    },
    indicators: {
      control: false,
      description: "Custom indicators for different states",
      table: {
        type: { summary: "{ completed?: ReactNode, loading?: ReactNode }" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { title: "User Details", icon: "person", description: "Enter your personal information" },
  { title: "Payment Info", icon: "credit_card", description: "Add payment method" },
  { title: "Auth OTP", icon: "lock", description: "Verify your identity" },
  { title: "Preview Form", icon: "list_alt", description: "Review and submit" },
];

/**
 * Default horizontal stepper with all features
 */
export const Default: Story = {
  args: {
    value: 2,
    variant: "horizontal",
    size: "md",
    clickable: false,
    showConnector: true,
    completedColor: "green",
  },
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(args.value);

    React.useEffect(() => {
      setCurrentStep(args.value);
    }, [args.value]);

    return (
      <div className="w-full p-8">
        <Stepper
          {...args}
          value={currentStep}
          onValueChange={setCurrentStep}
          indicators={{
            completed: <Icon name="check" variant="filled" size="16px" />,
            loading: <Icon name="hourglass_empty" variant="filled" size="16px" className="animate-spin" />,
          }}
          className="space-y-8"
        >
          <StepperNav>
            {steps.map((step, index) => (
              <StepperItem key={index} step={index + 1} className="flex-1">
                <StepperTrigger>
                  <StepperIndicator>
                    <Icon name={step.icon} variant="filled" size="16px" />
                  </StepperIndicator>
                  <StepperContentWrapper>
                    <StepperTextWrapper>
                      <StepperLabel>Step {index + 1}</StepperLabel>
                      <StepperTitle>{step.title}</StepperTitle>
                      <StepperDescription>
                        {step.description}
                      </StepperDescription>
                    </StepperTextWrapper>
                    <StepperBadgeGroup>
                      {/* 
                        StepperBadge Props (all optional):
                        - icon?: string (Material Icon name)
                        - iconVariant?: "filled" | "outlined"
                        - iconSize?: string (e.g., "14px")
                        - status?: "success" | "warning" | "error" | "inactive" | "default"
                        - size?: "sm" | "md" | "lg"
                        - variant?: "default" | "light" | "dark" | "outline"
                      */}
                      <StepperBadge status="warning" icon="trending_up" iconVariant="filled">In Progress</StepperBadge>
                      <StepperBadge status="success" icon="check_circle" iconVariant="filled">Completed</StepperBadge>
                      <StepperBadge status="default" icon="schedule" iconVariant="filled">Pending</StepperBadge>
                    </StepperBadgeGroup>
                  </StepperContentWrapper>
                </StepperTrigger>
                {index < steps.length - 1 && <StepperSeparator />}
              </StepperItem>
            ))}
          </StepperNav>
        </Stepper>
      </div>
    );
  },
};
