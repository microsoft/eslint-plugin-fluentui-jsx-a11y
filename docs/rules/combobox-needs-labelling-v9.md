# All interactive elements must have an accessible name (`@microsoft/fluentui-jsx-a11y/combobox-needs-labelling-v9`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Provide labels to identify all form controls, including text fields, checkboxes, radio buttons, and drop-down menus. In most cases, this is done by using the label element.

<https://www.w3.org/WAI/tutorials/forms/labels/>

All interactive elements must have an accessible name.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
<label>Best pet</label>
<Combobox placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox>
```

Examples of **correct** code for this rule:

```jsx
<label id="my-label">Best pet</label>
<Combobox aria-labelledby="my-label" placeholder="Select an animal" {...props}>
    <Option>{"Cat"}</Option>
</Combobox>
```

```jsx
<Field label="Combobox">
    <Combobox>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
    </Combobox>
</Field>
```
