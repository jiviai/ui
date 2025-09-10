import type { Meta, StoryObj } from "@storybook/react";
import { List } from "../../lib/components/ui/list";
import { ListItem } from "../../lib/components/ui/list-item";

const meta = {
  title: "Molecules/List",
  component: List,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A container component for list items with rounded borders and optional dividers between items.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showDividers: {
      control: "boolean",
      description: "Whether to show dividers between list items",
    },
    size: {
      control: "select",
      options: ["default", "compact"],
      description: "Size variant of the list",
    },
    variant: {
      control: "select",
      options: ["default", "elevated"],
      description: "Visual variant of the list",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showDividers: true,
    variant: "default",
    size: "default",
  },
  render: (args) => (
    <List {...args}>
      <ListItem
        leftType="large-icon"
        leftIcon="person"
        title="John Doe"
        description="Software Engineer"
        rightStatusTitle="Status"
        rightBadgeText="Online"
        rightBadgeStatus="success"
        rightBadgeVariant="light"
        rightBadgeIcon="check_circle"
        rightBadgeIconVariant="filled"
      />
      <ListItem
        leftType="large-icon"
        leftIcon="settings"
        title="Jane Smith"
        description="Product Manager"
        rightStatusTitle="Status"
        rightBadgeText="Away"
        rightBadgeStatus="warning"
        rightBadgeVariant="light"
        rightBadgeIcon="schedule"
        rightBadgeIconVariant="filled"
      />
      <ListItem
        leftType="large-icon"
        leftIcon="code"
        title="Bob Johnson"
        description="Frontend Developer"
        rightStatusTitle="Status"
        rightBadgeText="Offline"
        rightBadgeStatus="inactive"
        rightBadgeVariant="light"
        rightBadgeIcon="offline_bolt"
        rightBadgeIconVariant="filled"
      />
    </List>
  ),
};
