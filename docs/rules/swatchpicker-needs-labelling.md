# Accessibility: SwatchPicker must have an accessible name via aria-label, aria-labelledby, Field component, etc. (`@microsoft/fluentui-jsx-a11y/swatchpicker-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

SwatchPicker without a label or accessible labeling lack an accessible name for assistive technology users.

<https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/>

## Ways to fix

-   Add an aria-label or aria-labelledby attribute to the SwatchPicker tag. You can also use the Field component.

## Rule Details

This rule aims to make SwatchPickers accessible.

Examples of **incorrect** code for this rule:

```jsx
<SwatchPicker />
<Radio></Radio>
```

```jsx
    <Label>This is a switch.</Label>
    <SwatchPicker
      onChange={onChange}
    />
```

Examples of **correct** code for this rule:

```jsx
    <Label id="my-label-1">This is a Radio.</Label>
    <SwatchPicker
        delectedValue="00B053" 
        onSelectionChange={onSel}
        aria-labelledby="my-label-1"
    />
```

```jsx
<SwatchPicker aria-label="anything" selectedValue="00B053" onSelectionChange={onSel}>
    <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
    <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
</SwatchPicker>
```

```jsx
<Field label="Pick a colour">
    <SwatchPicker>
        <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
        <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
    </SwatchPicker>
</Field>
```
