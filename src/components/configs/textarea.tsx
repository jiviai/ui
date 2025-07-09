import { Textarea } from "../../../lib/main";
import { useState } from "react";

export const TextareaConfig = () => {
  const [inputConfig, setInputConfig] = useState({
    label: "Name",
    placeholder: "Enter your name",
    size: "medium" as "small" | "medium" | "large",
    disabled: false,
    error: false,
    leadingIcon: "none" as "none" | "person" | "email" | "search" | "phone",
    trailingIcon: "none" as "none" | "visibility" | "clear" | "chevron_down",
    value: "",
    description: "This is a description",
    descriptionIcon: "info",
  });

  const updateConfig = (key: string, value: any) => {
    setInputConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateConfig("value", e.target.value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Configuration Panel */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Configuration
        </h2>

        {/* Label */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <input
            type="text"
            value={inputConfig.label}
            onChange={(e) => updateConfig("label", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter label text"
          />
        </div>

        {/* Placeholder */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Placeholder
          </label>
          <input
            type="text"
            value={inputConfig.placeholder}
            onChange={(e) => updateConfig("placeholder", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter placeholder text"
          />
        </div>

        {/* Size Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <select
            value={inputConfig.size}
            onChange={(e) => updateConfig("size", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Leading Icon Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Leading Icon
          </label>
          <select
            value={inputConfig.leadingIcon}
            onChange={(e) => updateConfig("leadingIcon", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="none">None</option>
            <option value="person">Person</option>
            <option value="email">Email</option>
            <option value="search">Search</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {/* Trailing Icon Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Trailing Icon
          </label>
          <select
            value={inputConfig.trailingIcon}
            onChange={(e) => updateConfig("trailingIcon", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="none">None</option>
            <option value="visibility">Visibility</option>
            <option value="clear">Clear</option>
            <option value="chevron_down">Chevron Down</option>
          </select>
        </div>

        {/* Disabled Checkbox */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={inputConfig.disabled}
              onChange={(e) => updateConfig("disabled", e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">Disabled</span>
          </label>
        </div>

        {/* Error State Checkbox */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={inputConfig.error}
              onChange={(e) => updateConfig("error", e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Error State
            </span>
          </label>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={inputConfig.description}
            onChange={(e) => updateConfig("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter description text"
          />
        </div>

        {/* Description Icon */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description Icon
          </label>
          <select
            value={inputConfig.descriptionIcon}
            onChange={(e) => updateConfig("descriptionIcon", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="none">None</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        {/* Configuration Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Current Configuration:
          </h3>
          <pre className="text-xs text-gray-600 font-mono">
            {`<Textarea
  label="${inputConfig.label}"
  placeholder="${inputConfig.placeholder}"
  size="${inputConfig.size}"${
              inputConfig.disabled ? "\n  disabled={true}" : ""
            }${inputConfig.error ? "\n  error={true}" : ""}${
              inputConfig.leadingIcon !== "none"
                ? `\n  leadingIcon="${inputConfig.leadingIcon}"`
                : ""
            }${
              inputConfig.trailingIcon !== "none"
                ? `\n  trailingIcon="${inputConfig.trailingIcon}"`
                : ""
            }${inputConfig.value ? `\n  value="${inputConfig.value}"` : ""}
/>`}
          </pre>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Live Preview
        </h2>

        <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg p-8">
          <div className="w-full max-w-md">
            <Textarea
              label={inputConfig.label}
              placeholder={inputConfig.placeholder}
              size={inputConfig.size}
              disabled={inputConfig.disabled}
              error={inputConfig.error}
              leadingIcon={
                inputConfig.leadingIcon === "none"
                  ? undefined
                  : inputConfig.leadingIcon
              }
              trailingIcon={
                inputConfig.trailingIcon === "none"
                  ? undefined
                  : inputConfig.trailingIcon
              }
              value={inputConfig.value}
              onChange={handleValueChange}
              description={inputConfig.description}
              descriptionIcon={
                inputConfig.descriptionIcon === "none"
                  ? undefined
                  : inputConfig.descriptionIcon
              }
            />
          </div>
        </div>

        {/* Input Details */}
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-medium text-gray-700">
            Textarea Details:
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-600">Label:</span>
                <span className="ml-2">{inputConfig.label}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Size:</span>
                <span className="ml-2 capitalize">{inputConfig.size}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Placeholder:</span>
                <span className="ml-2">{inputConfig.placeholder}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-600">Leading Icon:</span>
                <span className="ml-2">
                  {inputConfig.leadingIcon === "none"
                    ? "None"
                    : inputConfig.leadingIcon}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Trailing Icon:
                </span>
                <span className="ml-2">
                  {inputConfig.trailingIcon === "none"
                    ? "None"
                    : inputConfig.trailingIcon}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-600">Disabled:</span>
                <span className="ml-2">
                  {inputConfig.disabled ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Error State:</span>
                <span className="ml-2">{inputConfig.error ? "Yes" : "No"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-600">Description:</span>
                <span className="ml-2">{inputConfig.description}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Description Icon:
                </span>
                <span className="ml-2">
                  {inputConfig.descriptionIcon === "none"
                    ? "None"
                    : inputConfig.descriptionIcon}
                </span>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Current Value:</span>
              <span className="ml-2">{inputConfig.value || "(empty)"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
