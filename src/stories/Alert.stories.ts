import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Alert } from "../../lib/components/ui/alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Alert component displays important information with different states and variants. Supports heading, subheading, icons, and action buttons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["small", "large"],
      description: "Size variant of the alert",
    },
    status: {
      control: { type: "select" },
      options: ["default", "success", "warning", "error"],
      description: "Status/state of the alert",
    },
    heading: {
      control: { type: "text" },
      description: "Main heading text",
    },
    subheading: {
      control: { type: "text" },
      description: "Subheading or description text",
    },
    leftIcon: {
      control: { type: "text" },
      description: "Left icon name (Material Symbols)",
    },
    leftIconVariant: {
      control: { type: "select" },
      options: ["filled", "outlined"],
      description: "Left icon variant",
    },
    rightIcon: {
      control: { type: "text" },
      description: "Right icon name (Material Symbols)",
    },
    rightIconVariant: {
      control: { type: "select" },
      options: ["filled", "outlined"],
      description: "Right icon variant",
    },
    buttonText: {
      control: { type: "text" },
      description: "Action button text",
    },
    onButtonClick: {
      action: "button clicked",
      description: "Button click handler",
    },
    onClose: {
      action: "close clicked",
      description: "Close handler",
    },
  },
  args: {
    onButtonClick: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Alert
export const Default: Story = {
  args: {
    heading: "Information",
    subheading: "This is a default alert with some information.",
    buttonText: "Learn more",
  },
};

// Success Alert
export const Success: Story = {
  args: {
    status: "success",
    heading: "Success!",
    subheading: "Your action was completed successfully.",
    buttonText: "Continue",
  },
};

// Warning Alert
export const Warning: Story = {
  args: {
    status: "warning",
    heading: "Warning",
    subheading: "Please review the information before proceeding.",
    buttonText: "Review",
  },
};

// Error Alert
export const Error: Story = {
  args: {
    status: "error",
    heading: "Error occurred",
    subheading: "Something went wrong. Please try again.",
    buttonText: "Retry",
  },
};

// Large Variant
export const Large: Story = {
  args: {
    variant: "large",
    status: "success",
    heading: "Large Success Alert",
    subheading:
      "This is a large variant of the alert component with more padding and larger text.",
    buttonText: "Continue",
  },
};

// Small Variant
export const Small: Story = {
  args: {
    variant: "small",
    status: "warning",
    heading: "Small Warning",
    subheading: "This is a small variant of the alert component.",
    buttonText: "OK",
  },
};

// With Custom Icons
export const CustomIcons: Story = {
  args: {
    status: "default",
    heading: "Custom Icons",
    subheading: "Alert with custom left and right icons.",
    leftIcon: "star",
    leftIconVariant: "filled",
    rightIcon: "more_vert",
    buttonText: "Action",
  },
};

// With Close Button
export const WithClose: Story = {
  args: {
    status: "error",
    heading: "Dismissible Alert",
    subheading: "This alert can be closed by clicking the X button.",
    buttonText: "Fix issue",
  },
};

// Heading Only
export const HeadingOnly: Story = {
  args: {
    status: "success",
    heading: "Simple success message",
    buttonText: "OK",
  },
};

// Subheading Only
export const SubheadingOnly: Story = {
  args: {
    status: "warning",
    subheading: "This alert only has a subheading without a main heading.",
    buttonText: "Acknowledge",
  },
};

// No Button
export const NoButton: Story = {
  args: {
    status: "default",
    heading: "Information",
    subheading: "This alert doesn't have an action button.",
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="space-y-4 w-96">
        <Alert
          status="default"
          heading="Default Alert"
          subheading="This is a default alert message."
          buttonText="Action"
        />
        <Alert
          status="success"
          heading="Success Alert"
          subheading="Operation completed successfully."
          buttonText="Continue"
        />
        <Alert
          status="warning"
          heading="Warning Alert"
          subheading="Please review before proceeding."
          buttonText="Review"
        />
        <Alert
          status="error"
          heading="Error Alert"
          subheading="Something went wrong."
          buttonText="Retry"
        />
      </div>
    );
  },
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => {
    return (
      <div className="space-y-4 w-96">
        <Alert
          variant="small"
          status="success"
          heading="Small Alert"
          subheading="This is a small variant."
          buttonText="Action"
        />
        <Alert
          variant="large"
          status="success"
          heading="Large Alert"
          subheading="This is a large variant with more padding and larger text."
          buttonText="Action"
        />
      </div>
    );
  },
};
