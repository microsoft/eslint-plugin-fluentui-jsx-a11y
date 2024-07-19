# Accessibility: prefer wai-aria over title or placeholder attributes. Title/placeholder can be used in addition to wai-aria. aria-label, aria-labelledby, aria-describedby (`@microsoft/fluentui-jsx-a11y/image-button-prefer-aria-over-title-attribute`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Image buttons must have accessible labelling: aria-label

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to require aria label even when button has title.

Examples of **incorrect** code for this rule:

```jsx
<Button icon={<CloseIcon />} title="Close" iconOnly />
```

Examples of **correct** code for this rule:

```jsx
<Button icon={<CloseIcon />} iconOnly aria-label="Close" />
```

```jsx
<Button icon={<CloseIcon />} iconOnly aria-labelledby="label-id-4" />
```

```jsx
<Button icon={<CloseIcon />} iconOnly aria-describedby="label-id-4" />
```
