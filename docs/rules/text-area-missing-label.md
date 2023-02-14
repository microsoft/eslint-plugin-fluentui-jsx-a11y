# Checks if the text area component is missing a label. (`text-area-missing-label`)

Please describe the origin of the rule here.

## Rule Details

This rule aims to prevent that a text area is placed without a label.

Examples of **incorrect** code for this rule:

```js
<Label>Label name</Label>
<Textarea id="text-area-id"/>

<Label htmlFor="text-area-id">Label name</Label>
<Textarea/>
```

Examples of **correct** code for this rule:

```jsx
<Label>
    Label name
    <SomeNesting>
        <Textarea/>
    </SomeNesting>
</Label>

or

<Label htmFor="text-area-id">Label name</Label>
<Textarea id="text-area-id"/>
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
