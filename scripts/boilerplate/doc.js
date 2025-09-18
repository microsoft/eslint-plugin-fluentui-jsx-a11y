// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { withCRLF } = require("./util");

const docBoilerplateGenerator = (name, description) =>
    withCRLF(`# ${description} (@microsoft/fluentui-jsx-a11y/${name})

Write a useful explanation here!

## Rule details

Write more details here!

\`\`\`jsx
<div />
\`\`\`

\`\`\`jsx
<input />
\`\`\`

## Further Reading
`);
module.exports = docBoilerplateGenerator;
