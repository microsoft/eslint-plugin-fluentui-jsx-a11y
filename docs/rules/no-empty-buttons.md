# Accessibility: buttons must either text content or accessible labelling (`@microsoft/fluentui-jsx-a11y/no-empty-buttons`)

<!-- end auto-generated rule header -->

Buttons must either have text, content or accessible labelling

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to make a button to have something to generate an aria-label.

Examples of **incorrect** code for this rule:

```jsx
<Button />
```

Examples of **correct** code for this rule:

```jsx
<Button icon={<CloseIcon />} iconOnly aria-label="Close" />
```

```jsx
<Button content="anything" />
```
