# Accessibility: Tree must have proper labelling and follow ARIA tree pattern for hierarchical navigation (`@microsoft/fluentui-jsx-a11y/tree-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Tree components must have accessible labelling for screen readers to understand the hierarchical structure and navigation purpose.

## Rule Details

This rule enforces that Tree components have proper accessible names following ARIA tree pattern guidelines. Trees present hierarchical data that requires clear identification for assistive technology users to understand the navigation context.

Trees must have an accessible name provided through one of these methods:
- `aria-label` attribute with descriptive text
- `aria-labelledby` attribute referencing existing label elements
- Wrapping in a `Field` component that provides labeling context

### Noncompliant

```jsx
// Missing any form of accessible labeling
<Tree>
  <TreeItem>Folder 1</TreeItem>
  <TreeItem>Folder 2</TreeItem>
</Tree>

// Empty or whitespace-only labels
<Tree aria-label="">
  <TreeItem>Item 1</TreeItem>
</Tree>

// Invalid aria-labelledby reference
<Tree aria-labelledby="non-existent-id">
  <TreeItem>Item 1</TreeItem>
</Tree>
```

### Compliant

```jsx
// Using aria-label
<Tree aria-label="File explorer">
  <TreeItem>
    <TreeItemLayout>Documents</TreeItemLayout>
    <Tree>
      <TreeItem>Resume.pdf</TreeItem>
      <TreeItem>Cover Letter.docx</TreeItem>
    </Tree>
  </TreeItem>
  <TreeItem>Images</TreeItem>
</Tree>

// Using aria-labelledby
<h3 id="nav-tree">Site Navigation</h3>
<Tree aria-labelledby="nav-tree">
  <TreeItem>Home</TreeItem>
  <TreeItem>Products</TreeItem>
  <TreeItem>Contact</TreeItem>
</Tree>

// Wrapped in Field component
<Field label="Organization Chart">
  <Tree>
    <TreeItem>CEO</TreeItem>
    <TreeItem>VP Engineering</TreeItem>
  </Tree>
</Field>

// Complex labeling with instructions
<h3 id="tree-title">Project Files</h3>
<p id="tree-instructions">Use arrow keys to navigate, Enter to open</p>
<Tree aria-labelledby="tree-title tree-instructions">
  <TreeItem>src/</TreeItem>
  <TreeItem>docs/</TreeItem>
  <TreeItem>tests/</TreeItem>
</Tree>
```

## Best Practices

1. **Context Description**: Clearly describe what the tree represents (file system, navigation, org chart)
2. **Navigation Hints**: Consider including keyboard navigation instructions in labels
3. **Scope Information**: Indicate the breadth or type of items in the tree
4. **Hierarchical Context**: Help users understand the tree's organizational purpose

## When Not To Use

This rule should always be used for Tree components as they present complex hierarchical navigation that requires clear identification for screen reader users.

## Related Rules

- `field-needs-labelling` - Field wrapper component labeling

## Accessibility Guidelines

- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [ARIA Tree Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)
- [ARIA Navigation Landmarks](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)
