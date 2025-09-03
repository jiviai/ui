import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Textarea } from "../../lib/components/ui/textarea";

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    leadingIcon: {
      control: "text",
    },
    trailingIcon: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    description: {
      control: "text",
    },
    descriptionIcon: {
      control: "text",
    },
    onChange: {
      action: "changed",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder text",
  },
};
