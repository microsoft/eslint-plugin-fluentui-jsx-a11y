# Accessibility: DataGrid must have proper labelling and follow ARIA grid patterns for complex data tables (`@microsoft/fluentui-jsx-a11y/datagrid-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

DataGrid components must have accessible labelling for screen readers to understand the data structure and purpose.

## Rule Details

This rule enforces that DataGrid components have proper accessible names and follow ARIA grid patterns for complex data tables. DataGrids present tabular data that requires clear identification for assistive technology users.

DataGrids must have an accessible name provided through one of these methods:
- `aria-label` attribute with descriptive text
- `aria-labelledby` attribute referencing existing label elements
- Wrapping in a `Field` component that provides labeling context

### Noncompliant

```jsx
// Missing any form of accessible labeling
<DataGrid columns={columns} items={employees} />

// Empty or whitespace-only labels
<DataGrid aria-label="" columns={columns} items={data} />
<DataGrid aria-label="   " columns={columns} items={data} />

// Invalid aria-labelledby reference
<DataGrid aria-labelledby="non-existent-id" columns={columns} items={data} />
```

### Compliant

```jsx
// Using aria-label
<DataGrid 
  aria-label="Employee directory" 
  columns={columns} 
  items={employees} 
/>

// Using aria-labelledby with existing elements
<Label id="data-grid-title">Sales Report Q3 2024</Label>
<DataGrid 
  aria-labelledby="data-grid-title"
  columns={columns} 
  items={salesData} 
/>

// Wrapped in Field component
<Field label="Product Inventory">
  <DataGrid columns={productColumns} items={inventory} />
</Field>

// Best practice: Include row/column counts for large datasets
<DataGrid
  aria-label="Financial data with 500 rows and 12 columns"
  aria-rowcount={500}
  aria-colcount={12}
  columns={columns}
  items={financialData}
/>
```

## Best Practices

1. **Descriptive Labels**: Use clear, descriptive labels that explain the data's purpose
2. **Data Context**: Include information about the data type (e.g., "Employee directory", "Sales report")
3. **Size Hints**: For large datasets, consider mentioning approximate size in the label
4. **Multiple Labels**: Use `aria-labelledby` to reference multiple elements for richer context

## When Not To Use

This rule should always be used for DataGrid components as they present complex tabular data that requires clear identification for screen reader users.

## Related Rules

- `table-needs-labelling` - Similar requirements for Table components
- `field-needs-labelling` - Field wrapper component labeling

## Accessibility Guidelines

- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [ARIA Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [ARIA Table Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
