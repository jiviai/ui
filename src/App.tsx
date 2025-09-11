import { Alert } from "../lib/components/ui/alert";

function App() {
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
        className="rounded-xl"
      />
    </div>
  );
}

export default App;
