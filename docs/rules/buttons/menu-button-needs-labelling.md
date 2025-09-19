# menu-button-needs-labelling

MenuButton components must have accessible labelling for screen readers.

## Rule Details

This rule enforces that MenuButton components have proper accessible names through aria-label, aria-labelledby, or text content.

### Noncompliant

```jsx
<MenuButton />
```

### Compliant

```jsx
<MenuButton aria-label="Menu options" />

<MenuButton aria-labelledby="menu-label">
  <span id="menu-label">Options</span>
</MenuButton>

<MenuButton>Options</MenuButton>
```

## When Not To Use

This rule should always be used for MenuButton components as they are interactive elements.

## Accessibility guidelines

- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)