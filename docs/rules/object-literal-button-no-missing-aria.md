# object-literal-button-no-missing-aria(`object-literal-button-no-missing-aria`)

A button with text content does not need aria labelling. The button already has an accessible name and the aria-label will override the text content for screen reader users.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
<Button content='Submit' aria-label='Close button'></Button>
```

```jsx
<Button content='Submit' aria-labelledby='Close button'></Button>
```

Examples of **correct** code for this rule:

```jsx
<Button content='Submit'></Button>
```
