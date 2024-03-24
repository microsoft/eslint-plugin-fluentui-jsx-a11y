# Accessibility: Badge must have an accessible name (`@microsoft/fluentui-jsx-a11y/badge-needs-name-v9`)

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Badge without additional text content lack an accessible name.

Please add aria-label, aria-labelledby, aria-described by etc.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to prevent an badge from not having an accessible name.

Examples of **incorrect** code for this rule:

```jsx
<Badge icon={<CloseIcon />} />
<Badge icon={<CloseIcon />}></Badge>

```

Examples of **correct** code for this rule:

```jsx
<Badge icon={<CloseIcon />} aria-label="Close icon" />
<Badge icon={<CloseIcon />}>Close icon</Badge>

<Label id="close-icon-1">Close icon</Label>
<Badge icon={<CloseIcon />} aria-labelledby="close-icon-1" />

<Tooltip content="Close icon" relationship="label">
    <Badge icon={<CloseIcon />} />
</Tooltip>
```
