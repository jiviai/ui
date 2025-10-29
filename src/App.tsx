import { Alert } from "../lib/components/ui/alert";
import { Slider } from "../lib/components/ui/slider";
import { ListItem } from "../lib/components/ui/list-item";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../lib/components/ui/tabs";

function App() {
  const [value, setValue] = useState(50);
  return (
    <div className="min-h-screen p-8 flex flex-col gap-6">
      <Alert
        variant="small"
        leftIcon="info"
        status="warning"
        heading="Success"
        subheading="This is a success alert"
        buttonText="Continue"
        onButtonClick={() => console.log("Continue")}
        rightIcon="close"
        onRightIconClick={() => console.log("Close")}
        className=""
      />
      <Slider value={value} onChange={setValue} min={0} max={100} />
      <ListItem
        clickable
        leftType="large-icon"
        leftIcon="person"
        title="John Doe"
        description="Software Engineer"
        onClick={() => console.log("Button clicked")}
      />


     {/* tabs design */}
      <Tabs defaultValue="account" className="w-full">
        <TabsList size="medium">
          <TabsTrigger value="account" icon="person">
            Account
          </TabsTrigger>
          <TabsTrigger value="password" icon="lock">
            Password
          </TabsTrigger>
          <TabsTrigger value="customize" icon="tune">
            Customize
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="p-4 bg-white rounded-lg ">
            <h3 className="text-lg font-semibold mb-2">Account</h3>
            <p className="text-sm text-ds-grey-600">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="p-4 bg-white rounded-lg ">
            <h3 className="text-lg font-semibold mb-2">Password</h3>
            <p className="text-sm text-ds-grey-600">
              Change your password here. After saving, you'll be logged out.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="customize">
          <div className="p-4 bg-white rounded-lg ">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-sm text-ds-grey-600">
              Update your preferences and settings here.
            </p>
          </div>
        </TabsContent>
      </Tabs>


    </div>
  );
}

export default App;
