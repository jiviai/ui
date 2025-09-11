import type { Meta, StoryObj } from "@storybook/react";
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
  },
  args: {},
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
