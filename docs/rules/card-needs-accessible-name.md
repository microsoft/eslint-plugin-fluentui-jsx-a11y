# Accessibility: Interactive Card must have an accessible name via aria-label, aria-labelledby, etc (`@microsoft/fluentui-jsx-a11y/card-needs-accessible-name`)

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Interactive Card components must have an accessible name for screen readers.

## Rule Details

This rule enforces that Card components have proper accessible names when they are interactive (clickable).

### Noncompliant

```jsx
<Card>
  <CardHeader>
    <Text weight="semibold">Card title</Text>
  </CardHeader>
</Card>
```

### Compliant

```jsx
<Card aria-label="Product details">
  <CardHeader>
    <Text weight="semibold">Card title</Text>
  </CardHeader>
</Card>

<Card aria-labelledby="card-title">
  <CardHeader>
    <Text id="card-title" weight="semibold">Card title</Text>
  </CardHeader>
</Card>
```

## When Not To Use

If the Card is purely decorative and not interactive, this rule is not necessary.

## Accessibility guidelines

- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
