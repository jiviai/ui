import type { Meta, StoryObj } from "@storybook/react";
import { IconBadge } from "../../lib/components/ui/icon-badge";

const meta: Meta<typeof IconBadge> = {
  title: "Atoms/IconBadge",
  component: IconBadge,
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "star",
    variant: "default",
    status: "default",
    size: "md",
  },
};
