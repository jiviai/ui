import { Button } from "../lib/components/ui/button";
import { Icon } from "../lib/components/icon";
import { Input } from "../lib/components/ui/input";
import { ListItem } from "../lib/components/ui/list-item";

function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8 flex flex-col gap-8">
        <Icon name="home" className="text-green-500" variant="filled" />
        <Button
          leadingIcon="home"
          leadingIconVariant="filled"
          leadingIconSize="20px"
          trailingIcon="chevron_right"
          trailingIconVariant="outlined"
          trailingIconSize="20px"
        >
          Click me
        </Button>
        <div className="space-y-4">
          <h2>Input Test</h2>
          <Input
            label="Test Label"
            placeholder="Enter some text"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="space-y-4">
        <ListItem
          title="List Item"
          description="List Item Description"
          leftType="small-icon"
          leftIcon="home"
          rightIcon="home"
        />
        <ListItem
          title="List Item"
          description="List Item Description"
          leftType="large-icon"
          leftIcon="home"
          rightBadgeText="10"
          rightBadgeStatus="success"
          rightStatusTitle="Status"
          rightBadgeVariant="outline"
          rightBadgeIcon="check_circle"
          rightBadgeIconVariant="filled"
          rightBadgeIconSize="12px"
        />
        <ListItem
          title="List Item"
          description="List Item Description"
          leftType="small-icon"
          leftIcon="home"
          buttonText="Click me"
          buttonAlignment="horizontal"
          buttonLeadingIcon="home"
          buttonTrailingIcon="chevron_right"
          onButtonClick={() => {
            console.log("Button clicked");
          }}
          rightIcon="home"
          rightIconVariant="filled"
          rightIconSize="20px"
        />
        <ListItem
          title="List Item"
          description="List Item Description"
          leftType="small-icon"
          leftIcon="home"
        />
        <ListItem
          title="List Item"
          description="List Item Description"
          leftType="small-icon"
          leftIcon="home"
        />
      </div>
    </div>
  );
}

export default App;
