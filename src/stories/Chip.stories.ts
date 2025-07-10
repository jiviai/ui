import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Chip } from "../../lib/components/ui/chip";

const meta = {
  title: "UI/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["selection", "tag"],
    },
    selected: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    text: {
      control: "text",
    },
    leadingIcon: {
      control: "text",
    },
    trailingIcon: {
      control: "text",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "selection",
    text: "Chip",
    selected: false,
    disabled: false,
  },
};
