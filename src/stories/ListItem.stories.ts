import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "../../lib/components/ui/list-item";

const meta = {
  title: "Molecules/ListItem",
  component: ListItem,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile list item component with configurable left, middle, and right sections supporting various content types and interactions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title text (required)",
    },
    description: {
      control: "text",
      description: "Description text (optional)",
    },
    leftType: {
      control: "select",
      options: [
        "empty",
        "small-icon",
        "large-icon",
        "small-image",
        "large-image",
        "checkbox",
        "radio",
      ],
      description: "Type of left section content",
    },
    leftIcon: {
      control: "text",
      description: "Icon name for left section",
    },
    rightIcon: {
      control: "text",
      description: "Right section icon name",
    },
    rightStatusTitle: {
      control: "text",
      description: "Status title for right section",
    },
    rightBadgeText: {
      control: "text",
      description: "Badge text for right section status",
    },
    rightBadgeIcon: {
      control: "text",
      description: "Icon name for right section badge",
    },
    rightBadgeIconVariant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "Icon variant for right section badge",
    },
    rightBadgeIconSize: {
      control: "text",
      description: "Icon size for right section badge",
    },
    buttonText: {
      control: "text",
      description: "Button text for middle section",
    },
    buttonAlignment: {
      control: "select",
      options: ["horizontal", "vertical"],
      description:
        "Button alignment when both title/description and button are present",
    },
    buttonDisabled: {
      control: "boolean",
      description: "Button disabled state for middle section",
    },
    buttonLeadingIcon: {
      control: "text",
      description: "Leading icon for middle section button",
    },
    buttonLeadingIconVariant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "Leading icon variant for middle section button",
    },
    buttonLeadingIconSize: {
      control: "text",
      description: "Leading icon size for middle section button",
    },
    buttonTrailingIcon: {
      control: "text",
      description: "Trailing icon for middle section button",
    },
    buttonTrailingIconVariant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "Trailing icon variant for middle section button",
    },
    buttonTrailingIconSize: {
      control: "text",
      description: "Trailing icon size for middle section button",
    },
    clickable: {
      control: "boolean",
      description: "Whether the list item is clickable",
    },
    disabled: {
      control: "boolean",
      description: "Whether the list item is disabled",
    },
    onClick: {
      action: "clicked",
      description: "Click handler for the list item",
    },
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftType: "large-icon",
    leftIcon: "person",
    title: "John Doe",
    description: "Software Engineer",
    rightStatusTitle: "Status",
    rightBadgeText: "Online",
    rightBadgeStatus: "success",
    rightBadgeVariant: "light",
    rightBadgeIcon: "check_circle",
    rightBadgeIconVariant: "filled",
    clickable: false,
  },
};
