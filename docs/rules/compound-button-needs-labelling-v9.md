# Accessibility: Compound buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby (`@microsoft/fluentui-jsx-a11y/compound-button-needs-labelling-v9`)

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.
Please add title, aria-label, aria-labelledby, aria-describedBy, secondaryContent etc.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to prevent an compound button from not having an accessible name.

Examples of **incorrect** code for this rule:

```jsx
<CompoundButton/>
<CompoundButton></CompoundButton>

<Label id="calendar-2">Start date</Label>
<CompoundButton aria-labelledby="calendar" />
```

Examples of **correct** code for this rule:

```jsx
<CompoundButton title="Compound example" />
<CompoundButton aria-label="Compound example" />
<CompoundButton>Compound example</CompoundButton>
<CompoundButton secondaryContent="Compound example" />
<>
    <Label id="calendar-1">Compound example</Label>
    <CompoundButton aria-labelledby="calendar-1" />
</>

<Tooltip content="Compound example" relationship="label">
    <CompoundButton/>
</Tooltip>
```
