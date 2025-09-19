# card-needs-accessible-name

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