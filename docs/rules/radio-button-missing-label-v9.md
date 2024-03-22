# Accessibility: Radio button without label must have an accessible and visual label: aria-labelledby (`@microsoft/fluentui-jsx-a11y/radio-button-missing-label-v9`)

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Radio button without a label or accessible labeling lack an accessible name.

<https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/>

## Ways to fix

-   Add a label, aria-label or aria-labelledby attribute to the Radio tag.

## Rule Details

This rule aims to make Radioes accessible.

Examples of **incorrect** code for this rule:

```jsx
<Radio checked={true} />
<Radio></Radio>
```

```jsx
    <Label>This is a switch.</Label>
    <Radio
      checked={true}
      onChange={onChange}
    />
```

Examples of **correct** code for this rule:

```jsx
<Radio label="anything" checked={true} />
```

```jsx
    <Label id="my-label-1">This is a Radio.</Label>
    <Radio
      checked={checked}
      onChange={onChange}
      aria-labelledby="my-label-1"
    />
```
