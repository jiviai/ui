import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Banner } from "../../lib/components/ui/banner";

const meta = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile banner component with configurable image positioning, background variants, and flexible layout options. Perfect for promotional content, announcements, and featured sections.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: { type: "text" },
      description: "Main heading/title text",
    },
    description: {
      control: { type: "text" },
      description: "Subtitle text displayed below the title",
    },
    infoText: {
      control: { type: "text" },
      description: "Informational text displayed in the info section with icon",
    },
    buttonText: {
      control: { type: "text" },
      description: "Text for the call-to-action button",
    },
    onClick: {
      action: "button clicked",
      description: "Callback when button is clicked",
    },
    imageUrl: {
      control: { type: "text" },
      description: "URL for the image (e.g., from Unsplash)",
    },
    imageAlt: {
      control: { type: "text" },
      description: "Alt text for the image",
    },
    variant: {
      control: { type: "select" },
      options: ["row", "column"],
      description: "Layout variant - row (side by side) or column (stacked)",
    },
    imageAlignment: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "Position of the image in row layout",
    },
    isBgColor: {
      control: { type: "boolean" },
      description:
        "Whether to use primary gradient background for image & heading section",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Banner - Row layout with image left
export const Default: Story = {
  args: {
    heading: "Discover New Features",
    description: "Explore the latest updates and improvements",
    infoText: "Available for all premium users",
    buttonText: "Learn More",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    imageAlt: "Featured image",
    variant: "row",
    imageAlignment: "left",
    isBgColor: false,
    className: "w-full max-w-md",
  },
};
