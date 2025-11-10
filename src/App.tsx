import { Header } from "../lib/components/ui/header";

export default function App() {
  return (
    <div className="min-h-screen bg-ds-grey-50">
      <Header
        title="Lorem ipsum dolor sit amet"
        size="medium"
        backButton={true}
        onBackClick={() => console.log("Back clicked")}
        buttonText="Button text"
        buttonVariant="primary"
        onButtonClick={() => console.log("Button clicked")}
        primaryIcon="info"
        onPrimaryIconClick={() => console.log("Info clicked")}
        secondaryIcon="mic"
        onSecondaryIconClick={() => console.log("Mic clicked")}
        className="border border-gray-200"
        primaryIconVariant="filled"
        secondaryIconVariant="filled"
      />
    </div>
  );
}
