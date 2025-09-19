# eslint-plugin-fluentui-jsx-a11y [![npm version](https://img.shields.io/npm/v/@microsoft/eslint-plugin-fluentui-jsx-a11y.svg?style=flat)](https://www.npmjs.com/package/@microsoft/eslint-plugin-fluentui-jsx-a11y)[![Coverage Status](https://coveralls.io/repos/github/microsoft/eslint-plugin-fluentui-jsx-a11y/badge.svg?branch=main)](https://coveralls.io/github/microsoft/eslint-plugin-fluentui-jsx-a11y?branch=main)

A set of eslint rules against [Fluent UI React v9](https://react.fluentui.dev/?path=/docs/concepts-introduction--page) to prevent common accessibility issues.

Covers hard-coded string props and variables for props.

```jsx
<Label htmlFor="some-id">Some Label</Label>
<Input id="some-id" />
```

```jsx
<Label htmlFor={someId}>Some Label</Label>
<Input id={someId} />
```

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
# npm
npm install eslint --save-dev

# yarn
yarn add eslint --dev
```

Next, install @microsoft/eslint-plugin-fluentui-jsx-a11y:

```sh
# npm
npm install @microsoft/eslint-plugin-fluentui-jsx-a11y --save-dev

# yarn
yarn add @microsoft/eslint-plugin-fluentui-jsx-a11y --dev
```

Or add this package to your `package.json` file:

```sh
"devDependencies": {
    "@microsoft/eslint-plugin-fluentui-jsx-a11y": "1.0.0"
  }
```

And then you can run

```sh
  npm install
```

## Usage

You will need to add the plugin to your `.eslintrc` configuration file.

Suggested Configuration:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "react-hooks",
    "@microsoft/fluentui-jsx-a11y"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@microsoft/fluentui-jsx-a11y/recommended"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
  },

```

## Why?

This plugin does a static code analysis of the React JSX to spot accessibility issues in apps built with FluentUI. That way, common accessibility issues are detected before the pull request stage and will be prevented from being checked into a code base.

As the plugin can only catch errors in static source code, please use it in combination with [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react) to test the accessibility of the rendered DOM. Consider these tools just as one step of a larger a11y testing process and always test your apps with assistive technology.

## Architecture & Development

### Rule Factory System

This plugin leverages a powerful rule factory system that provides consistent behavior across accessibility rules. The factory system includes several utility functions for validating accessible labeling:

- **`hasAssociatedLabelViaAriaLabelledBy`** - Validates `aria-labelledby` references
- **`hasAssociatedLabelViaHtmlFor`** - Validates `htmlFor`/`id` label associations  
- **`hasAssociatedLabelViaAriaDescribedby`** - Validates `aria-describedby` references
- **`hasLabeledChild`** - Detects accessible child content (images with alt, icons, labeled elements)
- **`hasTextContentChild`** - Validates text content in child elements
- **`isInsideLabelTag`** - Checks if element is wrapped in a label

#### Labeled Child Detection

The `hasLabeledChild` utility is particularly powerful, detecting multiple forms of accessible child content:

```tsx
// Image elements with alt text
<Button><img alt="Save document" /></Button>

// SVG elements with accessible attributes  
<Button><svg title="Close" /></Button>
<Button><svg aria-label="Menu" /></Button>

// Elements with role="img" and labeling
<Button><span role="img" aria-label="Celebration">🎉</span></Button>

// FluentUI Icon components
<Button><SaveIcon /></Button>
<Button><Icon iconName="Save" /></Button>

// Any element with aria-label or title
<Button><div aria-label="Status indicator" /></Button>

// Elements with aria-labelledby (validates references exist)
<Button><span aria-labelledby="save-label" /></Button>
<Label id="save-label">Save Document</Label>
```

The utility performs source code analysis to validate that `aria-labelledby` references point to actual elements with matching IDs, ensuring robust accessibility validation.

### Creating New Rules

To create a new accessibility rule, use the rule factory system:

```typescript
import { ruleFactory, LabeledControlConfig } from '../util/ruleFactory';

const rule = ruleFactory({
  component: 'YourComponent', // or /RegexPattern/
  message: 'Your component needs accessible labeling',
  allowTextContentChild: true,
  allowLabeledChild: true,
  allowHtmlFor: true,
  allowLabelledBy: true,
  labelProps: ['aria-label'],
  requiredProps: ['role']
});
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development guidelines.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                                                   | Description                                                                                                                                                                  | 💼 | ⚠️ | 🔧 |
| :--------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :- | :- | :- |
| [accordion-header-needs-labelling](docs/rules/accordion-header-needs-labelling.md)                                     | The accordion header is a button and it needs an accessibile name e.g. text content, aria-label, aria-labelledby.                                                            | ✅  |    |    |
| [accordion-item-needs-header-and-panel](docs/rules/accordion-item-needs-header-and-panel.md)                           | An AccordionItem needs exactly one header and one panel                                                                                                                      | ✅  |    |    |
| [avatar-needs-name](docs/rules/avatar-needs-name.md)                                                                   | Accessibility: Avatar must have an accessible labelling: name, aria-label, aria-labelledby                                                                                   | ✅  |    |    |
| [avoid-using-aria-describedby-for-primary-labelling](docs/rules/avoid-using-aria-describedby-for-primary-labelling.md) | aria-describedby provides additional context and is not meant for primary labeling.                                                                                          | ✅  |    |    |
| [badge-needs-accessible-name](docs/rules/badge-needs-accessible-name.md)                                               |                                                                                                                                                                              | ✅  |    | 🔧 |
| [breadcrumb-needs-labelling](docs/rules/breadcrumb-needs-labelling.md)                                                 | All interactive elements must have an accessible name                                                                                                                        | ✅  |    |    |
| [checkbox-needs-labelling](docs/rules/checkbox-needs-labelling.md)                                                     | Accessibility: Checkbox without label must have an accessible and visual label: aria-labelledby                                                                              | ✅  |    |    |
| [colorswatch-needs-labelling](docs/rules/colorswatch-needs-labelling.md)                                               | Accessibility: ColorSwatch must have an accessible name via aria-label, Tooltip, aria-labelledby, etc..                                                                      | ✅  |    |    |
| [combobox-needs-labelling](docs/rules/combobox-needs-labelling.md)                                                     | All interactive elements must have an accessible name                                                                                                                        | ✅  |    |    |
| [compound-button-needs-labelling](docs/rules/compound-button-needs-labelling.md)                                       | Accessibility: Compound buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby                                                         | ✅  |    |    |
| [counter-badge-needs-count](docs/rules/counter-badge-needs-count.md)                                                   |                                                                                                                                                                              | ✅  |    | 🔧 |
| [dialogbody-needs-title-content-and-actions](docs/rules/dialogbody-needs-title-content-and-actions.md)                 | A DialogBody should have a header(DialogTitle), content(DialogContent), and footer(DialogActions)                                                                            | ✅  |    |    |
| [dialogsurface-needs-aria](docs/rules/dialogsurface-needs-aria.md)                                                     | DialogueSurface need accessible labelling: aria-describedby on DialogueSurface and aria-label or aria-labelledby(if DialogueTitle is missing)                                | ✅  |    |    |
| [dropdown-needs-labelling](docs/rules/dropdown-needs-labelling.md)                                                     | Accessibility: Dropdown menu must have an id and it needs to be linked via htmlFor of a Label                                                                                | ✅  |    |    |
| [emptyswatch-needs-labelling](docs/rules/emptyswatch-needs-labelling.md)                                               | Accessibility: EmptySwatch must have an accessible name via aria-label, Tooltip, aria-labelledby, etc..                                                                      | ✅  |    |    |
| [field-needs-labelling](docs/rules/field-needs-labelling.md)                                                           | Accessibility: Field must have label                                                                                                                                         | ✅  |    |    |
| [image-button-missing-aria](docs/rules/image-button-missing-aria.md)                                                   | Accessibility: Image buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby                                                            | ✅  |    |    |
| [image-needs-alt](docs/rules/image-needs-alt.md)                                                                       | Accessibility: Image must have alt attribute with a meaningful description of the image. If the image is decorative, use alt="".                                             | ✅  |    |    |
| [imageswatch-needs-labelling](docs/rules/imageswatch-needs-labelling.md)                                               | Accessibility: ImageSwatch must have an accessible name via aria-label, Tooltip, aria-labelledby, etc..                                                                      | ✅  |    |    |
| [input-components-require-accessible-name](docs/rules/input-components-require-accessible-name.md)                     | Accessibility: Input fields must have accessible labelling: aria-label, aria-labelledby or an associated label                                                               | ✅  |    |    |
| [link-missing-labelling](docs/rules/link-missing-labelling.md)                                                         | Accessibility: Image links must have an accessible name. Add either text content, labelling to the image or labelling to the link itself.                                    | ✅  |    | 🔧 |
| [menu-item-needs-labelling](docs/rules/menu-item-needs-labelling.md)                                                   | Accessibility: MenuItem without label must have an accessible and visual label: aria-labelledby                                                                              | ✅  |    |    |
| [no-empty-buttons](docs/rules/no-empty-buttons.md)                                                                     | Accessibility: Button, ToggleButton, SplitButton, MenuButton, CompoundButton must either text content or icon or child component                                             | ✅  |    |    |
| [no-empty-components](docs/rules/no-empty-components.md)                                                               | FluentUI components should not be empty                                                                                                                                      | ✅  |    |    |
| [prefer-aria-over-title-attribute](docs/rules/prefer-aria-over-title-attribute.md)                                     | The title attribute is not consistently read by screen readers, and its behavior can vary depending on the screen reader and the user's settings.                            |    | ✅  | 🔧 |
| [prefer-disabledfocusable-over-disabled](docs/rules/prefer-disabledfocusable-over-disabled.md)                         | Prefer 'disabledFocusable' over 'disabled' when component has loading state to maintain keyboard navigation accessibility                                                    |    | ✅  | 🔧 |
| [progressbar-needs-labelling](docs/rules/progressbar-needs-labelling.md)                                               | Accessibility: Progressbar must have aria-valuemin, aria-valuemax, aria-valuenow, aria-describedby and either aria-label or aria-labelledby attributes                       | ✅  |    |    |
| [radio-button-missing-label](docs/rules/radio-button-missing-label.md)                                                 | Accessibility: Radio button without label must have an accessible and visual label: aria-labelledby                                                                          | ✅  |    |    |
| [radiogroup-missing-label](docs/rules/radiogroup-missing-label.md)                                                     | Accessibility: RadioGroup without label must have an accessible and visual label: aria-labelledby                                                                            | ✅  |    |    |
| [rating-needs-name](docs/rules/rating-needs-name.md)                                                                   | Accessibility: Ratings must have accessible labelling: name, aria-label, aria-labelledby or itemLabel which generates aria-label                                             | ✅  |    |    |
| [spin-button-needs-labelling](docs/rules/spin-button-needs-labelling.md)                                               | Accessibility: SpinButtons must have an accessible label                                                                                                                     | ✅  |    |    |
| [spin-button-unrecommended-labelling](docs/rules/spin-button-unrecommended-labelling.md)                               | Accessibility: Unrecommended accessibility labelling - SpinButton                                                                                                            | ✅  |    |    |
| [spinner-needs-labelling](docs/rules/spinner-needs-labelling.md)                                                       | Accessibility: Spinner must have either aria-label or label, aria-live and aria-busy attributes                                                                              | ✅  |    |    |
| [switch-needs-labelling](docs/rules/switch-needs-labelling.md)                                                         | Accessibility: Switch must have an accessible label                                                                                                                          | ✅  |    |    |
| [tablist-and-tabs-need-labelling](docs/rules/tablist-and-tabs-need-labelling.md)                                       | This rule aims to ensure that Tabs with icons but no text labels have an accessible name and that Tablist is properly labeled.                                               | ✅  |    |    |
| [tag-dismissible-needs-labelling](docs/rules/tag-dismissible-needs-labelling.md)                                       | This rule aims to ensure that dismissible Tag components have proper accessibility labelling: either aria-label on dismissIcon or aria-label on Tag with role on dismissIcon | ✅  |    |    |
| [tag-needs-name](docs/rules/tag-needs-name.md)                                                                         | Accessibility: Tag must have an accessible name                                                                                                                              | ✅  |    |    |
| [toolbar-missing-aria](docs/rules/toolbar-missing-aria.md)                                                             | Accessibility: Toolbars need accessible labelling: aria-label or aria-labelledby                                                                                             | ✅  |    |    |
| [tooltip-not-recommended](docs/rules/tooltip-not-recommended.md)                                                       | Accessibility: Prefer text content or aria over a tooltip for these components MenuItem, SpinButton                                                                          | ✅  |    |    |
| [visual-label-better-than-aria-suggestion](docs/rules/visual-label-better-than-aria-suggestion.md)                     | Visual label is better than an aria-label because sighted users can't read the aria-label text.                                                                              |    | ✅  |    |

<!-- end auto-generated rules list -->