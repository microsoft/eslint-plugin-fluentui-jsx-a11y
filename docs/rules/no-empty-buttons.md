# no-empty-button(`no-empty-buttons`)

Buttons must either have text, content or accessible labelling

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
<Button/> 
```

Examples of **correct** code for this rule:

```jsx
<Button icon={<CloseIcon />} iconOnly aria-label="Close" />
```

```jsx
<Button content="anything" />
```
