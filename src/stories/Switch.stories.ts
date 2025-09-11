import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../lib/components/ui/switch";
import { fn } from "storybook/internal/test";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked/on",
    },
    onChange: {
      action: "changed",
      description: "Callback function when checked state changes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};
