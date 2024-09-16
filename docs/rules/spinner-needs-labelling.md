# Accessibility: Spinner must have aria-label and aria-live (`@microsoft/fluentui-jsx-a11y/spinner-needs-labelling`)

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Spinner must have aria-label and aria-live.

<https://www.w3.org/TR/html-aria/>

<https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live>

<https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label>

## Ways to fix

-   Make sure that Spinner component has aria-live attribute and add aria-label attribute for screen reader text.

## Rule Details

This rule aims to make Spinners accessible.

Examples of **incorrect** code for this rule:

```jsx
<Spinner {...props} />
```

```jsx
<Spinner 
    {...props} 
    aria-label="some text"
/>
```

```jsx
<Spinner 
    {...props} 
    aria-live="polite"
/>
```

Examples of **correct** code for this rule:

```jsx
<Spinner
    {...props} 
    aria-label="my screen reader text"
    aria-live="polite"
/>
```
