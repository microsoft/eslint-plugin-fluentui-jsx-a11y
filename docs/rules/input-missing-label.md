# Accessibility: Input fields must have accessible labelling: aria-label, aria-labelledby or an associated label (`@microsoft/fluentui-jsx-a11y/input-missing-label`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

## Rule Details

This rule aims to prevent that a Input element must have an accessible label associated with it or an accessible label.

Rule explanation here [https://www.w3.org/WAI/tutorials/forms/labels/](https://www.w3.org/WAI/tutorials/forms/labels/)

Examples of **incorrect** code for this rule:

```jsx
<Label>Label name</Label>
<Input id="input-id"/>
```

or

```jsx
<Label htmlFor="input-id">Label name</Label>
<Input/>
```

or

```jsx
<Label htmlFor="input-id">Label name</Label>
<Slider/>
```

or

```jsx
<Slider size="medium" defaultValue={20} />
```

or

```jsx
<Field label="Input" />
<Input />
```

Examples of **correct** code for this rule:

```jsx
<Input aria-label="Sample input" />
```

or

```jsx
<Label htmlFor="input-id">Label name</Label>
<Textarea id="input-id"/>
```

or

```jsx
<Label htmlFor={mediumId}>Medium Slider</Label>
<Slider size="medium" defaultValue={20} id={mediumId} />
```

or

```jsx
<Field label="Input">
    <Input />
</Field>
```
