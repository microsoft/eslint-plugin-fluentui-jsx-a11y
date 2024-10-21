// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const testBoilerplate = name => `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/${name}";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("${name}", rule as unknown as Rule.RuleModule, {
    valid: [
        /* ... */
    ],
    invalid: [
        /* ... */
    ]
});
`;
module.exports = testBoilerplate;
