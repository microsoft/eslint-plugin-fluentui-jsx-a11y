# Accessibility: SplitButton must have an accessible label (`@microsoft/fluentui-jsx-a11y/splitButton-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

SplitButton without a label or accessible labeling lack an accessible name for assistive technology users.

SplitButton components need a visual label.

Please add label, or aria-labelledby.

<https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/>

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
   <SplitButton> Example</SplitButton>
```

```jsx
   <SplitButton disabled> Example</SplitButton>
```


Examples of **correct** code for this rule:

```jsx
   <SplitButton aria-label="My button">Example</SplitButton>
```

```jsx
<SplitButton disabled aria-label="My button">Disabled State</SplitButton>
```