import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { IconButton } from "../../lib/components/ui/icon-button";

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    iconName: {
      control: "text",
    },
    asChild: {
      control: "boolean",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "medium",
    disabled: false,
    iconName: "chevron_right",
  },
};
