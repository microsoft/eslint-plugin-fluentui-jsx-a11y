# This rule aims to ensure that dismissible Tag components have proper accessibility labelling: either aria-label on dismissIcon or aria-label on Tag with role='presentation' on dismissIcon (`@microsoft/fluentui-jsx-a11y/tag-dismissible-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Dismissible Tag components render a dismiss/close button that must have an accessible name for screen reader users.

When a Tag has the `dismissible` prop, it must provide a `dismissIcon` with an `aria-label`.

<https://react.fluentui.dev/?path=/docs/components-tag-tag--docs>

## Rule Details

This rule aims to ensure that dismissible Tag components have an aria-label on the dismiss button.

Examples of **incorrect** code for this rule:

```jsx
<Tag dismissible>Dismissible tag</Tag>
```

```jsx
<Tag dismissible dismissIcon={{}}>Dismissible tag</Tag>
```

```jsx
<Tag dismissible dismissIcon={{ "aria-label": "" }}>Dismissible tag</Tag>
```

Examples of **correct** code for this rule:

```jsx
<Tag>Regular tag</Tag>
```

```jsx
<Tag icon={<SettingsIcon />}>Tag with icon</Tag>
```

```jsx
<Tag dismissible dismissIcon={{ "aria-label": "remove" }}>Dismissible tag</Tag>
```

```jsx
<Tag dismissible dismissIcon={{ "aria-label": "close" }} icon={<CalendarMonthRegular />}>Tag with icon</Tag>
```
