# This rule aims to ensure that Tabs with icons but no text labels have an accessible name and that Tablist is properly labeled (`@microsoft/fluentui-jsx-a11y/tablist-and-tabs-need-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->
Accessibility:
1. If the Tab is represented by an icon, it must have an 'aria-label' to describe the Tab.
2. If the Tablist has a visible label, it should use aria-labelledby to reference that label. If there is no visible label, the Tablist should have a label provided by aria-label.

<https://www.w3.org/WAI/ARIA/apg/patterns/tabs/>

## Ways to fix
1. Add an 'aria-label' to the Tab when it is represented by icon
2. Add an 'aria-labelledby' to the Tablist to reference a visible label
3. If there is no visible label, add an 'aria-label' to the Tablist

## Rule Details

This rule aims to ensure that Tabs with icons but no text labels have an accessible name and that Tablist is properly labeled.

Examples of **incorrect** code for this rule:

```jsx
<Tab icon={<SettingsIcon />} />

<Tab icon={<SettingsIcon />}></Tab>

<Tablist>
    <Tab>Settings Tab</Tab>
</Tablist>

<Tablist>
    <Label id="tablist-settings">Settings Label</Label>
    <Tab>Settings Tab</Tab>
</Tablist>

<Tablist>
    <Label>Settings Label</Label>
    <Tab>Settings Tab</Tab>
</Tablist>

```

Examples of **correct** code for this rule:

```jsx

<Tab icon={<SettingsIcon />} aria-label="Settings" />

<Tab icon={<SettingsIcon />}>Settings</Tab>

<Tab>Settings</Tab>

<Tablist aria-label="settings">
    <Tab>Settings Tab</Tab>
</Tablist>

<Tablist aria-labelledby="tablist-settings">
    <Label id="tablist-settings">Settings Label</Label>
    <Tab>Settings Tab</Tab>
</Tablist>

```
