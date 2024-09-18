# All interactive elements must have an accessible name (`@microsoft/fluentui-jsx-a11y/breadcrumb-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Provide labels to identify all form controls, including text fields, checkboxes, radio buttons, and drop-down menus. In most cases, this is done by using the label element.

<https://www.w3.org/WAI/tutorials/forms/labels/>

All interactive elements must have an accessible name.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
<div>
<label>Breadcrumb default example<label>
<Breadcrumb ></BreadCrumb>
</div>
```

```jsx
<Breadcrumb></Breadcrumb>
<label>Breadcrumb default example<Breadcrumb></Breadcrumb></label>
```

Examples of **correct** code for this rule:

```jsx
<Breadcrumb aria-label="Breadcrumb default example">
```

```jsx
<div>
<label id="my-label">Breadcrumb default example<label>
<Breadcrumb aria-labelledby="my-label"><BreadCrumb>
</div>
```
