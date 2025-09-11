import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../../lib/components/ui/slider";
import { fn } from "storybook/internal/test";

const meta = {
  title: "Atoms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current value of the slider",
    },
    onChange: {
      action: "changed",
      description: "Callback function when value changes",
    },
    min: {
      control: "number",
      description: "Minimum value of the slider",
    },
    max: {
      control: "number",
      description: "Maximum value of the slider",
    },
    step: {
      control: "number",
      description: "Step increment for the slider",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
};
