# Accessibility: buttons must either text content or icon or child component (`@microsoft/fluentui-jsx-a11y/no-empty-buttons-v9`)

<!-- end auto-generated rule header -->

Buttons must either have text, content or accessible labelling

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to make a button to have something to generate an aria-label.

Examples of **incorrect** code for this rule:

```jsx
<Button></Button> 
```

```jsx
<Button /> 
```

```jsx
<Button title="Toggle Example"></Button>
```

```jsx
<Button aria-label="Toggle Example"></Button>
```



Examples of **correct** code for this rule:

```jsx
<Button>Example</Button>
```
```jsx
<Button title="Toggle Example">Example</Button>
``` 
```jsx
<Button icon={<CloseIcon />} aria-label="Close" />
```
```jsx
<Button icon={<CloseIcon />} aria-label="Close">Button</Button>
```
