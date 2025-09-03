import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "../../lib/components/ui/radio-button";
import { fn } from "storybook/internal/test";

const meta = {
  title: "Atoms/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: "boolean",
      description: "Whether the radio button is selected",
    },
    onChange: {
      action: "changed",
      description: "Callback function when selection changes",
    },
    label: {
      control: "text",
      description: "Label text displayed next to the radio button",
    },
    description: {
      control: "text",
      description: "Optional description text displayed below the label",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio button is disabled",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: false,
    label: "Default Option",
    description: "This is a default radio button option",
    disabled: false,
  },
};
