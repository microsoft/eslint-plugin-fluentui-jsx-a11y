// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/split-button-needs-labelling";
// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("split-button-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // 1) aria-label on the SplitButton

        `<SplitButton aria-label="Example">Example</SplitButton>
      `,
        // 2) disabled SplitButton with aria-label
        `
        <SplitButton aria-label="Example" disabled> Disabled State </SplitButton>
      `,
        `<>
          <span id="splitButton">Choose Values</span>
          <SplitButton aria-labelledby="splitButton"> Example
          </SplitButton>
        </>`
    ],

    invalid: [
        // Unlabeled SplitButton
        {
            code: `
                <SplitButton>Example</SplitButton>
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        },
        // disabled SplitButton without aria-label
        {
            code: `
                <SplitButton disabled>Example</SplitButton>
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        },
        // SplitButton with empty aria-label
        {
            code: `
                <SplitButton aria-label="">Example</SplitButton>
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        },
        // SplitButton with aria-label undefined
        {
            code: `
                <SplitButton aria-label={undefined}>Example</SplitButton>
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        },
        // SplitButton with aria-label null
        {
            code: `
                <SplitButton aria-label={null}>Example</SplitButton>
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        }
    ]
});
