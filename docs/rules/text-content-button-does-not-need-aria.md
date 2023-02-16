# text-content-button-does-not-need-aria(`text-content-button-does-not-need-aria`)

Object literal image buttons must have accessible labelling: aria-label

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to get the object literal props.

Examples of **incorrect** code for this rule:

```tsx
const props = { icon: <CloseIcon />, iconOnly: true}
```

Examples of **correct** code for this rule:

```jsx
const props = { icon: <CloseIcon />, iconOnly: true, 'aria-label': 'Close' }
```

```jsx
<Dialog headerAction={{icon: <CloseIcon />, 'aria-labelledby': 'label-id-4', title: 'Close', onClick: ''}} footerAction={{icon: <CancelIcon />, content: 'Close'}} />
```

```jsx
<Dialog headerAction={{icon: <CloseIcon />, 'aria-describedby': 'label-id-4', title: 'Close', onClick: ''}} footerAction={{icon: <CancelIcon />, content: 'Close'}} />
```
