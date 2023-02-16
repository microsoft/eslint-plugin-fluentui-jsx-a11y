# Checks if the text area component is missing a label. (`text-area-missing-label`)

Please describe the origin of the rule here.

## Rule Details

This rule aims to prevent that a text area is placed without a label.

Examples of **incorrect** code for this rule:

```js
<Label>Label name</Label>
<Textarea id="text-area-id"/>
```

or

```js
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
```

or

```jsx
<Label htmlFor="text-area-id">Label name</Label>
<Textarea id="text-area-id"/>
```
