// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const testBoilerplateGenerator = (name: string): string => `// Copyright (c) Microsoft Corporation.
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

