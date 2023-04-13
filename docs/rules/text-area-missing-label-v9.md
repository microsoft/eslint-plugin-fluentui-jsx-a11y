# Accessibility: Textarea must have an accessible name

<!-- end auto-generated rule header -->

## Rule Details

This rule aims to prevent that a text area is placed without a label.

Examples of **incorrect** code for this rule:

```jsx
<Label>Label name</Label>
<Textarea id="text-area-id"/>
```

or

```jsx
<Label htmlFor="text-area-id">Label name</Label>
<Textarea/>
```

Examples of **correct** code for this rule:

```jsx
<Label>
    Label name
    <SomeNesting>
        <Textarea />
    </SomeNesting>
</Label>
```

or

```jsx
<Label htmlFor="text-area-id">Label name</Label>
<Textarea id="text-area-id"/>
```
