# Accessibility: Spinner must have either aria-label or label, aria-live and aria-busy attributes (`@microsoft/fluentui-jsx-a11y/spinner-needs-labelling`)

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Spinner must have either aria-label or label, aria-live and aria-busy attributes.

<https://www.w3.org/TR/html-aria/>

<https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live>

<https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label>

## Ways to fix

-   Make sure that Spinner component has following attributes:
    -   aria-live
    -   aria-busy
    -   either label or aria-label

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

```jsx
<Spinner
    size="large"
    label="Large Spinner"
    aria-live="polite"
/>
```

```jsx
<Spinner
    size="large"
    label="Large Spinner"
    aria-busy="true"
/>
```

Examples of **correct** code for this rule:

```jsx
<Spinner
    {...props} 
    aria-label="my screen reader text"
    aria-live="polite"
    aria-busy="false"
/>
```

```jsx
<Spinner
    {...props} 
    aria-label="my screen reader text"
    aria-live="polite"
    aria-busy="true"
/>
```

```jsx
<Spinner
    {...props} 
    label="my text"
    aria-live="polite"
    aria-busy="true"
/>
```
