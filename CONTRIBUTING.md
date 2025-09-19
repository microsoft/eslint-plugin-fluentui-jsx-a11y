# Contributing

This project welcomes contributions and suggestions. Most contributions require you to
agree to a Contributor License Agreement (CLA) declaring that you have the right to,
and actually do, grant us the rights to use your contribution. For details, visit
<https://cla.microsoft.com>.

When you submit a pull request, a CLA-bot will automatically determine whether you need
to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the
instructions provided by the bot. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Table of Contents

[Dev Environment](#dev-environment)
[Rule Factory System](#rule-factory-system)
[Creating New Rules](#creating-new-rules)
[Utility Functions](#utility-functions)
[Pull requests](#pull-requests)

## Dev Environment

-   Install [Visual Studio Code](https://code.visualstudio.com/).

-   Install the [recommended plugins](#recommended-vs-code-extensions) for [Visual Studio Code](https://code.visualstudio.com/).

-   Install [Node.js](https://nodejs.org/en/), with [nvm](https://github.com/nvm-sh/nvm). Please use Node version 16 and npm v 8.

-   Install [jscodeshift](https://github.com/facebook/jscodeshift) globally.

-   **Internal collaborators:** Please send Aubrey Quinn your email address. After getting `Write` access, you can create branches and directly submit pull requests against this repo. Make and submit changes following the [pull request submission workflow](#pull-requests)
-   **External collaborators:** [Fork the repo and clone your fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

-   Install the dependencies

    ```sh
    npm install
    ```

-   Add the upstream source for being able to sync main project changes back into your fork.

    ```sh
    git remote add upstream git@github.com:microsoft/fluentui-eslint-plugin-jsx-a11y.git
    ```

-   Run the tests

    ```sh
    npm test
    ```

-   Make and submit changes following the [pull request submission workflow](#pull-requests)

##  Recommended VS Code Extensions

To ensure a consistent and productive development environment, install the following extensions in Visual Studio Code:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — Linting for JavaScript/TypeScript.
- [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) — Run or debug Jest tests from context menu.
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — Code formatting using Prettier.
- [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint) — Format code with Prettier and ESLint integration.
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) — Linting and style checks for Markdown files.

## Rule Factory System

This plugin uses a powerful rule factory system that provides consistent behavior across accessibility rules. The factory system is built around the `ruleFactory` function in `lib/util/ruleFactory.ts` and several utility functions for validating accessible labeling.

### Core Concept

The rule factory centralizes common accessibility validation patterns, making it easy to create new rules with consistent behavior. Instead of implementing validation logic from scratch, rules can leverage the factory's built-in utilities.

### Architecture

```sh
ruleFactory(config) → ESLint Rule
    ↓
hasAccessibleLabel(opening, element, context, config) → boolean
    ↓
Utility Functions:
├── hasAssociatedLabelViaAriaLabelledBy(opening, context)
├── hasAssociatedLabelViaHtmlFor(opening, context)  
├── hasAssociatedLabelViaAriaDescribedby(opening, context)
├── hasLabeledChild(opening, context)
├── hasTextContentChild(element)
└── isInsideLabelTag(context)
```

## Creating New Rules

### Using the Rule Factory

For most accessibility rules, use the rule factory:

```typescript
import { ruleFactory, LabeledControlConfig } from '../util/ruleFactory';

const rule = ruleFactory({
  component: 'YourComponent', // string or regex pattern
  message: 'YourComponent needs accessible labeling',
  
  // Validation options (all optional, default false)
  allowTextContentChild: true,      // Allow text content in children
  allowLabeledChild: true,          // Allow images with alt, icons, etc.
  allowHtmlFor: true,               // Allow htmlFor/id label association
  allowLabelledBy: true,            // Allow aria-labelledby
  allowDescribedBy: false,          // Allow aria-describedby (discouraged as primary)
  allowWrappingLabel: true,         // Allow wrapping in <Label> tag
  allowTooltipParent: false,        // Allow parent <Tooltip>
  allowFieldParent: true,           // Allow parent <Field>
  
  // Property validation
  labelProps: ['aria-label'],       // Props that provide labeling
  requiredProps: ['role'],          // Props that must be present
});

export default rule;
```

### Configuration Options

| Option | Description | Example Use Cases |
|--------|-------------|-------------------|
| `allowTextContentChild` | Allows text content in child elements | Buttons, links with text |
| `allowLabeledChild` | Allows accessible child content (images with alt, icons, aria-labeled elements) | Icon buttons, image buttons |
| `allowHtmlFor` | Allows label association via `htmlFor`/`id` | Form inputs, interactive controls |
| `allowLabelledBy` | Allows `aria-labelledby` references | Complex components referencing external labels |
| `allowDescribedBy` | Allows `aria-describedby` (discouraged for primary labeling) | Rare cases where description suffices |
| `allowWrappingLabel` | Allows element to be wrapped in `<Label>` | Form controls |
| `allowTooltipParent` | Allows parent `<Tooltip>` as accessible name | Simple tooltips (use sparingly) |
| `allowFieldParent` | Allows parent `<Field>` component | FluentUI form fields |

### Custom Rules

For complex validation that doesn't fit the factory pattern:

```typescript
import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";

const rule = ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    messages: {
      customMessage: "Custom validation message"
    },
    type: "problem",
    schema: []
  },
  create(context) {
    return {
      JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
        // Custom validation logic
        if (needsValidation(node)) {
          context.report({
            node,
            messageId: "customMessage"
          });
        }
      }
    };
  }
});
```

## Utility Functions

### hasLabeledChild

The `hasLabeledChild` utility detects accessible child content and is one of the most powerful validation functions:

```typescript
import { hasLabeledChild } from '../util/hasLabeledChild';

// Usage in rules
if (hasLabeledChild(openingElement, context)) {
  return; // Element has accessible child content
}
```

**Detects:**

1. **Images with alt text:**
   ```jsx
   <Button><img alt="Save document" /></Button>
   <Button><Image alt="User profile" /></Button>
   ```

2. **SVG elements with accessible attributes:**
   ```jsx
   <Button><svg title="Close" /></Button>
   <Button><svg aria-label="Menu" /></Button>
   <Button><svg aria-labelledby="icon-label" /></Button>
   ```

3. **Elements with role="img" and labeling:**
   ```jsx
   <Button><span role="img" aria-label="Celebration">🎉</span></Button>
   ```

4. **FluentUI Icon components:**
   ```jsx
   <Button><SaveIcon /></Button>
   <Button><Icon iconName="Save" /></Button>
   <Button><MyCustomIcon /></Button>
   ```

5. **Any element with aria-label or title:**
   ```jsx
   <Button><div aria-label="Status indicator" /></Button>
   <Button><span title="Tooltip text" /></Button>
   ```

6. **Elements with validated aria-labelledby:**
   ```jsx
   <Button><span aria-labelledby="save-label" /></Button>
   <Label id="save-label">Save Document</Label>
   ```

**Key Features:**

- **Source code validation:** Validates that `aria-labelledby` references point to actual elements with matching IDs
- **Deep traversal:** Uses `flattenChildren` to find labeled content in nested structures
- **Case insensitive:** Handles variations like `IMG`, `SVG`, `CLOSEICON`
- **Error handling:** Gracefully handles malformed JSX and missing context

### Other Utility Functions

- **`hasAssociatedLabelViaAriaLabelledBy(opening, context)`** - Validates `aria-labelledby` references
- **`hasAssociatedLabelViaHtmlFor(opening, context)`** - Validates `htmlFor`/`id` label associations  
- **`hasAssociatedLabelViaAriaDescribedby(opening, context)`** - Validates `aria-describedby` references
- **`hasTextContentChild(element)`** - Checks for meaningful text content in children
- **`isInsideLabelTag(context)`** - Checks if element is wrapped in a `<Label>` tag
- **`hasNonEmptyProp(attributes, propName)`** - Validates non-empty attribute values
- **`hasDefinedProp(attributes, propName)`** - Checks if attribute is present

### Writing Tests

Use the comprehensive test patterns established in the codebase:

```typescript
import { hasLabeledChild } from "../../../../lib/util/hasLabeledChild";
import { TSESLint } from "@typescript-eslint/utils";

describe("hasLabeledChild", () => {
  const mockContext = (sourceText = ""): TSESLint.RuleContext<string, unknown[]> => ({
    getSourceCode: () => ({
      getText: () => sourceText,
      text: sourceText
    })
  } as unknown as TSESLint.RuleContext<string, unknown[]>);

  it("validates aria-labelledby references", () => {
    const element = createElementWithChild("div", [
      createJSXAttribute("aria-labelledby", "existing-label")
    ]);
    const contextWithLabel = mockContext('<Label id="existing-label">Label Text</Label>');
    
    expect(hasLabeledChild(element, contextWithLabel)).toBe(true);
  });
});
```

## To create a new ESLint rule

If you want to create a new ESLint rule:

1. Please run the [create-rule](./scripts/create-rule.md) script.

## Pull requests

First, create a new branch

```sh
git checkout -b users/<username or alias>/bug1234
```

Post change, ensure to run the build command to generate the respective output file in the dist folder:

```sh
npm run build
```

Commit the changes to your branch, including a descriptive commit message.

```sh
git commit -m 'message describing the changes'
```

Before sending the pull request, make sure your code is running on the latest code from the main repo by rebasing onto the upstream source.

```sh
git fetch upstream
git rebase upstream/main
#or
git fetch upstream
git merge upstream/main
```

Verify your changes

```sh
npm test
npm run lint
```

Push your changes

```sh
git push origin users/<username or alias>/bug1234
```

Send the [pull request](https://docs.github.com/en/pull-requests), make the requested code review changes, and get merged. 2 reviewers must approve.
