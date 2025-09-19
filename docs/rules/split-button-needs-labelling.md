# split-button-needs-labelling

SplitButton components must have accessible labelling for screen readers.

## Rule Details

This rule enforces that SplitButton components have proper accessible names through aria-label, aria-labelledby, or text content.

### Noncompliant

```jsx
<SplitButton />
```

### Compliant

```jsx
<SplitButton aria-label="Save options" />

<SplitButton aria-labelledby="save-label">
  <span id="save-label">Save</span>
</SplitButton>

<SplitButton>Save</SplitButton>
```

## When Not To Use

This rule should always be used for SplitButton components as they are interactive elements.

## Accessibility guidelines

- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)