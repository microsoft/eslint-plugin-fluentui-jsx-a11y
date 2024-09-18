# Accessibility: MenuItem without label must have an accessible and visual label: aria-labelledby (`@microsoft/fluentui-jsx-a11y/menu-item-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Accessibility: MenuItem must have a visual label and it needs to be linked via aria-labelledby

<https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16>

## Ways to fix

-   Add a label with an id, add the aria-labelledby having same value as id to MenuItem.

## Rule Details

This rule aims to make MenuItem accessible

Examples of **incorrect** code for this rule:

```jsx
<MenuItem />
```

```jsx
<MenuItem icon={<SettingsIcon />} onClick={handleClick}></MenuItem>
```

```jsx
<MenuItem aria-labelledby="menu-item-id"></MenuItem>
```

Examples of **correct** code for this rule:

```jsx
<>
    <label id="my-label">Settings</label>
    <MenuItem aria-labelledby="my-label" icon={<SettingsIcon />} onClick={handleClick}></MenuItem>
    <MenuItem>Settings</MenuItem>
</>
```
