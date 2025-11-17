import { Header } from "../lib/components/ui/header";

export default function App() {

  return (
    <div className="min-h-screen bg-ds-grey-50">
      <Header
        title="Header"
        size="large"
        showBackButton={true}
        backButtonIcon="arrow_back"
        buttonText="Button text"
        buttonVariant="primary"
        primaryIcon="info"
        secondaryIcon="mic"
        className="sticky top-0 z-50 bg-white border-b border-ds-grey-200"
      />
    </div>
  );
}
