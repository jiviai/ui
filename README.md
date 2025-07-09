# @jivi-ai/ui

A modern React component library built with Tailwind CSS.

## Installation

```bash
npm install @jivi-ai/ui
```

## Setup

### 1. Import CSS Styles

```css
/* In your main CSS file */
@import "@jivi-ai/ui/styles";
```

### 2. Add Material Symbols Stylesheet

Add this to your HTML head or import in your CSS:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
  rel="stylesheet"
/>
```

## Usage

```tsx
import { Button, Icon } from "@jivi-ai/ui";

function App() {
  return (
    <div>
      <Button variant="primary">
        <Icon name="home" size="20px" />
        Get Started
      </Button>
    </div>
  );
}
```
