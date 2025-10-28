import { Alert } from "../lib/components/ui/alert";
import { Slider } from "../lib/components/ui/slider";
import { ListItem } from "../lib/components/ui/list-item";
import { useState } from "react";
import { Banner } from "../../ui/lib/components/ui/banner";

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

      <Banner
        heading="Lorem ipsum"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        infoText="This is important information about the banner"
        buttonText="Button text"
        imageUrl="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop"
        onClick={() => console.log("Viewing profiles")}
        className="w-full border border-ds-grey-100"
        imageAlt="Meet Our Team"
        isBgColor={false}
        imageAlignment="left"
        variant="row"
      />
    </div>
  );
}

export default App;
