# Accessibility: ColorSwatch must have an accessible name (`@microsoft/fluentui-jsx-a11y/colorswatch-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

`ColorSwatch` without a supported label lacks an accessible name for assistive technology users.

## Allowed labelling strategies

- ✅ `aria-label` **on `ColorSwatch`**
- ✅ `aria-labelledby` **on `ColorSwatch`**
- ✅ `htmlFor`/`id`
- ✅ Wrapping native `<label>…</label>`
- ✅ `Tooltip` parent with `relationship="label"`
- ✅ `Field` parent label
- ✅ Text content child
- ❌ Container-only label (e.g., only the surrounding `SwatchPicker` is labelled)

## Ways to fix

- Add `aria-label` / `aria-labelledby`.
- Use `<label htmlFor="…">` + `id="…"` on `ColorSwatch`.
- Wrap with `<label>` or use a `Tooltip (relationship="label")`.
- Provide a `Field label="…"` parent.
- Provide meaningful text as the child of `ColorSwatch`.

## Rule Details

This rule ensures `ColorSwatch` is labelled using **any** supported strategy above.

### Examples of **incorrect** code

```jsx
// No label
<SwatchPicker>
  <ColorSwatch color="#FF1921" value="FF1921" />
</SwatchPicker>
```

```jsx
// Container-only label: ColorSwatch itself is unnamed
<SwatchPicker aria-label="Color picker">
  <ColorSwatch color="#FF1921" value="FF1921" />
</SwatchPicker>
```

### Examples of **correct** code

```jsx
// aria-label
<SwatchPicker>
  <ColorSwatch color="#FF1921" value="FF1921" aria-label="Red" />
</SwatchPicker>
```

```jsx
// aria-labelledby
<>
  <span id="red-swatch">Red</span>
  <SwatchPicker>
    <ColorSwatch color="#FF1921" value="FF1921" aria-labelledby="red-swatch" />
  </SwatchPicker>
</>
```

```jsx
// htmlFor/id
<>
  <label htmlFor="sw-red">Red</label>
  <SwatchPicker>
    <ColorSwatch id="sw-red" color="#FF1921" value="FF1921" />
  </SwatchPicker>
</>
```

```jsx
// Wrapping native <label>
<label>
  Red
  <ColorSwatch color="#FF1921" value="FF1921" />
</label>
```

```jsx
// Tooltip (acts as a label)
<SwatchPicker>
  <Tooltip relationship="label" content="Red">
    <ColorSwatch color="#FF1921" value="FF1921" />
  </Tooltip>
</SwatchPicker>
```

```jsx
// Field parent
<SwatchPicker>
  <Field label="Red">
    <ColorSwatch color="#FF1921" value="FF1921" />
  </Field>
</SwatchPicker>
```

```jsx
// Text content child
<SwatchPicker>
  <ColorSwatch color="#FF1921" value="FF1921">Red</ColorSwatch>
</SwatchPicker>
```