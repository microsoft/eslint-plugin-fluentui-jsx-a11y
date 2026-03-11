# Copilot Instructions

## Project Overview

This is `@microsoft/eslint-plugin-fluentui-jsx-a11y`, a static AST checker (ESLint plugin) that enforces accessibility rules on [Fluent UI React v9](https://react.fluentui.dev/) (`@fluentui/react-components`) JSX elements. Rules are written in TypeScript and target specific Fluent UI components to ensure accessible labeling, ARIA usage, and semantic structure.

## Technology Stack

- **Language:** TypeScript
- **Runtime:** Node.js (^14.17.0 || ^16.0.0 || >= 18.0.0)
- **Test framework:** Jest with `ts-jest`
- **ESLint version:** >=7 (peer dependency)
- **Key libraries:** `@typescript-eslint/utils`, `jsx-ast-utils`, `estree-jsx`

## Repository Structure

```
lib/
  rules/            # One file per ESLint rule (e.g., avatar-needs-name.ts)
    buttons/        # Button-specific rules grouped in a sub-folder
  util/             # Shared utility functions used by rules
    ruleFactory.ts  # Factory function for creating labeling rules
    hasLabeledChild.ts
    hasNonEmptyProp.ts
    labelUtils.ts
    ... (other utilities)
  index.ts          # Exports all rules
tests/
  lib/
    rules/          # One test file per rule (e.g., avatar-needs-name.test.ts)
      helper/       # Shared test helpers (ruleTester)
    util/           # Tests for utility functions
scripts/
  create-rule.js    # Scaffolding script to generate a new rule
  boilerplate/      # Templates used by create-rule.js
docs/               # Rule documentation
```

## Common Commands

```sh
# Install dependencies
npm install

# Build (compiles TypeScript to dist/)
npm run build

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linters (ESLint + markdownlint + eslint-doc check)
npm run lint

# Fix markdown lint issues
npm run fix:md

# Update rule documentation
npm run update:eslint-docs

# Scaffold a new rule (interactive)
node ./scripts/create-rule
```

## Creating a New ESLint Rule

### Option 1 — Rule Factory (preferred for labeling rules)

Most accessibility rules in this plugin check whether a component has an accessible label. Use `makeLabeledControlRule` from `lib/util/ruleFactory.ts`:

```typescript
// lib/rules/my-component-needs-labelling.ts
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeLabeledControlRule } from "../util/ruleFactory";

export default makeLabeledControlRule({
    component: "MyComponent",           // string or RegExp
    messageId: "myComponentNeedsLabel",
    description: "Accessibility: MyComponent must have an accessible label.",

    // Labeling strategies to accept (set true for what is valid for this component):
    labelProps: ["aria-label"],
    allowFieldParent: true,
    allowHtmlFor: false,
    allowLabelledBy: true,
    allowWrappingLabel: false,
    allowTooltipParent: false,
    allowDescribedBy: false,
    allowLabeledChild: false,
    allowTextContentChild: false,
});
```

### Option 2 — Custom Rule (for complex validation)

When the factory pattern does not fit, use `ESLintUtils.RuleCreator.withoutDocs`:

```typescript
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { JSXOpeningElement } from "estree-jsx";

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: { missingLabel: "Accessibility: MyComponent must have an accessible name." },
        type: "problem",
        docs: { description: "...", recommended: "strict", url: "https://www.w3.org/TR/html-aria/" },
        schema: []
    },
    create(context) {
        return {
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                if (elementType(node as unknown as JSXOpeningElement) !== "MyComponent") return;
                // validation logic...
                context.report({ node, messageId: "missingLabel" });
            }
        };
    }
});

export default rule;
```

After creating the rule file:
1. Add the export to `lib/rules/index.ts`.
2. Create a matching test file in `tests/lib/rules/`.

### Using the Scaffolding Script

```sh
node ./scripts/create-rule
```

This generates the rule file, test file, and documentation stubs automatically.

## Writing Tests

Tests use a shared `ruleTester` helper (`tests/lib/rules/helper/ruleTester.ts`) and follow the pattern below:

```typescript
// tests/lib/rules/my-component-needs-labelling.test.ts
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/my-component-needs-labelling";

ruleTester.run("my-component-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        '<MyComponent aria-label="Description" />',
        // ...more valid cases
    ],
    invalid: [
        {
            code: "<MyComponent />",
            errors: [{ messageId: "myComponentNeedsLabel" }]
        },
        // ...more invalid cases
    ]
});
```

## Utility Functions

| Function | File | Purpose |
|---|---|---|
| `makeLabeledControlRule` | `ruleFactory.ts` | Factory for labeling rules |
| `hasAccessibleLabel` | `ruleFactory.ts` | Central labeling check |
| `hasNonEmptyProp` | `hasNonEmptyProp.ts` | Check a prop has a non-empty value |
| `hasDefinedProp` | `hasDefinedProp.ts` | Check a prop is present |
| `hasLabeledChild` | `hasLabeledChild.ts` | Detect accessible child content (img alt, svg title, etc.) |
| `hasTextContentChild` | `hasTextContentChild.ts` | Detect meaningful text in children |
| `hasFieldParent` | `hasFieldParent.ts` | Detect a `<Field>` ancestor |
| `hasToolTipParent` | `hasTooltipParent.ts` | Detect a `<Tooltip>` ancestor |
| `isInsideLabelTag` | `labelUtils.ts` | Detect a wrapping `<label>` / `<Label>` |
| `hasAssociatedLabelViaAriaLabelledBy` | `labelUtils.ts` | Validate `aria-labelledby` references |
| `hasAssociatedLabelViaHtmlFor` | `labelUtils.ts` | Validate `htmlFor`/`id` associations |
| `hasAssociatedLabelViaAriaDescribedby` | `labelUtils.ts` | Validate `aria-describedby` references |

## Code Conventions

- All files must start with the Microsoft copyright header:
  ```typescript
  // Copyright (c) Microsoft Corporation.
  // Licensed under the MIT License.
  ```
- Use `ESLintUtils.RuleCreator.withoutDocs` for custom rules.
- Prefer the `makeLabeledControlRule` factory for straightforward labeling rules.
- Report errors on the **opening element** (`node: opening`) for accurate source locations.
- All new rules must be exported from `lib/rules/index.ts`.
- Run `npm run build` after adding or modifying rules to update the `dist/` output.
- Run `npm run update:eslint-docs` after changing rule metadata to keep documentation in sync.
