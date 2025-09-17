# This rule aims to ensure that Tag component have an accessible name via text content, aria-label, or aria-labelledby (`@microsoft/fluentui-jsx-a11y/tag-needs-name`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Tag components need an accessible name for screen reader users.

Please provide text content, aria-label, or aria-labelledby.

<https://react.fluentui.dev/?path=/docs/components-tag-tag--docs>

## Rule Details

This rule aims to ensure that Tag components have an accessible name via text content, aria-label, or aria-labelledby.

Examples of **incorrect** code for this rule:

```jsx
<Tag></Tag>
```

```jsx
<Tag />
```

```jsx
<Tag aria-label=""></Tag>
```

```jsx
<Tag icon={<SettingsIcon />}></Tag>
```

```jsx
<Tag icon={<SettingsIcon />} />
```

Examples of **correct** code for this rule:

```jsx
<Tag>Tag with some text</Tag>
```

```jsx
<Tag aria-label="Accessible tag name"></Tag>
```

```jsx
<Tag aria-label="Tag label">Some text</Tag>
```

```jsx
<Tag icon={<SettingsIcon />}>Tag with icon and text</Tag>
```

```jsx
<Tag icon={<SettingsIcon />} aria-label="Settings tag"></Tag>
```
