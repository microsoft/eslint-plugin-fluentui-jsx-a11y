# Accessibility: Compound buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby (`@microsoft/fluentui-jsx-a11y/compound-button-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

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

<CompoundButton icon={<CalendarMonthRegular />}></CompoundButton>

<Label id="calendar-2">Start date</Label>
<CompoundButton aria-labelledby="calendar" />
```

Examples of **correct** code for this rule:
Please note that without an icon, these buttons are actually not accessible for sighted users

```jsx
<CompoundButton title="Compound example" />
<CompoundButton icon={<CalendarMonthRegular />} aria-label="Compound example" />
<CompoundButton>Compound example</CompoundButton>
<CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Compound example" />
<>
    <Label id="calendar-1">Compound example</Label>
    <CompoundButton aria-labelledby="calendar-1" icon={<CalendarMonthRegular />} />
</>

<Tooltip content="Compound example" relationship="label">
    <CompoundButton icon={<CalendarMonthRegular />}/>
</Tooltip>
```
