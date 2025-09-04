# @jivi.ai/design-system

A modern React component library built with Tailwind CSS and Radix UI primitives.

## Installation

```bash
npm install @jivi.ai/design-system
```

## Setup

### Import CSS Styles

```css
/* In your main CSS file */
@import "@jivi.ai/design-system/styles";
```

## Available Components

This design system includes the following components:

- **Button** - Primary, secondary, and tertiary button variants with multiple sizes
- **IconButton** - Compact button with icon only
- **Input** - Text input field with validation states
- **Textarea** - Multi-line text input
- **Chip** - Small interactive elements for tags, filters, or selections
- **Badge** - Status indicators and labels
- **IconBadge** - Badge with icon support
- **RadioButton** - Single selection from multiple options
- **Checkbox** - Multiple selection input
- **ListItem** - Structured list components
- **Icon** - Icon component using Lucide React icons

## Usage

### Basic Example

```tsx
import { Button, Input, Chip } from "@jivi.ai/design-system";

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Get Started
      </Button>
      <Input placeholder="Enter your email" />
      <Chip variant="default">React</Chip>
    </div>
  );
}
```

### Button Variants

```tsx
import { Button } from "@jivi.ai/design-system";

function ButtonExamples() {
  return (
    <div>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  );
}
```

## Development

### Running Storybook

To view and interact with all components:

```bash
npm run storybook
```

### Building the Library

```bash
npm run build
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the library for production
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run lint` - Run ESLint

## Peer Dependencies

This library requires React 18.2.0 or higher:

```json
{
  "react": ">=18.2.0 <20",
  "react-dom": ">=18.2.0 <20"
}
```

## Built With

- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful & consistent icons
- **Class Variance Authority** - Component variant management
- **Storybook** - Component development and documentation
