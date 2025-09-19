# Accessibility: Table must have proper labelling and semantic structure for screen readers (`@microsoft/fluentui-jsx-a11y/table-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Table components must have accessible labelling for screen readers to understand the table's purpose and content structure.

## Rule Details

This rule enforces that Table components have proper accessible names following semantic HTML and ARIA best practices. Tables present structured data that requires clear identification for assistive technology users.

Tables must have an accessible name provided through one of these methods:
- `aria-label` attribute with descriptive text
- `aria-labelledby` attribute referencing existing label elements  
- `<caption>` element providing semantic table description
- Wrapping in a `Field` component that provides labeling context

### Noncompliant

```jsx
// Missing any form of accessible labeling
<Table>
  <TableHeader />
  <TableBody />
</Table>

// Empty labels don't provide accessibility
<Table aria-label="">
  <TableHeader />
  <TableBody />
</Table>

// Invalid reference
<Table aria-labelledby="missing-id">
  <TableHeader />
  <TableBody />
</Table>
```

### Compliant

```jsx
// Using aria-label
<Table aria-label="Product inventory">
  <TableHeader>
    <TableRow>
      <TableHeaderCell>Product</TableHeaderCell>
      <TableHeaderCell>Stock</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Widget A</TableCell>
      <TableCell>150</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Using semantic caption element (preferred)
<Table>
  <caption>Sales Performance Q3 2024</caption>
  <TableHeader />
  <TableBody />
</Table>

// Using aria-labelledby
<h2 id="table-title">Employee Directory</h2>
<Table aria-labelledby="table-title">
  <TableHeader />
  <TableBody />
</Table>

// Wrapped in Field component
<Field label="Financial Summary">
  <Table>
    <TableHeader />
    <TableBody />
  </Table>
</Field>
```

## Best Practices

1. **Prefer `<caption>`**: Use caption elements for semantic table labeling when possible
2. **Descriptive Labels**: Clearly describe the table's content and purpose
3. **Context Information**: Include relevant time periods, data scope, or categories
4. **Consistent Structure**: Ensure tables have proper TableHeader and TableBody elements

## When Not To Use

This rule should always be used for Table components as they present structured data that requires clear identification for screen reader users.

## Related Rules

- `datagrid-needs-labelling` - Similar requirements for DataGrid components
- `field-needs-labelling` - Field wrapper component labeling

## Accessibility Guidelines

- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [ARIA Table Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
- [HTML Table Accessibility](https://webaim.org/techniques/tables/)
