import { Button } from "../../../lib/main";
import { useState } from "react";

export const ButtonConfig = () => {
  const [buttonConfig, setButtonConfig] = useState({
    variant: "primary" as "primary" | "secondary" | "tertiary",
    size: "medium" as "small" | "medium" | "large",
    disabled: false,
    leadingIcon: "none" as "none" | "default",
    trailingIcon: "none" as "none" | "default",
    text: "Click me",
  });

  const updateConfig = (key: string, value: any) => {
    setButtonConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Configuration Panel */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Configuration
        </h2>

        {/* Button Text */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Button Text
          </label>
          <input
            type="text"
            value={buttonConfig.text}
            onChange={(e) => updateConfig("text", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter button text"
          />
        </div>

        {/* Variant Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Variant
          </label>
          <select
            value={buttonConfig.variant}
            onChange={(e) => updateConfig("variant", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
          </select>
        </div>

        {/* Size Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <select
            value={buttonConfig.size}
            onChange={(e) => updateConfig("size", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Disabled Checkbox */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={buttonConfig.disabled}
              onChange={(e) => updateConfig("disabled", e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">Disabled</span>
          </label>
        </div>

        {/* Leading Icon Toggle */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Leading Icon
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="leadingIcon"
                value="none"
                checked={buttonConfig.leadingIcon === "none"}
                onChange={(e) => updateConfig("leadingIcon", e.target.value)}
                className="mr-2 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">None</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="leadingIcon"
                value="default"
                checked={buttonConfig.leadingIcon === "default"}
                onChange={(e) => updateConfig("leadingIcon", e.target.value)}
                className="mr-2 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">
                Default (chevron_left)
              </span>
            </label>
          </div>
        </div>

        {/* Trailing Icon Toggle */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Trailing Icon
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="trailingIcon"
                value="none"
                checked={buttonConfig.trailingIcon === "none"}
                onChange={(e) => updateConfig("trailingIcon", e.target.value)}
                className="mr-2 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">None</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="trailingIcon"
                value="default"
                checked={buttonConfig.trailingIcon === "default"}
                onChange={(e) => updateConfig("trailingIcon", e.target.value)}
                className="mr-2 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">
                Default (chevron_right)
              </span>
            </label>
          </div>
        </div>

        {/* Configuration Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Current Configuration:
          </h3>
          <pre className="text-xs text-gray-600 font-mono">
            {`<Button
variant="${buttonConfig.variant}"
size="${buttonConfig.size}"${
              buttonConfig.disabled ? `\n  disabled={true}` : ""
            }${
              buttonConfig.leadingIcon !== "none"
                ? `\n  leadingIcon="${buttonConfig.leadingIcon}"`
                : ""
            }${
              buttonConfig.trailingIcon !== "none"
                ? `\n  trailingIcon="${buttonConfig.trailingIcon}"`
                : ""
            }
>
${buttonConfig.text}
</Button>`}
          </pre>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Live Preview
        </h2>

        <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg">
          <Button
            variant={buttonConfig.variant}
            size={buttonConfig.size}
            disabled={buttonConfig.disabled}
            leadingIcon={
              buttonConfig.leadingIcon === "none"
                ? undefined
                : buttonConfig.leadingIcon
            }
            trailingIcon={
              buttonConfig.trailingIcon === "none"
                ? undefined
                : buttonConfig.trailingIcon
            }
          >
            {buttonConfig.text}
          </Button>
        </div>

        {/* Button Details */}
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-medium text-gray-700">Button Details:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Variant:</span>
              <span className="ml-2 capitalize">{buttonConfig.variant}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Size:</span>
              <span className="ml-2 capitalize">{buttonConfig.size}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Disabled:</span>
              <span className="ml-2">
                {buttonConfig.disabled ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Icons:</span>
              <span className="ml-2">
                {buttonConfig.leadingIcon !== "none" &&
                buttonConfig.trailingIcon !== "none"
                  ? "Leading + Trailing"
                  : buttonConfig.leadingIcon !== "none"
                  ? "Leading only"
                  : buttonConfig.trailingIcon !== "none"
                  ? "Trailing only"
                  : "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
