import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "../../lib/components/ui/header";

const meta = {
  title: "Atoms/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Optional header text",
      table: {
        type: { summary: "string | ReactNode" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Optional size variant for the header",
    },
    // Back Button Group
    backButton: {
      control: "text",
      description: "Optional back button icon (string) or set to true for default arrow_back",
      table: {
        type: { summary: "boolean | string" },
      },
    },
    onBackClick: {
      action: "backClicked",
      description: "Optional callback when back button is clicked",
    },
    // Header Button Group
    buttonText: {
      control: "text",
      description: "Optional text for the button",
    },
    buttonVariant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Optional button variant",
    },
    onButtonClick: {
      action: "buttonClicked",
      description: "Optional callback when button is clicked",
    },
    // Primary Icon Group
    primaryIcon: {
      control: "text",
      description: "Optional primary icon name",
    },
    primaryIconVariant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "Optional primary icon variant - outlined shows light background with border, filled shows solid orange",
    },
    onPrimaryIconClick: {
      action: "primaryIconClicked",
      description: "Optional callback when primary icon is clicked",
    },
    // Secondary Icon Group
    secondaryIcon: {
      control: "text",
      description: "Optional secondary icon name",
    },
    secondaryIconVariant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "Optional secondary icon variant - outlined shows light background with border, filled shows solid orange",
    },
    onSecondaryIconClick: {
      action: "secondaryIconClicked",
      description: "Optional callback when secondary icon is clicked",
    },
  },
  args: {
    title: "Header",
    size: "medium",
    backButton: true,
    buttonText: "Button text",
    buttonVariant: "primary",
    primaryIcon: "info",
    secondaryIcon: "mic",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic header with title only (mandatory)
 */
export const Default: Story = {
  args: {
    title: "Header",
    size: "medium",
  },
};
