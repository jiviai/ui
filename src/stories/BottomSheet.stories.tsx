import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  BottomSheet,
  BottomSheetCloseButton,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetMiddleContent,
  BottomSheetTitle,
} from "../../lib/components/ui/bottom-sheet";
import { Button } from "../../lib/components/ui/button";
import { Icon } from "../../lib/components/icon";

type BottomSheetStoryArgs = {
  title: string;
  description: string;
  showCloseButton: boolean;
  showFooter: boolean;
};

const meta = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title text for the bottom sheet",
    },
    description: {
      control: "text",
      description: "Description text for the bottom sheet",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show the close button (X icon)",
    },
    showFooter: {
      control: { type: "boolean" },
      description: "Show the footer section",
    },
  },
  args: {
    title: "Edit profile",
    description: "Make changes to your profile here. Click save when you're done.",
    showCloseButton: true,
    showFooter: true,
  },
} satisfies Meta<typeof BottomSheet> & { argTypes: any; args: any };

export default meta;
type Story = StoryObj<Meta<typeof BottomSheet> & { args: BottomSheetStoryArgs }>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        state: 'open',
      },
    },
  },
  render: (args: any) => {
    const [open, setOpen] = useState(false);
    const storyArgs = args as BottomSheetStoryArgs;
    
    return (
      <div className="flex items-center justify-center p-4">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Bottom Sheet
        </Button>
        <BottomSheet open={open} onOpenChange={setOpen}>
          <BottomSheetContent height="70%" showFooter={storyArgs.showFooter ?? true}>
            <BottomSheetHeader>
              <BottomSheetTitle>
                {storyArgs.title}
                {storyArgs.showCloseButton && (
                  <BottomSheetCloseButton iconName="close"></BottomSheetCloseButton>
                )}
              </BottomSheetTitle>
              <BottomSheetDescription>
                {storyArgs.description}
              </BottomSheetDescription>
            </BottomSheetHeader>

            {/* Middle Content Section - Scrollable area between header and footer */}
            <BottomSheetMiddleContent
              
            >
              <div className="py-4">
                <p className="text-sm text-ds-grey-600 mb-4">
                  This is a description for the bottom sheet, describing any action required.
                </p>
                <p className="text-sm text-ds-grey-400 text-center">
                  Description text
                </p>
              </div>
              
              {/* Additional Testing Content */}
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-ds-grey-50 rounded-lg border border-ds-grey-200">
                  <p className="text-sm font-medium text-ds-grey-900 mb-2">Additional Content</p>
                  <p className="text-xs text-ds-grey-600">
                    This is additional content inside the bottom sheet for testing purposes.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="secondary" size="small">
                    <Icon name="edit" variant="outlined" size="16px" />
                    Edit
                  </Button>
                  <Button variant="tertiary" size="small">
                    <Icon name="delete" variant="outlined" size="16px" />
                    Delete
                  </Button>
                  <Button variant="tertiary" size="small">
                    <Icon name="share" variant="outlined" size="16px" />
                    Share
                  </Button>
                </div>
                
                <div className="p-4 bg-ds-orange-50 rounded-lg border border-ds-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="info" variant="outlined" size="20px" className="text-ds-orange-600" />
                    <p className="text-sm font-medium text-ds-orange-900">Information Box</p>
                  </div>
                  <p className="text-xs text-ds-orange-700">
                    This bottom sheet contains various content types including buttons, cards, and information boxes.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white border border-ds-grey-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="person" variant="outlined" size="20px" className="text-ds-grey-600" />
                      <div>
                        <p className="text-sm font-medium text-ds-grey-900">Profile Settings</p>
                        <p className="text-xs text-ds-grey-500">Manage your profile</p>
                      </div>
                    </div>
                    <Icon name="chevron_right" variant="outlined" size="20px" className="text-ds-grey-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-ds-grey-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="notifications" variant="outlined" size="20px" className="text-ds-grey-600" />
                      <div>
                        <p className="text-sm font-medium text-ds-grey-900">Notifications</p>
                        <p className="text-xs text-ds-grey-500">Configure alerts</p>
                      </div>
                    </div>
                    <Icon name="chevron_right" variant="outlined" size="20px" className="text-ds-grey-400" />
                  </div>
                </div>
              </div>
            </BottomSheetMiddleContent>

            {(storyArgs.showFooter ?? true) && (
              <BottomSheetFooter>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => setOpen(false)}>
                  Save
                </Button>
              </BottomSheetFooter>
            )}
          </BottomSheetContent>
        </BottomSheet>
      </div>
    );
  },
};
