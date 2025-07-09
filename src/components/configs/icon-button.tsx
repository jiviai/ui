import { IconButton } from "../../../lib/main";
import { useState } from "react";

export const IconButtonConfig = () => {
  const [buttonConfig, setButtonConfig] = useState({
    variant: "primary" as "primary" | "secondary" | "tertiary",
    size: "medium" as "small" | "medium" | "large",
    disabled: false,
    iconName: "chevron_right",
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

        {/* Icon Name Toggle */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Icon Name
          </label>
          <input
            type="text"
            name="iconName"
            value={buttonConfig.iconName}
            onChange={(e) => updateConfig("iconName", e.target.value)}
            className="mr-2 text-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Configuration Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Current Configuration:
          </h3>
          <pre className="text-xs text-gray-600 font-mono">
            {`<IconButton
    variant="${buttonConfig.variant}"
    size="${buttonConfig.size}"
    ${buttonConfig.disabled ? "disabled" : ""}
    iconName="${buttonConfig.iconName}"
/>`}
          </pre>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Live Preview
        </h2>

        <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg">
          <IconButton
            variant={buttonConfig.variant}
            size={buttonConfig.size}
            disabled={buttonConfig.disabled}
            iconName={buttonConfig.iconName}
          />
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
              <span className="font-medium text-gray-600">Icon Name:</span>
              <span className="ml-2">{buttonConfig.iconName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
