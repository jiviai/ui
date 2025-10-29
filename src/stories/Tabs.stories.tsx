import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../lib/components/ui/tabs";

type TabsStoryArgs = {
  defaultValue: string;
  size: "small" | "medium" | "large";
  icon1: string;
  icon2: string;
  icon3: string;
  showIcons: boolean;
  iconVariant: "filled" | "outlined";
};

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "select",
      options: ["account", "password", "settings"],
      description: "The default active tab",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the tab triggers",
    },
    showIcons: {
      control: "boolean",
      description: "Show icons in tabs",
    },
    iconVariant: {
      control: "select",
      options: ["outlined", "filled"],
      description: "Icon style variant",
      if: { arg: "showIcons", truthy: true },
    },
    icon1: {
      control: "text",
      description: "Icon for first tab (e.g., person, home)",
      if: { arg: "showIcons", truthy: true },
    },
    icon2: {
      control: "text",
      description: "Icon for second tab (e.g., lock, settings)",
      if: { arg: "showIcons", truthy: true },
    },
    icon3: {
      control: "text",
      description: "Icon for third tab (e.g., settings, tune)",
      if: { arg: "showIcons", truthy: true },
    },
  } as any,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<Meta<typeof Tabs> & { args: TabsStoryArgs }>;

export const Default: Story = {
  args: {
    defaultValue: "account",
    size: "medium",
    showIcons: true,
    iconVariant: "outlined",
    icon1: "person",
    icon2: "lock",
    icon3: "settings",
  } as any,
  render: (args: any) => (
    <Tabs key={args.defaultValue} defaultValue={args.defaultValue} className="w-[400px]">
      <TabsList size={args.size}>
        <TabsTrigger 
          value="account" 
          icon={args.showIcons ? args.icon1 : undefined}
          iconVariant={args.iconVariant}
        >
          Account
        </TabsTrigger>
        <TabsTrigger 
          value="password" 
          icon={args.showIcons ? args.icon2 : undefined}
          iconVariant={args.iconVariant}
        >
          Password
        </TabsTrigger>
        <TabsTrigger 
          value="settings" 
          icon={args.showIcons ? args.icon3 : undefined}
          iconVariant={args.iconVariant}
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <p className="text-sm text-ds-grey-600">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Password</h3>
          <p className="text-sm text-ds-grey-600">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-sm text-ds-grey-600">
            Update your preferences and settings here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
