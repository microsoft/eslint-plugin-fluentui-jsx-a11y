# abc (`switch-needs-labelling-v9`)

All interactive elements must have an accessible name.

Switch components need a visual label.

Please add label, or aria-labelledby.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
    <Switch
      checked={checked}
      onChange={onChange}
    />

```

```jsx

    <Label>This is a switch.</Label>
    <Switch
      checked={checked}
      onChange={onChange}
    />

```

Examples of **correct** code for this rule:

```jsx

    <Switch
      checked={checked}
      onChange={onChange}
      label={checked ? "Checked" : "Unchecked"}
    />

```

```jsx

    <Label id="my-label-1">This is a switch.</Label>
    <Switch
      checked={checked}
      onChange={onChange}
      aria-labelledby="my-label-1"
    />

```
