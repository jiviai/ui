import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../lib/components/ui/badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "light", "dark", "outline"],
    },
    status: {
      control: { type: "select" },
      options: ["default", "success", "warning", "error", "inactive"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    icon: {
      control: { type: "text" },
    },
    iconVariant: {
      control: { type: "select" },
      options: ["filled", "outlined"],
    },
    children: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};
