# infolabel-needs-labelling

InfoLabel components must have accessible labelling for screen readers.

## Rule Details

This rule enforces that InfoLabel components have proper accessible names through aria-label, aria-labelledby, or text content.

### Noncompliant

```jsx
<InfoLabel />
```

### Compliant

```jsx
<InfoLabel aria-label="Additional information" />

<InfoLabel aria-labelledby="info-text">
  <span id="info-text">Help text</span>
</InfoLabel>

<InfoLabel>Help information</InfoLabel>
```

## When Not To Use

If the InfoLabel is purely decorative, this rule may not be necessary.

## Accessibility guidelines

- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)