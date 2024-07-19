# Accessibility: a button with text content does not need aria labelling. The button already has an accessible name and the aria-label will override the text content for screen reader users (`@microsoft/fluentui-jsx-a11y/text-content-button-does-not-need-aria`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Object literal image buttons must have accessible labelling: aria-label

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to get the object literal props.

Examples of **incorrect** code for this rule:

```tsx
const props = { icon: <CloseIcon />, iconOnly: true };
```

Examples of **correct** code for this rule:

```jsx
const props = { icon: <CloseIcon />, iconOnly: true, "aria-label": "Close" };
```

```jsx
<Dialog
    headerAction={{ icon: <CloseIcon />, "aria-labelledby": "label-id-4", title: "Close", onClick: "" }}
    footerAction={{ icon: <CancelIcon />, content: "Close" }}
/>
```

```jsx
<Dialog
    headerAction={{ icon: <CloseIcon />, "aria-describedby": "label-id-4", title: "Close", onClick: "" }}
    footerAction={{ icon: <CancelIcon />, content: "Close" }}
/>
```
