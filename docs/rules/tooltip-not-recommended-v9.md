# Accessibility: Prefer text content or aria over a tooltip for these components MenuItem, SpinButton (`@microsoft/fluentui-jsx-a11y/tooltip-not-recommended-v9`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Tooltip not recommended for these components: MenuItem, SpinButton, etc.

Prefer text content or aria over a tooltip for these components.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to prevent the usage of Tooltip.

Examples of **incorrect** code for this rule:

```jsx
<Tooltip content="menu item" relationship="label">
    <MenuItem />
</Tooltip>
```

```jsx
<Tooltip content="menu item" relationship="label">
    <SpinButton />
</Tooltip>
```

Examples of **correct** code for this rule:

```jsx
<div>
<label id="my-label">More option<label>
<MenuItem aria-labelledby="my-label"/>
</div>
```

```jsx
<div>
<label id="my-label">More option<label>
<SpinButton aria-labelledby="my-label"/>
</div>
```
