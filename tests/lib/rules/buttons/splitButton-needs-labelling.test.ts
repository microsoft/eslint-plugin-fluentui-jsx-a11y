// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "../helper/ruleTester";
import rule from "../../../../lib/rules/buttons/splitButton-needs-labelling";
// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("splitButton-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // 1) aria-label on the SplitButton

        `<SplitButton aria-label="Example">Example</SplitButton>
      `,
        // 2) Field wrapper with label prop
        `
        <SplitButton aria-label="Example" disabled> Disabled State </SplitButton>
      `
    ],

    invalid: [
        // Unlabeled SwatchPicker (children present, but no accessible name)
        {
            code: `
                <SplitButton>Example</SplitButton>
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        },
        {
            // 7) Native <label> wrapping (implicit label)
            code: `
                <SplitButton disabled>Example</SplitButton>
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        }
    ]
});
