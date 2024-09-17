# @microsoft/fluentui-jsx-a11y/badge-needs-accessible-name

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Badge information should be surfaced as part of the control that it is associated with, because, badges themselves do not receive focus meaning they are not directly accessible by screen readers. If the combination of icon and badge communicates some meaningful information, that information should be surfaced in another way through screenreader or tooltip on the component the badge is associated with.

Badge content is exposed as text, and is treated by screen readers as if it were inline content of the control it is associated with.

## Rule Details

Ensure that the `Badge` component is accessible.

Examples of **incorrect** code for this rule:

```jsx
<Badge icon={<PasteIcon />} />
```

```jsx
<Badge appearance="filled" color="brand" />} />
```

```jsx
<Badge size="extra-large" />
```

Examples of **correct** code for this rule:

If the badge contains a custom icon, that icon must be given alternative text with aria-label, unless it is purely presentational:

```jsx
<Badge icon={<PasteIcon aria-label="paste" />} />
```

Badge shouldn't rely only on color information. Include meaningful descriptions when using color to represent meaning in a badge. If relying on color only ensure that non-visual information is included in the parent's label or description. Alternatively, mark up the Badge as an image with a label:

```jsx
<Badge role="img" aria-label="Active" appearance="filled" color="brand" />} />
```

```jsx
<Badge appearance="tint">999+</Badge>
```

## Further Reading

<https://react.fluentui.dev/?path=/docs/components-badge-badge--docs>

