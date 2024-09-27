# Accessibility: Ratings must have accessible labelling: name, aria-label, aria-labelledby or itemLabel which generates aria-label (`@microsoft/fluentui-jsx-a11y/rating-needs-name`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

## Rule Details

This rule aims to enforce that a Rating element must have an accessible label associated with it.

Examples of **incorrect** code for this rule:

```js
<Rating />
```

Examples of **correct** code for this rule:

```js
<Rating itemLabel={number => `Rating of ${number} starts`} />
```

FluentUI supports receiving a function that will add the aria-label to the element with the number. This prop is called itemLabel.
If this is not the desired route, a name, aria-label or aria-labelledby can be added instead.

## When Not To Use It

You might want to turn this rule off if you don't intend for this component to be read by screen readers.

## Further Reading

-   [ARIA in HTML](https://www.w3.org/TR/html-aria/)
