# Accessibility: Counter badge must numerical count (`@microsoft/fluentui-jsx-a11y/counter-badge-needs-count`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

A counter badge is a badge that displays a numerical count.

## Rule Details

Ensure that the `CounterBadge` component is accessible.

Examples of **incorrect** code for this rule:

```jsx
<CounterBadge appearance="filled" size="extra-large" />
```

```jsx
<CounterBadge icon={<PasteIcon />} />
```


Examples of **correct** code for this rule:

If the badge contains a custom icon, that icon must be given alternative text with aria-label, unless it is purely presentational:

```jsx
<CounterBadge icon={<PasteIcon aria-label="paste" />} count={5} />
```

```jsx
<CounterBadge dot />
```

```jsx
<CounterBadge>5</CounterBadge>
```

## Further Reading

<https://react.fluentui.dev/?path=/docs/components-badge-counter-badge--docs>
