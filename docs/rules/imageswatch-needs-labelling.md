# Accessibility: ImageSwatch must have an accessible name via aria-label, Tooltip, aria-labelledby, etc. (`@microsoft/fluentui-jsx-a11y/imageswatch-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

`ImageSwatch` without a supported label lacks an accessible name for assistive technology users.

## Allowed labelling strategies

- ✅ `aria-label` **on `ImageSwatch`**
- ✅ `aria-labelledby` **on `ImageSwatch`**
- ✅ Wrapping native `<label>…</label>`
- ✅ `Tooltip` parent with `relationship="label"` (e.g., from Fluent UI)
- ❌ `Field` parent (not allowed for `ImageSwatch`)
- ❌ `htmlFor`/`id` (not allowed for `ImageSwatch`)
- ❌ Text content child (not allowed)
- ❌ Container-only label (e.g., only the surrounding `SwatchPicker` is labelled)

## Ways to fix

- Add `aria-label` or `aria-labelledby` **directly** to `ImageSwatch`.
- Wrap the swatch in a native `<label>…</label>` with descriptive text.
- Wrap in a `Tooltip` with `relationship="label"` and meaningful `content`.

## Rule Details

This rule ensures `ImageSwatch` receives a name via **supported** mechanisms.

### Examples of **incorrect** code

```jsx
// No label at all
<SwatchPicker>
  <ImageSwatch src="/none.png" value="none" />
</SwatchPicker>
```

```jsx
// Container-only label: ImageSwatch itself is unnamed
<SwatchPicker aria-label="Color picker">
  <ImageSwatch src="/none.png" value="none" />
</SwatchPicker>
```

```jsx
// Not allowed for ImageSwatch: htmlFor/id
<>
  <label htmlFor="img-none">No color</label>
  <SwatchPicker>
    <ImageSwatch id="img-none" src="/none.png" value="none" />
  </SwatchPicker>
</>
```

```jsx
// Not allowed: text content child
<SwatchPicker>
  <ImageSwatch src="/none.png" value="none">No color</ImageSwatch>
</SwatchPicker>
```

```jsx
// Not allowed: Field parent labelling
<SwatchPicker>
  <Field label="No color">
    <ImageSwatch src="/none.png" value="none" />
  </Field>
</SwatchPicker>
```

### Examples of **correct** code

```jsx
// aria-label
<SwatchPicker>
  <ImageSwatch src="/none.png" value="none" aria-label="No color" />
</SwatchPicker>
```

```jsx
// aria-labelledby
<>
  <span id="img-no-color">No color</span>
  <SwatchPicker>
    <ImageSwatch src="/none.png" value="none" aria-labelledby="img-no-color" />
  </SwatchPicker>
</>
```

```jsx
// Wrapping native <label>
<label>
  No color
  <ImageSwatch src="/none.png" value="none" />
</label>
```

```jsx
// Tooltip (acts as a label)
<SwatchPicker>
  <Tooltip relationship="label" content="No color">
    <ImageSwatch src="/none.png" value="none" />
  </Tooltip>
</SwatchPicker>
```
