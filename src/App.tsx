import { ButtonConfig } from "./components/configs/button";
import { IconButtonConfig } from "./components/configs/icon-button";
import { InputConfig } from "./components/configs/input";
import { TextareaConfig } from "./components/configs/textarea";

function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Button Config</h1>
        <ButtonConfig />
        <h1 className="text-2xl font-bold">Icon Button Config</h1>
        <IconButtonConfig />
        <h1 className="text-2xl font-bold">Input Config</h1>
        <InputConfig />
        <h1 className="text-2xl font-bold">Textarea Config</h1>
        <TextareaConfig />
      </div>
    </div>
  );
}

export default App;
