import { Alert } from "../lib/components/ui/alert";
import { Slider } from "../lib/components/ui/slider";
import { ListItem } from "../lib/components/ui/list-item";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(50);
  return (
    <div className="min-h-screen p-8">
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
    </div>
  );
}

export default App;
