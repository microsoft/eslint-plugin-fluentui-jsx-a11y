# image-button-prefer-aria-over-title-attribute (`image-button-prefer-aria-over-title-attribute`)

Image buttons must have accessible labelling: aria-label

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
<Button icon={<CloseIcon />} iconOnly />
```

Examples of **correct** code for this rule:

```jsx
<Button icon={<CloseIcon />} iconOnly aria-label="Close" />
```

```jsx
<Button icon={<CloseIcon />} iconOnly aria-labelledby="label-id-4" />
```

```jsx
<Button icon={<CloseIcon />} iconOnly aria-describedby="label-id-4"/>
```
