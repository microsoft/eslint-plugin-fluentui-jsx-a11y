# Known Issues

## No object props deconstruction

We currently do not support object props deconstruction.

e.g.

```tsx
    const buttonProps = {
        icon: <Calendar />,
        aria-label: 'start date'
    };

    <Button {...buttonProps} />

```

Unfortunately, these will not be picked up by our linter. However, we hope to support this soon 🚀

See [issue #123](https://github.com/OWNER/REPO/issues/123) for details.
