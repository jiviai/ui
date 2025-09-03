import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../lib/components/ui/checkbox";
import { fn } from "storybook/internal/test";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    onChange: {
      action: "changed",
      description: "Callback function when checked state changes",
    },
    label: {
      control: "text",
      description: "Label text displayed next to the checkbox",
    },
    description: {
      control: "text",
      description: "Optional description text displayed below the label",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    label: "Default Checkbox",
    description: "This is a default checkbox option",
    disabled: false,
  },
};
