# Accessibility: Dropdown menu must have an id and it needs to be linked via htmlFor of a Label (`@microsoft/fluentui-jsx-a11y/dropdown-needs-labelling-v9`)

<!-- end auto-generated rule header -->

Accessibility: Dropdown menu must have a visual label and it needs to be linked via htmlFor aria-labelledby of Label Or Dropdown mush have aria-label
Dropdown having label linked via htmlFor in Label is recommended

<https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16>

## Ways to fix

-   Add a label with htmlFor, add the id having same value as htmlFor to dropdown.
-   Add a label with id, add the aria-labelledby having same value as id to dropdown.
-   Add a aria-label to dropdown

## Rule Details

This rule aims to make dropdown accessible

Examples of **incorrect** code for this rule:

```jsx
<Dropdown />
<Dropdown aria-labelledby="dropdown-id"></Dropdown>
<>
<Label />
<Dropdown aria-labelledby="dropdown-id"></Dropdown>
</>
```

Examples of **correct** code for this rule:

```jsx
<>
<Label htmlFor="dropdown-id" />
<Dropdown id="dropdown-id"></Dropdown>
</>
<>
<Label id="dropdown-id" />
<Dropdown aria-labelledby="dropdown-id"></Dropdown>
</>
<Dropdown aria-label="dropdown-label"></Dropdown>
</>
```
