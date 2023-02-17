# Accessibility: Checkboxes without label must have accessible labelling: aria-label, aria-labelledby, aria-describedby (`@microsoft/fluentui-jsx-a11y/unlabelled-checkbox`)

All interactive elements must have an accessible name.

Checkboxes without a label or accessible labelling lack an accessible name.

<https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/>

## Ways to fix

- Add a label, aria-label or aria-labelledby attribute or text content to the Checkbox tag.

## Rule Details

This rule aims to make Checkboxes accessible.

Examples of **incorrect** code for this rule:

```jsx
<Checkbox />
<Checkbox></Checkbox>
```

Examples of **correct** code for this rule:

```jsx
<Checkbox label="anything" />
<Checkbox aria-label="Select instance" />
<Checkbox aria-labelledby="label-id-2" />
<Checkbox aria-describedby="label-id-2" />
```
