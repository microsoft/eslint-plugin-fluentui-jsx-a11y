# Accessibility: Dropdown mising label or missing aria-labelledby (`@microsoft/fluentui-jsx-a11y/dropdown-needs-arialabeledby-and-label-v9`)

<!-- end auto-generated rule header -->

Accessibility: Dropdown menu must have a visual label and it needs to be linked via aria-labelledby

<https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16>

## Ways to fix

-   Add a label with an id, add the aria-labelledby having same value as id to dropdown.

## Rule Details

This rule aims to make dropdown accessible

Examples of **incorrect** code for this rule:

```jsx
<Dropdown />
<Dropdown aria-labelledby="dropdown-id"></Dropdown>
```

Examples of **correct** code for this rule:

```jsx
<>
<Label id="dropdown-id" />
<Dropdown aria-labelledby="dropdown-id"></Dropdown>
</>
```
