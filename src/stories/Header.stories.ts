import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "../../lib/components/ui/header";

const meta = {
  title: "Molecules/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Header title text or React node",
      table: {
        type: { summary: "string | ReactNode" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Header size variant",
    },
    showBackButton: {
      control: "boolean",
      description: "Show back button",
    },
    backButtonIcon: {
      control: "text",
      description: "Back button icon name (defaults to 'arrow_back' if showBackButton is true)",
      if: { arg: "showBackButton" },
    },
    onBackClick: {
      action: "backClicked",
      description: "Back button click handler",
      if: { arg: "showBackButton" },
    },
    buttonText: {
      control: "text",
      description: "Text button label",
    },
    buttonVariant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Text button style variant",
    },
    onButtonClick: {
      action: "buttonClicked",
      description: "Text button click handler",
    },
    primaryIcon: {
      control: "text",
      description: "Primary icon name",
    },
    primaryIconVariant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "Primary icon style variant",
    },
    onPrimaryIconClick: {
      action: "primaryIconClicked",
      description: "Primary icon click handler",
    },
    secondaryIcon: {
      control: "text",
      description: "Secondary icon name",
    },
    secondaryIconVariant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "Secondary icon style variant",
    },
    onSecondaryIconClick: {
      action: "secondaryIconClicked",
      description: "Secondary icon click handler",
    },
    className:{
      control: "text",
      description: "Class name for the header",
    }
  },
  args: {
    title: "Header",
    size: "medium",
    showBackButton: true,
    backButtonIcon: "arrow_back",
    buttonText: "Button text",
    buttonVariant: "primary",
    primaryIcon: "info",
    secondaryIcon: "mic",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Header",
    size: "medium",
  },
};
