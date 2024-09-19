# This rule suggests that visual label is better than aria-label (`visual-label-better-than-aria-suggestion-v9`)

For component like Dropdown, SpinButton, it's good to have a aria-label for screen reader users but visual labels are considered better because they're also useful for sighted user and comes in screen announcement as well.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

<Dropdown aria-label="This is a Dropdown" />

```

Examples of **correct** code for this rule:

```js

<><Label id="my-dropdownid">This is the visual label</Label><Dropdown aria-labelledby="my-dropdownid" /></>

```
